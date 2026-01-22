export function applyArvAdjustments(
  baseArv: number,
  flags: {
    isBusyStreet: boolean
    nearCommercial: boolean
    nearDuplex: boolean
    nearLargeApartment: boolean
    nearFreeway: boolean
    noGarage: boolean
    hasGarage: boolean
  }
) {
  let adjustedArv = baseArv
  const adjustments: {
    rule: string
    impactPercent: number
    reason: string
  }[] = []

  function apply(percent: number, rule: string, reason: string) {
    const impact = adjustedArv * percent
    adjustedArv -= impact
    adjustments.push({
      rule,
      impactPercent: percent * 100,
      reason,
    })
  }

  if (flags.isBusyStreet) {
    apply(0.10, "BUSY_STREET", "Property on busy street")
  }

  if (flags.hasGarage) {
    apply(0.05, "GARAGE", "Property has garage")
  }

  if (flags.nearCommercial) {
    apply(0.10, "COMMERCIAL_PROXIMITY", "Near commercial property")
  }

  if (flags.nearDuplex) {
    apply(0.05, "DUPLEX_NEARBY", "Adjacent to duplex (2–5 units)")
  }

  if (flags.nearLargeApartment) {
    apply(0.10, "APARTMENT_COMPLEX", "Adjacent to large apartment complex")
  }

  if (flags.nearFreeway) {
    apply(0.10, "FREEWAY", "Adjacent to freeway")
  }

  if (flags.noGarage) {
    apply(0.10, "NO_GARAGE", "No garage while comps have garages")
  }

  return {
    adjustedArv: Math.round(adjustedArv),
    adjustments, // ALWAYS an array
  }
}
