import mongoose from "mongoose";

const JobType = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("JobType", JobType);
