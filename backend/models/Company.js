import mongoose from "mongoose";

const Company = new mongoose.Schema(
  {
    id: { type: String, unique: true, require: true },
    name: { type: String, unique: true, require: true },
    email: { type: String, unique: true, require: true },
    phone: { type: String, unique: true },
    locationId: { type: String, require: true },
    since: { type: Date, require: true },
    categoryId: { type: String, require: true },
    teamSize: { type: String },
    description: { type: String },
    image: [{ type: String }],
    logo: { type: String, unique: true, require: true },
    website: {
      web: { type: String, unique: true },
      facebook: { type: String, unique: true },
      twitter: { type: String, unique: true },
      linkedin: { type: String, unique: true },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Company", Company);
