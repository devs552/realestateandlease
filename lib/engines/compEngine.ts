export function runCompEngine(subject: any, comps: any[], rules: any) {
  const selected = []
  const rejected = []

  // Validate inputs
  if (!Array.isArray(comps) || comps.length === 0) {
    return { selected: [], rejected: [] }
  }

  for (const comp of comps) {
    // Check distance
    if (comp.distance !== undefined && comp.distance > (rules?.MAX_COMP_DISTANCE || 2)) {
      rejected.push({ comp, reason: `Distance too far (${comp.distance} > ${rules?.MAX_COMP_DISTANCE || 2})` })
      continue
    }

    // Check DOM
    if (comp.dom !== undefined && comp.dom > (rules?.MAX_COMP_DOM || 180)) {
      rejected.push({ comp, reason: `DOM too high (${comp.dom} > ${rules?.MAX_COMP_DOM || 180})` })
      continue
    }

    // Check price validity
    if (!comp.price || comp.price <= 0) {
      rejected.push({ comp, reason: "Invalid price" })
      continue
    }

    selected.push(comp)
  }

  return { selected, rejected }
}