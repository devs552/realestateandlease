export function requiredCompCount(domDays: number): number {
  if (domDays >= 90) return 3
  if (domDays >= 60) return 2
  return 1
}
