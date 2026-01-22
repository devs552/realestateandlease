import fs from "fs"
import path from "path"

const REGISTRY_PATH = path.join(
  process.cwd(),
  "data",
  "seen-listings.json"
)

/**
 * Ensure registry file exists
 */
function ensureRegistryFile() {
  if (!fs.existsSync("data")) {
    fs.mkdirSync("data")
  }

  if (!fs.existsSync(REGISTRY_PATH)) {
    fs.writeFileSync(REGISTRY_PATH, JSON.stringify([]))
  }
}

/**
 * Load seen listing IDs
 */
function loadSeenIds(): Set<string> {
  ensureRegistryFile()
  const raw = fs.readFileSync(REGISTRY_PATH, "utf-8")
  const ids: string[] = JSON.parse(raw)
  return new Set(ids)
}

/**
 * Persist updated seen IDs
 */
function saveSeenIds(ids: Set<string>) {
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify([...ids], null, 2))
}

/**
 * Check if listing is new
 */
export function isNewListing(externalId: string): boolean {
  const seenIds = loadSeenIds()
  return !seenIds.has(externalId)
}

/**
 * Mark listing as processed
 */
export function markListingAsSeen(externalId: string) {
  const seenIds = loadSeenIds()
  seenIds.add(externalId)
  saveSeenIds(seenIds)
}
