export interface COMP {
  address: string
  price: number
  dom: number // days on market
  distance: number // miles
}

export interface Deal {
  id: string
  address: string
  price: number
  arv: number // after repair value
  profitPercent: number
  status: "PASS" | "FAIL"
  createdDate: string
  comps: COMP[]
  arvAdjustments: Array<{
    category: string
    amount: number
    reason: string
  }>
  domGatingThreshold: number
  failureReasons?: string[]
}

export const mockDeals: Deal[] = [
  {
    id: "deal-001",
    address: "123 Main St, Springfield, IL 62701",
    price: 185000,
    arv: 280000,
    profitPercent: 28.5,
    status: "PASS",
    createdDate: "2024-12-20",
    comps: [
      { address: "125 Main St", price: 275000, dom: 45, distance: 0.1 },
      { address: "120 Main St", price: 285000, dom: 52, distance: 0.2 },
      { address: "130 Main St", price: 282000, dom: 38, distance: 0.3 },
    ],
    arvAdjustments: [
      { category: "Market Adjustment", amount: 5000, reason: "Recent market appreciation" },
      { category: "Condition Adjustment", amount: -3000, reason: "Slightly below average condition" },
    ],
    domGatingThreshold: 60,
  },
  {
    id: "deal-002",
    address: "456 Oak Ave, Springfield, IL 62702",
    price: 220000,
    arv: 310000,
    profitPercent: 18.2,
    status: "PASS",
    createdDate: "2024-12-20",
    comps: [
      { address: "458 Oak Ave", price: 312000, dom: 55, distance: 0.15 },
      { address: "454 Oak Ave", price: 308000, dom: 48, distance: 0.1 },
      { address: "460 Oak Ave", price: 315000, dom: 62, distance: 0.25 },
    ],
    arvAdjustments: [{ category: "Location Adjustment", amount: 8000, reason: "Premium corner lot" }],
    domGatingThreshold: 60,
  },
  {
    id: "deal-003",
    address: "789 Elm St, Springfield, IL 62703",
    price: 150000,
    arv: 220000,
    profitPercent: -8.3,
    status: "FAIL",
    createdDate: "2024-12-21",
    comps: [
      { address: "787 Elm St", price: 225000, dom: 75, distance: 0.1 },
      { address: "791 Elm St", price: 218000, dom: 68, distance: 0.2 },
    ],
    arvAdjustments: [{ category: "Condition Adjustment", amount: -5000, reason: "Major renovation needed" }],
    domGatingThreshold: 60,
    failureReasons: ["DOM gating exceeded (75 days > 60 day threshold)", "Negative profit margin"],
  },
  {
    id: "deal-004",
    address: "321 Pine Rd, Springfield, IL 62704",
    price: 195000,
    arv: 295000,
    profitPercent: 25.6,
    status: "PASS",
    createdDate: "2024-12-21",
    comps: [
      { address: "323 Pine Rd", price: 298000, dom: 42, distance: 0.1 },
      { address: "319 Pine Rd", price: 292000, dom: 50, distance: 0.15 },
    ],
    arvAdjustments: [{ category: "Market Adjustment", amount: 3000, reason: "Strong market conditions" }],
    domGatingThreshold: 60,
  },
  {
    id: "deal-005",
    address: "654 Birch Ln, Springfield, IL 62705",
    price: 175000,
    arv: 240000,
    profitPercent: 12.5,
    status: "FAIL",
    createdDate: "2024-12-21",
    comps: [
      { address: "656 Birch Ln", price: 238000, dom: 65, distance: 0.1 },
      { address: "652 Birch Ln", price: 242000, dom: 70, distance: 0.2 },
    ],
    arvAdjustments: [{ category: "Condition Adjustment", amount: -6000, reason: "Extensive repairs needed" }],
    domGatingThreshold: 60,
    failureReasons: ["DOM gating exceeded (70 days > 60 day threshold)"],
  },
]
