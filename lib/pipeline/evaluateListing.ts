import { PublicListing } from "../sourcing/publicListingsSource"

export function evaluateProperty(listing: PublicListing) {
  /* ================================
     1️⃣ BASE ARV LOGIC (Milestone 1)
  ================================= */
  const baseArv = Math.round(listing.price * 1.25)
  const adjustedArv = Math.round(baseArv * 0.97)
       
  /* ================================
     2️⃣ COST ASSUMPTIONS (Explicit)
  ================================= */
  const CLOSING_COST_RATE = 0.02      // 2%
  const HOLDING_COST_RATE = 0.01      // 1% per month
  const HOLDING_MONTHS = 6
  const REHAB_COST_PER_SQFT = 25      // $25 / sqft

  /* ================================
     3️⃣ COST CALCULATIONS
  ================================= */
  const closingCosts = Math.round(listing.price * CLOSING_COST_RATE)

  const holdingCosts = Math.round(
    listing.price * HOLDING_COST_RATE * HOLDING_MONTHS
  )

  const rehabCosts = Math.round(listing.sqft * REHAB_COST_PER_SQFT)

  const totalCosts =
    listing.price +
    closingCosts +
    holdingCosts +
    rehabCosts

  /* ================================
     4️⃣ PROFIT ANALYSIS
  ================================= */
  const netProfit = adjustedArv - totalCosts

  const profitMargin = (netProfit / adjustedArv) * 100

  const status = profitMargin >= 10 ? "PASS" : "FAIL"

  /* ================================
     5️⃣ RETURN STRUCTURE (AUDITABLE)
  ================================= */
  return {
    externalId: listing.externalId,
    address: listing.address,
    price: listing.price,

    underwriting: {
      status,
      baseArv,
      adjustedArv,

      costs: {
        closingCosts,
        holdingCosts,
        rehabCosts,
        totalCosts,
      },

      profit: {
        netProfit,
        profitMargin: Number(profitMargin.toFixed(2)),
      },

      failureReasons:
        status === "FAIL"
          ? [`Profit margin ${profitMargin.toFixed(2)}% below 10% threshold`]
          : [],
    },

    evaluatedAt: new Date().toISOString(),
  }
}
