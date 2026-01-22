export interface Adjustment {
  label: string
  percent: number
}

export function applyAdjustments(
  baseArv: number,
  adjustments: Adjustment[]
) {
  let adjusted = baseArv

  adjustments.forEach((a) => {
    adjusted -= baseArv * a.percent
  })

  return Math.round(adjusted)
}
