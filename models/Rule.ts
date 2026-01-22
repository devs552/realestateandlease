import mongoose from "mongoose"

const RuleSchema = new mongoose.Schema(
  {
    engine: {
      type: String,
      enum: ["COMP", "DOM", "ARV", "PROFIT"],
      required: true,
    },
    key: { type: String, required: true, unique: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    unit: { type: String },
    description: { type: String },
    locked: { type: Boolean, default: true },
  },
  { timestamps: true }
)

export default mongoose.models.Rule || mongoose.model("Rule", RuleSchema)
