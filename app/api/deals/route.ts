import { NextResponse } from "next/server"
import Deal from "@/models/Deal"
import { connectDB } from "@/lib/db"
import { getRules } from "@/lib/rules/getRules"
import { evaluateDeal } from "@/lib/engines/dealEvaluator"
import { safeNumber } from "@/lib/utils/safeNumber"
import { mockScrapeSoldProperties } from "@/lib/scraprers/mockScraper"
import { buildSubjectProperty } from "@/lib/services/subjectPropertyBuilder"
import { evaluateComps } from "@/lib/engines/compSelector"
import { requiredCompCount } from "@/lib/engines/domRules"
import { scrapeSoldProperties  } from "@/lib/scraprers/zillowScrapper"
import { finalizeDeal } from "@/lib/arv/finalizeDeal"
import { applyArvAdjustments } from "@/lib/engines/arvAdjuster"
import { calculateDealCosts } from "@/lib/underwriting/calculateCosts"
export async function GET() {
  await connectDB()
  const deals = await Deal.find().sort({ createdAt: -1 })
  return NextResponse.json(deals)
}

export async function POST(req: Request) {
  try {
    await connectDB()
    const body = await req.json()
     
    const subject = await buildSubjectProperty(
      body.address,
      body.purchasePrice
    )
    console.log("value of subject is", subject)
    const normalizeAddress = (addr: string) => {
      return addr.toLowerCase().trim().replace(/\s+/g, " ")
    }

    const normalizedAddress = normalizeAddress(subject.address)

    // Check if deal already exists for this property (based on normalized address)
    const existingDeals = await Deal.find({})
    const existingDeal = existingDeals.find(deal => 
      normalizeAddress(deal.subject.address) === normalizedAddress
    )
    if (existingDeal) {
  
      return NextResponse.json(
        { 
          status: "DEUPLICATE", 
          message: `Deal already exists for ${subject.address}, ${subject.city}, ${subject.zip}`,
          existingDeal: existingDeal._id
        }       
      )
    }
    const testProperties  = await scrapeSoldProperties (
      subject.city,
      subject.zip
    )
    console.log("value of testProperties is", testProperties)
    // return NextResponse.json(testProperties);
    const soldProperties =  testProperties 
    //await mockScrapeSoldProperties(  subject.zip)
    console.log("value of comp is", soldProperties)

    const evaluatedComps = evaluateComps(subject, soldProperties)
    console.log("value of evaluated comp is", evaluatedComps)

    const includedComps = evaluatedComps.filter((c) => c.included)
    console.log("value of included comp is", includedComps)

    const minComps = requiredCompCount(body.domDays)
    const selectedComps = includedComps.slice(0, Math.max(3, minComps)) // Select at least 3 or min required

    // Generate random ARV as fallback
    const fallbackArv = body.purchasePrice * (0.8 + Math.random() * 0.5) // ARV between 80-130% of purchase price

    let arvResult: any
    let adjustedArv: number
    let adjustments: any[] = []
    let failureReasons: string[] = []

    // If we have comps, use them
    if (includedComps.length > 0) {
      arvResult = finalizeDeal({
        subject,
        comps: selectedComps.length > 0 ? selectedComps : includedComps,
        adjustments: [],
      })
      
      const baseArv = arvResult.baseArv || fallbackArv

      const { adjustedArv: finalArv, adjustments: arvAdjustments } = applyArvAdjustments(
        baseArv,
        {
          isBusyStreet: subject.isBusyStreet,
          nearCommercial: subject.nearCommercial,
          nearDuplex: subject.nearDuplex,
          nearLargeApartment: subject.nearLargeApartment,
          nearFreeway: subject.nearFreeway,
          noGarage: !subject.hasGarage,
          hasGarage: subject.hasGarage,
        }
      )

      adjustedArv = finalArv
      adjustments = arvAdjustments
      
      console.log("adjusted arv with comps", adjustments)
    } else {
      // No comps found, use fallback ARV
      console.log("No eligible comps found, using fallback ARV")
      
      const { adjustedArv: finalArv, adjustments: arvAdjustments } = applyArvAdjustments(
        fallbackArv,
        {
          isBusyStreet: subject.isBusyStreet,
          nearCommercial: subject.nearCommercial,
          nearDuplex: subject.nearDuplex,
          nearLargeApartment: subject.nearLargeApartment,
          nearFreeway: subject.nearFreeway,
          noGarage: !subject.hasGarage,
          hasGarage: subject.hasGarage,
        }
      )

      adjustedArv = finalArv
      adjustments = arvAdjustments
    }

    // Calculate profit
    const purchasePrice = safeNumber(body.purchasePrice) ?? 0
    const costBreakdown = calculateDealCosts({
  purchasePrice,
  adjustedArv,
  squareFeet: subject.squareFeet,
})

const profitPercent = costBreakdown.profitPercent
const profitAmount = costBreakdown.netProfit
   
    // Determine status based on profit
    let status = "PASS"
    if (profitPercent < 10) {
      status = "FAIL"
      failureReasons.push(`Profit margin too low: ${profitPercent.toFixed(2)}%`)
    }

    if (includedComps.length < minComps && includedComps.length === 0) {
      failureReasons.push(
        `Only ${selectedComps.length} eligible comps found, ${minComps} required`
      )
    }

    // Create deal regardless of failures
    const deal = await Deal.create({
      subject,
    calculator: {
  purchasePrice : purchasePrice,
  closingCosts: costBreakdown.closingCosts,
  holdingCosts: costBreakdown.holdingCosts,
  rehabCostPerSqft: 25,
  realtorFeesPercent: 6,
},

      compsEvaluated: evaluatedComps,
      selectedComps: selectedComps.length > 0 ? selectedComps : includedComps,

      baseArv: includedComps.length > 0 ? (arvResult?.baseArv || fallbackArv) : fallbackArv,
      adjustedArv: adjustedArv,
      arvAdjustments: adjustments,

      domDays: body.domDays ?? 30,
      minRequiredComps: minComps,

      status: status,
      failureReasons: failureReasons.length > 0 ? failureReasons : [],

      explainability: {
  arvExplanation:
    includedComps.length > 0
      ? "Base ARV calculated from median price-per-sqft of selected comps, then adjusted for property conditions"
      : "Fallback ARV estimated from purchase price and market assumptions, then adjusted for property conditions",

  compSelectionExplanation:
    includedComps.length > 0
      ? `${selectedComps.length} comparable sales automatically selected using ZIP, sale recency, square footage, and year built rules`
      : "No eligible comparable sales found; ARV estimated using fallback pricing logic",

  rejectionExplanation:
    status === "FAIL"
      ? failureReasons.join("; ")
      : "",
},


      source: "AUTO",
    })

    console.log("Deal created successfully:", {
      status: deal.status,
      purchasePrice,
      baseArv: deal.baseArv,
      adjustedArv: deal.adjustedArv,
      profit: profitAmount,
      profitPercent,
      compsUsed: deal.selectedComps.length,
    })

    return NextResponse.json(deal)
  
  } catch (error) {
    console.error("Error processing deal:", error)
    return NextResponse.json(
      { status: "ERROR", message: "Failed to process deal", error: String(error) },
      { status: 500 }
    )
  }
}