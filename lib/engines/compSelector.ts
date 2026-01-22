import { CompEvaluation } from "@/lib/types/compEvaluation"
import { monthsAgo } from "@/lib/utils/dateUtils"

interface Subject {
  zip: string
  squareFeet: number
  yearBuilt: number
  beds: number
  baths: number
}

export function evaluateComps(
  subject: Subject,
  soldProperties: any[]
): CompEvaluation[] {
  return soldProperties.map((comp) => {
    const exclusionReasons: string[] = []

    // 1️⃣ Neighborhood (ZIP proxy)
    // FIX: Check if comp has a zip field, or extract it from address
    const compZip = comp.zip || String(comp.neighborhoodId).trim()
    const subjectZip = String(subject.zip).trim()
    
    if (compZip !== subjectZip) {
      exclusionReasons.push(
        `Outside neighborhood boundary (ZIP: ${compZip} vs ${subjectZip})`
      )
    }

    // 2️⃣ Sold recency
    const soldDate = new Date(comp.soldDate)
    const months = monthsAgo(soldDate)

    if (isNaN(months) || months < 3 || months > 6) {
      exclusionReasons.push(
        `Sold ${months} months ago (outside 3–6 month range)`
      )
    }

    // 3️⃣ Square footage ±10%
    if (!subject.squareFeet || !comp.squareFeet) {
      exclusionReasons.push("Missing square footage")
    } else {
      const sqftDelta =
        Math.abs(comp.squareFeet - subject.squareFeet) /
        subject.squareFeet

      if (sqftDelta > 0.1) {
        exclusionReasons.push(
          `Square footage variance > ±10% (${(sqftDelta * 100).toFixed(1)}%)`
        )
      }
    }

    // 4️⃣ Year built ±12
    const yearDiff =
      Math.abs(Number(comp.yearBuilt) - Number(subject.yearBuilt))

    if (isNaN(yearDiff) || yearDiff > 12) {
      exclusionReasons.push(
        `Year built variance > ±12 years (${yearDiff} years)`
      )
    }

    // 5️⃣ Beds / baths
    if (Math.abs(comp.beds - subject.beds) > 1) {
      exclusionReasons.push(
        `Bed count mismatch (${comp.beds} vs ${subject.beds})`
      )
    }

    if (Math.abs(comp.baths - subject.baths) > 1) {
      exclusionReasons.push(
        `Bath count mismatch (${comp.baths} vs ${subject.baths})`
      )
    }

    return {
      address: comp.address,
      soldPrice: comp.soldPrice,
      soldDate: comp.soldDate,
      squareFeet: comp.squareFeet,
      yearBuilt: comp.yearBuilt,
      beds: comp.beds,
      baths: comp.baths,
      neighborhoodId: comp.neighborhoodId,
      distanceMiles: comp.distanceMiles,

      included: exclusionReasons.length === 0,
      exclusionReasons,
    }
  })
}