import mongoose from "mongoose";

const CompanySize = new mongoose.Schema(
  {
    id: { type: String, unique, require: true },
    name: { type: String, unique, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("CompanySize", CompanySize);
