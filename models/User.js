import mongoose from "mongoose";
import { USER_STATUS } from "../constants";

const User = new mongoose.Schema(
  {
    name: { type: String, require: true },
    phone: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    permission: { type: Number, default: 1 },
    company: String,
    image: String,
    status: { type: Number, default: USER_STATUS.active },
    package: { type: String },
    isVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
