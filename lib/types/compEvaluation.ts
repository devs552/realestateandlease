export interface CompEvaluation {
  address: string
  soldPrice: number
  soldDate: Date
  squareFeet: number
  yearBuilt: number
  beds: number
  baths: number
  neighborhoodId: string
  distanceMiles: number

  included: boolean
  exclusionReasons: string[]
}
