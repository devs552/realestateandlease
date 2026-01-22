import { isSameNeighborhood } from "./neighborhoodRules"

function monthsBetween(a: Date, b: Date) {
  return Math.abs(
    (a.getFullYear() - b.getFullYear()) * 12 +
    (a.getMonth() - b.getMonth())
  )
}

export function selectComps(subject: any, comps: any[]) {
  console.log("\n🏘️  STEP 3: COMP ELIGIBILITY ENFORCEMENT")

  const eligibleComps: any[] = []
  const excludedComps: any[] = []

  const now = new Date()

  for (const comp of comps) {
    const reasons: string[] = []

    // 1️⃣ Neighborhood boundary (ZIP-based)
    if (!isSameNeighborhood(subject.zip, comp.zip)) {
      reasons.push("Outside neighborhood boundary")
    }

    // 2️⃣ Sold date: within last 3–6 months
    if (!comp.soldDate) {
      reasons.push("Missing sold date")
    } else {
      const monthsOld = monthsBetween(now, new Date(comp.soldDate))
      if (monthsOld < 3 || monthsOld > 6) {
        reasons.push(`Sold date ${monthsOld} months ago (outside 3–6 month window)`)
      }
    }

    // 3️⃣ Square footage ±10%
    const sqftDelta = Math.abs(comp.sqft - subject.sqft) / subject.sqft
    if (sqftDelta > 0.1) {
      reasons.push("Sqft variance > ±10%")
    }

    // 4️⃣ Year built range (±10–12 years)
    if (!comp.yearBuilt || !subject.yearBuilt) {
      reasons.push("Missing year built data")
    } else {
      const yearDiff = Math.abs(comp.yearBuilt - subject.yearBuilt)
      if (yearDiff > 12) {
        reasons.push(`Year built difference ${yearDiff} years (>12)`)
      }
    }

    // ❌ Excluded
    if (reasons.length > 0) {
      console.log(`❌ COMP EXCLUDED: ${comp.address}`)
      reasons.forEach((r) => console.log(`   → ${r}`))

      excludedComps.push({
        compId: comp.externalId,
        address: comp.address,
        reasons,
      })
      continue
    }

    // ✅ Included
    console.log(`✅ COMP INCLUDED: ${comp.address}`)
    console.log(`   → Sqft: ${comp.sqft} (${subject.sqft} subject)`)
    console.log(`   → Year Built: ${comp.yearBuilt} (${subject.yearBuilt} subject)`)
    console.log(`   → Sold Date: ${comp.soldDate} (${monthsBetween(now, new Date(comp.soldDate))} months ago)`)
 
    
    eligibleComps.push(comp)
  }

  // 📊 DOM-BASED MINIMUM COMP ENFORCEMENT
  let minRequired = 1

  if (subject.dom >= 90) minRequired = 3
  else if (subject.dom >= 60) minRequired = 2
  else if (subject.dom <= 30) minRequired = 1

  console.log("\n📊 DOM-BASED COMP REQUIREMENTS")
  console.log(`   Subject DOM: ${subject.dom} days`)
  console.log(`   Minimum required COMPs: ${minRequired}`)
  console.log(`   Eligible COMPs found: ${eligibleComps.length}`)

  if (eligibleComps.length < minRequired) {
    console.log(
      `❌ INSUFFICIENT COMPS: ${eligibleComps.length}/${minRequired} required`
    )
  } else {
    console.log(
      `✅ COMP REQUIREMENT MET: ${eligibleComps.length}/${minRequired}`
    )
  }

  // 📋 Summary of included comps
  if (eligibleComps.length > 0) {
    console.log("\n📋 SUMMARY OF INCLUDED COMPS:")
    eligibleComps.forEach((comp, index) => {
      console.log(`   ${index + 1}. ${comp.address}  || 'N/A'}`)
    })
  }

  return {
    selectedComps: eligibleComps,
    excludedComps,
    minRequired,
  }
}