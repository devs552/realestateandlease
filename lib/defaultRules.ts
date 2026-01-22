export const DEFAULT_RULES = [
  {
    engine: "PROFIT",
    key: "MIN_NET_PROFIT_PERCENT",
    value: 10,
    unit: "%",
    description: "Minimum net profit required for deal to pass",
    locked: true,
  },
  {
    engine: "DOM",
    key: "MAX_DOM_ALLOWED",
    value: 90,
    unit: "days",
    description: "Comparable properties must sell within this DOM",
    locked: true,
  },
  {
    engine: "COMP",
    key: "MAX_DISTANCE_MILES",
    value: 1,
    unit: "miles",
    description: "Max distance allowed for comparable selection",
    locked: true,
  },
  {
    engine: "ARV",
    key: "BUSY_STREET_PENALTY_PERCENT",
    value: -10,
    unit: "%",
    description: "ARV penalty applied to busy street properties",
    locked: true,
  },
]
