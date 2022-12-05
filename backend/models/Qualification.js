import mongoose from "mongoose";

const Qualification = new mongoose.Schema(
  {
    id: { type: String, unique, require: true },
    name: { type: String, unique, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Qualification", Qualification);
