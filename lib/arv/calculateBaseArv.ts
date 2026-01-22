import { median } from "./median"

export function calculateBaseArv(
  subjectSqft: number,
  comps: any[]
) {
  const pricesPerSqft = comps.map(
    (c) => c.soldPrice / c.squareFeet
  )

  const ppsf = median(pricesPerSqft)
  return Math.round(ppsf * subjectSqft)
}
