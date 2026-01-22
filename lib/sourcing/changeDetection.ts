import fs from "fs"
import path from "path"
import crypto from "crypto"

const STATE_PATH = path.join(process.cwd(), "data", "listing-state.json")

interface ListingState {
  externalId: string
  fingerprint: string
}

function ensureStateFile() {
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data")
  }

  if (!fs.existsSync(STATE_PATH)) {
    fs.writeFileSync(STATE_PATH, JSON.stringify([]))
  }
}

function loadStates(): Map<string, string> {
  ensureStateFile()
  const raw = fs.readFileSync(STATE_PATH, "utf-8")
  const items: ListingState[] = JSON.parse(raw)
  return new Map(items.map((i) => [i.externalId, i.fingerprint]))
}

function saveStates(stateMap: Map<string, string>) {
  const data: ListingState[] = Array.from(stateMap.entries()).map(
    ([externalId, fingerprint]) => ({
      externalId,
      fingerprint,
    })
  )
  fs.writeFileSync(STATE_PATH, JSON.stringify(data, null, 2))
}

function createFingerprint(listing: any): string {
  const materialFields = {
    price: listing.price,
    beds: listing.beds,
    baths: listing.baths,
    sqft: listing.sqft,
    updatedAt: listing.updatedAt,
  }

  return crypto
    .createHash("sha256")
    .update(JSON.stringify(materialFields))
    .digest("hex")
}

/**
 * 🔍 Detect new or materially changed listings
 */
export function detectChanges(listings: any[]): any[] {
  const states = loadStates()
  const changed: any[] = []

  for (const listing of listings) {
    const fingerprint = createFingerprint(listing)
    const previous = states.get(listing.externalId)

    if (!previous || previous !== fingerprint) {
      states.set(listing.externalId, fingerprint)
      changed.push(listing)
    }
  }

  saveStates(states)
  return changed
}
