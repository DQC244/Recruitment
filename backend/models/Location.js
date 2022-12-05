import mongoose from "mongoose";

const Location = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Location", Location);
