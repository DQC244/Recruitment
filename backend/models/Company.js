import mongoose from "mongoose";

const Company = new mongoose.Schema(
  {
    name: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    phone: { type: String, unique: true, require: true },
    location: { type: String, require: true },
    since: { type: Date, require: true },
    categoryId: { type: String, require: true },
    teamSize: { type: String },
    description: { type: String, require: true },
    logo: { type: String, unique: true, require: true },
    status: { type: String, default: 0, require: true },
    website: {
      web: { type: String, unique: true, sparse: true },
      facebook: { type: String, unique: true, sparse: true },
      twitter: { type: String, unique: true, sparse: true },
      linkedin: { type: String, unique: true, sparse: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", Company);
