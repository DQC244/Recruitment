import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    permission: { type: Number, default: 1 },
    company: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
