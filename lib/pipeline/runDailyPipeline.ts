import { fetchPublicListings } from "../sourcing/publicListingsSource"
import { isNewListing } from "../sourcing/deduplicationRegistry"
import { detectChanges } from "../sourcing/changeDetection"
import { evaluateProperty } from "../pipeline/evaluateListing"

export async function runDailyPipeline() {
  console.log("🔄 Daily pipeline started", new Date().toISOString())

  // STEP 1: Fetch public listings
  const listings = await fetchPublicListings()

  // STEP 2: Deduplication (per listing)
  const newListings = listings.filter((listing) =>
    isNewListing(listing.externalId)
  )

  // STEP 3: Change detection
  const listingsToEvaluate = detectChanges(newListings)

  // STEP 4: Underwriting (Milestone 1 logic)
  const results = listingsToEvaluate.map((listing:any) =>
    evaluateProperty(listing)
  )

  console.log("✅ Daily pipeline completed")
  console.log("Evaluated properties:", results)

  return results
}
