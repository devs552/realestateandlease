export type Deal = {
  explainability: any
  compsEvaluated: any
  selectedComps: any
  arvAdjustments: any
  baseArv: any
  adjustedArv: any
  calculator: any
  subject: any
  purchasePrice: any
  failureReasons: boolean
  _id: any
  id: string
  address: string
  price: number
  arv: number
  profitPercent: number
  status: "PASS" | "FAIL"
  date: string
  compCount: number
  domGating: boolean
}

export type COMP = {
  id: string
  address: string
  distance: number
  dom: number
  price: number
  adjustment: number
}

export type Admin = {
  id: string
  name: string
  email: string
  role: string
}
