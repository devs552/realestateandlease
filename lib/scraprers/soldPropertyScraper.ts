export interface SoldProperty {
  address: string
  soldPrice: number
  soldDate: Date
  squareFeet: number
  yearBuilt: number
  beds: number
  baths: number
  neighborhoodId: string
  distanceMiles: number
  hasGarage: boolean
  isBusyStreet: boolean
  nearCommercial: boolean
  nearMultiFamily: "NONE" | "SMALL" | "LARGE"
  nearFreeway: boolean
}
