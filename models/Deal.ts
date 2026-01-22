import mongoose from "mongoose"
const SubjectPropertySchema = new mongoose.Schema({
  address: String,
  neighborhoodId: String,
  squareFeet: Number,
  yearBuilt: Number,
  beds: Number,
  baths: Number,
  propertyType: String,
  hasGarage: Boolean,
  isBusyStreet: Boolean,
})

const CompSchema = new mongoose.Schema({
  address: String,
  soldPrice: Number,
  soldDate: Date,
  squareFeet: Number,
  yearBuilt: Number,
  distanceMiles: Number,
  neighborhoodId: String,

  eligibility: {
    included: Boolean,
    exclusionReasons: [String],
  },
})

const CalculatorSchema = new mongoose.Schema({
  purchasePrice: Number,
  closingCosts: Number,
  holdingCosts: Number,
  rehabCostPerSqft: Number,
  realtorFeesPercent: Number,
  minimumProfitPercent: Number,
})
const ArvAdjustmentSchema = new mongoose.Schema({
  rule: String,
  impactPercent: Number,
  reason: String,
})
const DealSchema = new mongoose.Schema(
  {
    subject: SubjectPropertySchema,
    calculator: CalculatorSchema,

    compsEvaluated: [CompSchema],
    selectedComps: [CompSchema],

    baseArv: Number,
    adjustedArv: Number,

    arvAdjustments: [ArvAdjustmentSchema],

    domDays: Number,
    minRequiredComps: Number,

    status: {
      type: String,
      enum: ["PASS", "FAIL"],
      default: "FAIL",
    },

    failureReasons: [String],

    explainability: {
      arvExplanation: String,
      compSelectionExplanation: String,
      rejectionExplanation: String,
    },

    source: {
      type: String,
      enum: ["AUTO", "MANUAL"],
      default: "AUTO",
    },
  },
  { timestamps: true }
)

export default mongoose.models.Deal || mongoose.model("Deal", DealSchema)
