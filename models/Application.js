import mongoose from "mongoose";

const Application = new mongoose.Schema(
  {
    name: { type: String, require: true },
    jobId: { type: String, require: true },
    email: { type: String, require: true },
    message: { type: String, require: true },
    cvUrl: { type: String, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Application", Application);
