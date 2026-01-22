export function monthsAgo(date: Date): number {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  return diffMs / (1000 * 60 * 60 * 24 * 30)
}
