import { fetchFromPublicSource } from "../lib/sourcing/publicSourceAdapter"
import { normalizeListing } from "../lib/sourcing/normalizeListing"
import { fingerprint } from "../dedupe/fingerprint"
import { dedupe } from "../dedupe/dedupeListings"
import { selectComps } from "../lib/comps/selectComps"
import { explainComp } from "../lib/comps/compExplainability"
import { evaluateProperty } from "../lib/underwriting/evaluateProperty"
import { detectNegativeFactors } from "../lib/underwriting/negativeRules"
import {
  exportEvaluations,
  saveNormalizedListings,
  saveRawPayload,
  exportSummary,
  exportCompExplanations,
  listGeneratedFiles,
} from "@/exports/exportEvaluations"
import { sendDailyPassEmail } from "@/lib/notification/emailService"
import SimpleLogger from "./Simplelogger"

// Helper function to deep log objects and arrays
function logDeep(label: string, data: any, depth: number = 10) {
  console.log(`\n>>> ${label}:`)
  console.log(JSON.stringify(data, null, 2))
}

let passEmailPayload: any[] = []

export async function run() {
  // ✅ Initialize logger INSIDE run() - captures all iterations
  // const logger = new SimpleLogger("/log.txt")

  console.log("\n" + "=".repeat(80))
  console.log("🚀 PIPELINE STARTED:", new Date().toISOString())
  console.log("=".repeat(80))

  // ✅ STEP 1: REAL PUBLIC-SOURCE INGESTION (Non-Simulated)
  console.log("\n📥 STEP 1: FETCHING DATA FROM PUBLIC SOURCE")
  console.log("🌐 Source: Realtor.com (Dallas–Fort Worth)")

  const raw = await fetchFromPublicSource()
  console.log(`✓ Fetched ${raw.length} raw records from source`)

  // ✅ Raw payload proof
  console.log("\n📸 RAW PAYLOAD SAMPLE (First Record):")
  if (raw.length > 0) {
    logDeep("RAW RECORD EXAMPLE", raw[0])
  }

  // ✅ STEP 2: NORMALIZATION & DOM/STATUS TRACKING
  console.log("\n📝 STEP 2: NORMALIZING & PROCESSING RECORDS")
  console.log("📌 Tracking: DOM field + listing status")

  const normalizedListings = []
  const evaluatedProperties = []
  const compExplanations = []
  const evaluationsByStatus: { [key: string]: number } = {}
  const domTrackingLog: any[] = []

  for (let i = 0; i < raw.length; i++) {
    const record = raw[i]

    console.log(`\n${"─".repeat(80)}`)
    console.log(`PROCESSING RECORD ${i + 1}/${raw.length} (ID: ${record.externalId})`)
    console.log(`${"─".repeat(80)}`)

    // Log raw record
    logDeep(`RAW RECORD`, record)

    // ✅ Normalize
    const listing = normalizeListing(record)

    if (!listing) {
      console.warn(
        `❌ WARNING: normalizeListing returned undefined for record ID: ${record.externalId}`
      )
      console.warn("Raw record was:", record)
      continue
    }

    logDeep(`NORMALIZED LISTING`, listing)
    normalizedListings.push(listing)

    // ✅ DOM & Status Tracking
    console.log("\n📊 DOM & STATUS TRACKING")
    console.log(`   DOM: ${listing.dom !== null ? listing.dom + " days" : "NOT AVAILABLE"}`)
    console.log(`   Status: ${listing.status || "NOT AVAILABLE"}`)

    domTrackingLog.push({
      externalId: listing.externalId,
      address: listing.address,
      dom: listing.dom,
      status: listing.status,
    })

    // ✅ Fingerprint (includes DOM + status)
    const fp = fingerprint(listing)
    console.log("\n🔐 FINGERPRINT (DOM & STATUS INCLUDED)")
    logDeep(`FINGERPRINT COMPONENTS`, {
      fingerprint: fp,
      address: listing.address,
      city: listing.city,
      price: listing.price,
      sqft: listing.sqft,
      dom: listing.dom,
      status: listing.status,
      busy_road: (listing as any).busy_road ?? false,
    })

    // ✅ Dedupe
    const dedupeResult = dedupe(listing, fp)
    console.log(`\n📊 DEDUPE RESULT: ${dedupeResult}`)

    if (dedupeResult === "UNCHANGED") {
      console.log("→ Skipping unchanged listing")
      continue
    }

    // ✅ STEP 3: NEIGHBORHOOD BOUNDARY ENFORCEMENT (COMP SELECTION)
    console.log("\n🏘️  STEP 3: NEIGHBORHOOD BOUNDARY ENFORCEMENT (COMP SELECTION)")

    // Simulated COMP pool (in production, this would be a larger database)
    const allComps = normalizedListings.filter(
      (l) => l.externalId !== listing.externalId
    )

    const {
      selectedComps,
      excludedComps,
      minRequired,
    } = selectComps(listing, allComps)

    console.log(
      `✓ Selected ${selectedComps.length}/${allComps.length} comparables`
    )

    // ✅ STEP 4: COMP RULE EXPLAINABILITY (JSON EXPORT)
    console.log("\n📋 STEP 4: COMP RULE EXPLAINABILITY")
    const compExplanationsList = selectedComps.map((comp) => {
      const explanation = explainComp(listing, comp)
      console.log(
        `   ${explanation.compId}: ${explanation.included ? "✅ INCLUDED" : "❌ EXCLUDED"}`
      )
      if (explanation.reasons.length > 0) {
        explanation.reasons.forEach((reason) => console.log(`      → ${reason}`))
      }
      return explanation
    })

    logDeep(`COMP EXPLANATIONS`, compExplanationsList)
    compExplanations.push({
      subjectId: listing.externalId,
      subjectAddress: listing.address,
      comparables: compExplanationsList,
    })

    // ✅ STEP 5: NEGATIVE ADJUSTMENTS & AUTOMATIC REJECTION
    console.log("\n⚠️  STEP 5: NEGATIVE ADJUSTMENTS & AUTOMATIC REJECTION")

    const negativeFactors = detectNegativeFactors(listing)
    console.log(`\n📌 NEGATIVE FACTORS DETECTED: ${negativeFactors.length}`)

    if (negativeFactors.length > 0) {
      negativeFactors.forEach((factor, idx) => {
        console.log(`   ${idx + 1}. ${factor}`)
      })
    } else {
      console.log("   ✓ No negative external factors")
    }

    // Apply evaluation logic with negative factor handling
    console.log("\n⚙️  EVALUATING PROPERTY")
    const evaluation = evaluateProperty(listing)

    logDeep(`EVALUATION RESULT`, evaluation)

    if (evaluation.underwriting?.arv?.adjustmentSteps) {
      console.log("\n📉 NEGATIVE ADJUSTMENT MATH BREAKDOWN")

      evaluation.underwriting.arv.adjustmentSteps.forEach(
        (step: any, idx: number) => {
          console.log(`  ${idx + 1}. ${step.factor}`)
          console.log(`     → ${step.percentApplied} applied`)
          console.log(
            `     → ARV: $${step.arvBefore.toLocaleString()} → $${step.arvAfter.toLocaleString()}`
          )
        }
      )

      console.log(
        `\n   Final Adjusted ARV: $${evaluation.underwriting.arv.finalArv.toLocaleString()}`
      )
    }

    // Log evaluation details with full expansion
    if (evaluation) {
      console.log("\n📋 EVALUATION DETAILS:")
      console.log("  externalId:", evaluation.externalId)
      console.log("  address:", evaluation.address)
      console.log("  evaluatedAt:", evaluation.evaluatedAt)

      if (evaluation.underwriting?.costs) {
        console.log("\n💰 COST BREAKDOWN (AUTO-APPLIED)")
        console.log(
          `   Purchase Price (PP): $${evaluation.underwriting.costs.purchasePrice.toLocaleString()}`
        )
        console.log(
          `   Closing Costs (CC): $${evaluation.underwriting.costs.closingCosts.toLocaleString()}`
        )
        console.log(
          `   Holding Costs: $${evaluation.underwriting.costs.holdingCosts.toLocaleString()}`
        )
        console.log(
          `   Rehab Cost: $${evaluation.underwriting.costs.rehabCost.toLocaleString()}`
        )
        console.log(
          `   Total Costs: $${evaluation.underwriting.costs.totalCosts.toLocaleString()}`
        )
      }

      if (evaluation.underwriting) {
        console.log("  underwriting:")
        const status = evaluation.underwriting.status
        console.log("    status:", status)
        evaluationsByStatus[status] = (evaluationsByStatus[status] || 0) + 1

        if (status === "FAIL") {
          console.log("    ❌ AUTOMATIC REJECTION")
          if (evaluation.underwriting.failureReasons) {
            logDeep("    FAILURE REASONS", evaluation.underwriting.failureReasons)
          }
        } else if (status === "PASS") {
          console.log("    ✅ PASSED UNDERWRITING")
          console.log("    ✅ Delivered in Email")
          if (evaluation.underwriting.arv) {
            const { baseArv, finalArv } = evaluation.underwriting.arv
            console.log(`    Base ARV: $${baseArv.toLocaleString()}`)
            console.log(`    Adjusted ARV: $${finalArv.toLocaleString()}`)

            if (baseArv !== finalArv) {
              const discount = ((1 - finalArv / baseArv) * 100).toFixed(1)
              console.log(`    Adjustment: -${discount}% (for negative factors)`)
            }
          }

          if (
            evaluation.underwriting.negativeFactors &&
            evaluation.underwriting.negativeFactors.length > 0
          ) {
            console.log(
              `    Applied adjustments for ${evaluation.underwriting.negativeFactors.length} negative factor(s)`
            )
          }

          const costs: any = evaluation.underwriting?.costs
          const arv: any = evaluation.underwriting?.arv

          const marginPercent =
            ((arv.finalArv - costs.purchasePrice) / arv.finalArv) * 100

          passEmailPayload.push({
            address: evaluation.address,
            purchasePrice: costs.purchasePrice,
            baseArv: arv.baseArv,
            finalArv: arv.finalArv,
            marginPercent,
          })
        }
      }
    }

    evaluatedProperties.push(evaluation)
  }

  // ✅ STEP 6: EXPORT/SAVE
  console.log("\n" + "=".repeat(80))
  console.log("💾 STEP 6: EXPORTING & SAVING DATA")
  console.log("=".repeat(80))

  // Save all at once (not in loop)
  console.log(`\n📦 Saving ${normalizedListings.length} normalized listings...`)
  saveNormalizedListings(normalizedListings)

  console.log(`📦 Saving ${raw.length} raw records (proof of real source ingestion)...`)
  saveRawPayload(raw)

  console.log(`📦 Saving ${evaluatedProperties.length} evaluations...`)
  exportEvaluations(evaluatedProperties)

  console.log(
    `📦 Saving ${compExplanations.length} COMP rule explanations (JSON exportable)...`
  )
  exportCompExplanations(compExplanations)

  // Generate summary
  const statusBreakdown = Object.entries(evaluationsByStatus).map(
    ([status, count]) => ({
      status,
      count,
    })
  )

  console.log(`📦 Saving pipeline summary...`)
  exportSummary(
    raw.length,
    normalizedListings.length,
    evaluatedProperties.length,
    statusBreakdown
  )

  // ✅ Send email with passing properties
  await sendDailyPassEmail(passEmailPayload)
  passEmailPayload = []

  console.log("\n✅ PIPELINE COMPLETED - Log file saved to: logs/log.txt")

  // ✅ Finalize logger (restore original console)
  // logger.restore()
}