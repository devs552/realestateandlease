export type PublicListing = {
  externalId: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  beds: number
  baths: number
  sqft: number
  updatedAt: string
}

export async function fetchPublicListings(): Promise<PublicListing[]> {
  const baseListings: PublicListing[] = [
    {
      externalId: "PUBLIC_1001",
      address: "123 Main St",
      city: "Dallas",
      state: "TX",
      zip: "75201",
      price: 285000,
      beds: 3,
      baths: 2,
      sqft: 1600,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1002",
      address: "456 Oak Ave",
      city: "Dallas",
      state: "TX",
      zip: "75202",
      price: 320000,
      beds: 4,
      baths: 2,
      sqft: 1900,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1003",
      address: "789 Pine Dr",
      city: "Dallas",
      state: "TX",
      zip: "75203",
      price: 255000,
      beds: 3,
      baths: 1.5,
      sqft: 1400,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1004",
      address: "1012 Cedar Ln",
      city: "Dallas",
      state: "TX",
      zip: "75204",
      price: 410000,
      beds: 4,
      baths: 3,
      sqft: 2300,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1005",
      address: "220 Birch St",
      city: "Plano",
      state: "TX",
      zip: "75074",
      price: 365000,
      beds: 4,
      baths: 2.5,
      sqft: 2100,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1006",
      address: "998 Willow Ct",
      city: "Plano",
      state: "TX",
      zip: "75075",
      price: 295000,
      beds: 3,
      baths: 2,
      sqft: 1750,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1007",
      address: "432 Spruce Way",
      city: "Irving",
      state: "TX",
      zip: "75060",
      price: 275000,
      beds: 3,
      baths: 2,
      sqft: 1650,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1008",
      address: "55 Magnolia Blvd",
      city: "Irving",
      state: "TX",
      zip: "75061",
      price: 340000,
      beds: 4,
      baths: 2,
      sqft: 2000,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1009",
      address: "870 Lakeview Dr",
      city: "Garland",
      state: "TX",
      zip: "75040",
      price: 245000,
      beds: 3,
      baths: 2,
      sqft: 1500,
      updatedAt: "2026-01-07",
    },
    {
      externalId: "PUBLIC_1010",
      address: "19 Hillcrest Rd",
      city: "Garland",
      state: "TX",
      zip: "75041",
      price: 385000,
      beds: 4,
      baths: 3,
      sqft: 2400,
      updatedAt: "2026-01-07",
    },
  ]

  /**
   * 5-second deterministic time bucket
   */
  const timeBucket = Math.floor(Date.now() / 5000)

  /**
   * Rotate listings each bucket
   */
  const offset = timeBucket % baseListings.length
  const rotated = [
    ...baseListings.slice(offset),
    ...baseListings.slice(0, offset),
  ]

  /**
   * First 7 → force material change every 5 seconds
   * Last 3 → unchanged duplicates
   */
  const now = new Date().toISOString()

  const changedListings = rotated.slice(0, 7).map((l, index) => ({
    externalId: l.externalId + "_v" + timeBucket,
    address: l.address,
    city: l.city,
    state: l.state,
    zip: l.zip,
    price: l.price + (index + 1) * 1000,
    beds: l.beds,
    baths: l.baths,
    sqft: l.sqft,
    updatedAt: now,
  }))

  const duplicateListings = rotated.slice(7, 10)

  return [...changedListings, ...duplicateListings]
}