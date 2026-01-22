// This should be in your lib/sourcing/normalizeListing.ts

export interface PublicListing {
  externalId: string
  address: string
  city: string
  state: string
  zip: string
  price: number
  beds: number
  baths: number
  sqft: number
  dom?: number
  status?: string
  busy_road?: boolean
  near_commercial?: boolean
  multifamily_nearby?: boolean
  has_garage?: boolean
  has_freeway_access?: boolean
  soldDate?: string
  yearBuilt?: number
  updatedAt: string
}

/**
 * Converts raw property data from source to normalized internal format
 */
export function normalizeListing(record: any): PublicListing | undefined {
  try {
    // Validate required fields
    if (!record || typeof record !== "object") {
      console.warn("Invalid record format:", record)
      return undefined
    }

    // Check for required fields
    const requiredFields = ["externalId", "address", "city", "state", "zip", "price", "beds", "baths", "sqft", "dom", "status"]
    const missing = requiredFields.filter(field => !(field in record))
    
    if (missing.length > 0) {
      console.warn(`Missing required fields: ${missing.join(", ")}`)
      return undefined
    }

    // Ensure externalId is numeric
    const externalId = typeof record.externalId === "string" 
      ? record.externalId 
      : parseInt(String(record.externalId), 10)

    if (!externalId) {

      console.warn("externalId must be a string:", record.externalId)
      return undefined
    }

    // Return normalized listing
    const normalized: PublicListing = {
      externalId: externalId,
      address: String(record.address).trim(),
      city: String(record.city).trim(),
      state: String(record.state).trim(),
      zip: String(record.zip).trim(),
      price: Math.round(Number(record.price)),
      beds: Math.round(Number(record.beds)),
      baths: Math.round(Number(record.baths)),
      sqft: Math.round(Number(record.sqft)),
      status: String(record.status).trim(),
      dom: record.dom !== undefined ? Math.round(Number(record.dom)) : undefined,
      busy_road: Boolean(record.busy_road),
      near_commercial: Boolean(record.near_commercial),
      multifamily_nearby: Boolean(record.multifamily_nearby),   
      has_garage: Boolean(record.has_garage),
      has_freeway_access: Boolean(record.has_freeway_access), 
      soldDate: record.soldDate ? String(record.soldDate).trim() : undefined,   
      yearBuilt: record.yearBuilt ? Math.round(Number(record.yearBuilt)) : undefined,
      updatedAt: record.updatedAt || new Date().toISOString(),
    }

    return normalized
  } catch (err) {
    console.error("Error normalizing listing:", err, "Record was:", record)
    return undefined
  }
}