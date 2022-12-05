import mongoose from "mongoose";

const Experience = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Experience", Experience);
