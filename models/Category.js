import mongoose from "mongoose";

const Category = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    image: { type: String, unique: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", Category);
