import { CALCULATOR_DEFAULTS } from "@/lib/config/calculatorDefaults"

export function calculateDealCosts({
  purchasePrice,
  adjustedArv,
  squareFeet,
}: {
  purchasePrice: number
  adjustedArv: number
  squareFeet: number
}) {
  const cc = purchasePrice * CALCULATOR_DEFAULTS.closingCostPercent
  const hc =
    CALCULATOR_DEFAULTS.holdingCostPerMonth *
    CALCULATOR_DEFAULTS.avgHoldMonths
  const rehab = squareFeet * CALCULATOR_DEFAULTS.rehabCostPerSqft
  const realtorFees = adjustedArv * CALCULATOR_DEFAULTS.realtorFeePercent

  const totalCosts =
    purchasePrice + cc + hc + rehab + realtorFees

  const netProfit = adjustedArv - totalCosts
  const profitPercent = (netProfit / purchasePrice) * 100

  return {
    purchasePrice,
    closingCosts: cc,
    holdingCosts: hc,
    rehabCosts: rehab,
    realtorFees,
    totalCosts,
    netProfit,
    profitPercent,
  }
}
