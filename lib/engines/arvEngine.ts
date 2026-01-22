export function runArvEngine(selectedComps: any) {
  // Calculate average price from selected comps
  if (!selectedComps || selectedComps.length === 0) {
    return {
      arv: 0,
      adjustments: [],
      compCount: 0
    }
  }

  const base =
    selectedComps.reduce((s: any, c: any) => s + (c.price || 0), 0) /
    selectedComps.length

  return {
    arv: Math.round(base),
    adjustments: [],
    compCount: selectedComps.length,
    avgPrice: Math.round(base)
  }
}