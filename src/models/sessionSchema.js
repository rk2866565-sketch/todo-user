import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    issuedAt: {
      type: Date,
      default: Date.now()
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"user",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("session", sessionSchema)