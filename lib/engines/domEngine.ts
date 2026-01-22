export function runDomEngine(selectedComps: any, maxDom: any) {
  // Validate inputs
  if (!selectedComps || selectedComps.length === 0) {
    return {
      pass: false,
      reason: "No comparables to check DOM"
    }
  }

  // Find any comp that exceeds max DOM
  const failed = selectedComps.find((c: any) => (c.dom || 0) > maxDom)

  if (failed) {
    return {
      pass: false,
      reason: `DOM gating failed - comp with ${failed.dom} days exceeds ${maxDom} day limit`
    }
  }

  // Calculate average DOM
  const avgDom = Math.round(
    selectedComps.reduce((s: any, c: any) => s + (c.dom || 0), 0) /
      selectedComps.length
  )

  return {
    pass: true,
    reason: `DOM check passed - average ${avgDom} days`,
    avgDom: avgDom,
    maxDom: maxDom
  }
}