const seen = new Map<string, string>()

export function dedupe(listing: any, fp: string) {
  const prev = seen.get(listing.externalId)

  if (!prev) {
    seen.set(listing.externalId, fp)
    console.log("🆕 NEW LISTING")
    return "NEW"
  }

  if (prev === fp) {
    console.log("⏭ UNCHANGED — skipped")
    return "UNCHANGED"
  }

  seen.set(listing.externalId, fp)
  console.log("♻ CHANGED — re-evaluating")
  return "CHANGED"
}
