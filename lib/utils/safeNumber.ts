export function safeNumber(value: any, fallback: number | null = null) {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}
