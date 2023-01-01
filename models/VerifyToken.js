import mongoose from "mongoose";
import { HOUR_BY_TIMESTAMP } from "../constants";

const VerifyToken = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    verifyToken: { type: String },
    expireDate: {
      type: String,
      required: true,
      default: Date.now() / 1000 + HOUR_BY_TIMESTAMP,
    },
  },
  { timestamps: true }
);

export default mongoose.model("VerifyToken", VerifyToken);
