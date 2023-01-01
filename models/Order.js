import mongoose from "mongoose";

const Order = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    packageId: { type: String },
    amount: { type: Number, required: true },
    paymentId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Order", Order);
