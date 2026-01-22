import { fetchSubjectLocation, checkBusyStreet, checkNearCommercial, checkNearLargeApartment, checkNearDuplex, checkNearFreeway, checkHasGarage } from "./subjectPropertyFetcher"
import { SubjectProperty } from "@/lib/types/subjectProperty"

function estimateSqft(price: number) {
  if (price < 200_000) return 1200
  if (price < 350_000) return 1600
  if (price < 500_000) return 2000
  return 2400
}

export async function buildSubjectProperty(
  address: string,
  purchasePrice: number
): Promise<SubjectProperty> {
  const location = await fetchSubjectLocation(address)

  // Fetch flags in parallel
  const [isBusyStreet, nearCommercial, nearLargeApt, nearDuplex, nearFreeway, hasGarage] = 
    await Promise.all([
      checkBusyStreet(location.lat, location.lng),
      checkNearCommercial(location.lat, location.lng),
      checkNearLargeApartment(location.lat, location.lng),
      checkNearDuplex(location.lat, location.lng),
      checkNearFreeway(location.lat, location.lng),
      checkHasGarage(location.lat, location.lng),
    ])

  return {
    // Identity
    address,
    city: location.city,
    state: location.state,
    zip: location.zip,

    // Geo
    lat: location.lat,
    lng: location.lng,

    // Directional attributes
    squareFeet: estimateSqft(purchasePrice),
    yearBuilt: 1995,
    beds: 3,
    baths: 2,
    propertyType: "SFR",

    // Fetched flags from OSM/Overpass
    hasGarage,
    isBusyStreet,
    nearCommercial,
    nearDuplex,
    nearLargeApartment: nearLargeApt,
    nearFreeway,
  }
}