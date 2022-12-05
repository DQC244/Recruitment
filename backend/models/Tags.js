import mongoose from "mongoose";

const Tags = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tags", Tags);
