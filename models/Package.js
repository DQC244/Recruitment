import mongoose from "mongoose";

const Package = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    description: { type: String, unique: true },
    price: { type: Number, require: true },
    expireDay: { type: Number, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Package", Package);
