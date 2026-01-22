

export function detectNegativeFactors(listing: any): string[] {
  const negatives: string[] = []

  // Simulate negative factors based on property characteristics
  // In production, these would come from actual site surveys/inspections

  // Factor 1: Properties with very high DOM (Days on Market) - stale listings
  if (listing.dom !== null && listing.dom > 120) {
    negatives.push("High DOM (120+ days) - stale listing")
  }

  // Factor 2: SOLD status might indicate market issues
  if (listing.status === "SOLD") {
    negatives.push("Sold status - may indicate past market issues")
  }

 if( listing.busy_road) {
    negatives.push("Located on a busy road - potential noise/traffic issues")
  }
  if( listing.near_commercial) {
    negatives.push("Near commercial properties - possible nuisances")
  }     
  if( listing.multifamily_nearby) {
    negatives.push("Multifamily properties nearby - may affect desirability")
  }
  if( !listing.has_garage) {
    negatives.push("No garage - limits parking/storage options")
  }
  if( !listing.has_freeway_access) {
    negatives.push("Lacks freeway access - may impact commute times")
  } 
  // Factor 3: Certain ZIP codes have known environmental issues (example)
  // const problematicZips = ["75006", "76010"] // Carrollton, Arlington
  // if (problematicZips.includes(listing.zip)) {
  //   negatives.push("Location in zone with environmental concerns")
  // }

  // Factor 4: Very low price per sqft (< $150/sqft) might indicate structural issues
  // const pricePerSqft = listing.price / listing.sqft
  // if (pricePerSqft < 150) {
  //   negatives.push(`Low price per sqft ($${pricePerSqft.toFixed(2)}) - possible structural issues`)
  // }

  return negatives
}