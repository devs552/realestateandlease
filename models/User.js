import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },

    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
