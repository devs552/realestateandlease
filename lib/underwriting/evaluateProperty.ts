import { detectNegativeFactors } from "./negativeRules"
import { COST_CONFIG } from "./costConfig"
const NEGATIVE_ADJUSTMENTS: Record<string, number> = {
  "Located on a busy road - potential noise/traffic issues": 0.05,
  "Near commercial properties - possible nuisances": 0.04,
  "Multifamily properties nearby - may affect desirability": 0.03,
  "No garage - limits parking/storage options": 0.02,
  "Lacks freeway access - may impact commute times": 0.02,
  "High DOM (120+ days) - stale listing": 0.03,
}

export function evaluateProperty(listing: any) {
  const negatives = detectNegativeFactors(listing)

  const baseArv = Math.round(listing.price * 1.25)
  let currentArv = baseArv

  const adjustmentSteps: any[] = []

  // 🚫 AUTO-REJECT RULE
  if (negatives.length >= 2) {
    return {
      externalId: listing.externalId,
      address: listing.address,
      underwriting: {
        status: "FAIL",
        failureReasons: negatives,
      },
      evaluatedAt: new Date().toISOString(),
    }
  }

  // ✅ APPLY ADJUSTMENTS ONE-BY-ONE
  for (const factor of negatives) {
    const pct = NEGATIVE_ADJUSTMENTS[factor] || 0
    const before = currentArv
    const reduction = Math.round(before * pct)
    const after = before - reduction

    adjustmentSteps.push({
      factor,
      percentApplied: `${(pct * 100).toFixed(1)}%`,
      arvBefore: before,
      arvAfter: after,
    })

    currentArv = after
  }
const purchasePrice = listing.price

const closingCosts = Math.round(
  purchasePrice * COST_CONFIG.closingCostPct
)

const holdingCosts = Math.round(
  purchasePrice *
    COST_CONFIG.monthlyHoldingPct *
    COST_CONFIG.holdingMonths
)

const rehabCost = Math.round(
  listing.sqft * COST_CONFIG.rehabPerSqft
)

const totalCosts = closingCosts + holdingCosts + rehabCost + purchasePrice

  return {
    externalId: listing.externalId,
    address: listing.address,
    underwriting: {
      status: "PASS",
      arv: {
        baseArv,
        finalArv: currentArv,
        adjustmentSteps,
      },
       costs: {
    purchasePrice,
    closingCosts,
    holdingCosts,
    rehabCost,
    totalCosts,
  },
      negativeFactors: negatives,
    },
    evaluatedAt: new Date().toISOString(),
  }
}
