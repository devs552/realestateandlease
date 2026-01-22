export type UnderwritingResult = {
  status: "PASS" | "FAIL"
  baseArv: number
  adjustedArv: number
  failureReasons: string[]
}

export function runUnderwriting(listing: any): UnderwritingResult {
  const failureReasons: string[] = []

  // Example assumptions (already aligned in Milestone 1)
  const pricePerSqft = 200
  const baseArv = listing.squareFeet * pricePerSqft

  let adjustedArv = baseArv

  // Busy street penalty
  if (listing.isBusyStreet) {
    adjustedArv *= 0.95
  }

  // No garage penalty
  if (!listing.hasGarage) {
    adjustedArv *= 0.97
  }

  // Max purchase price rule
  if (listing.price > adjustedArv * 0.75) {
    failureReasons.push("Purchase price exceeds 75% of ARV")
  }

  const status = failureReasons.length === 0 ? "PASS" : "FAIL"

  return {
    status,
    baseArv: Math.round(baseArv),
    adjustedArv: Math.round(adjustedArv),
    failureReasons,
  }
}
