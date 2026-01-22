import crypto from "crypto"
import { PublicListing } from "../lib/sourcing/normalizeListing"

export function fingerprint(listing: PublicListing) {
  const payload = {
   externalId: listing.externalId,
    address: listing.address,
    city: listing.city,
    state: listing.state,
    zip: listing.zip,
    price: listing.price,
    beds: listing.beds,
    baths: listing.baths,
    sqft: listing.sqft,
    status: listing.status ?? "ACTIVE",   // 👈 ADD
     dom: listing.dom,
     busy_road: (listing as any).busy_road ?? false, // 👈 ADD   
    updatedAt: listing.updatedAt,          // 👈 ADD
  }

  return crypto
    .createHash("sha256")
    .update(JSON.stringify(payload))
    .digest("hex")
}
