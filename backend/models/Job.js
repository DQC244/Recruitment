import mongoose from "mongoose";
import { JOB_STATUS, STATUS } from "../constants";

const Job = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    image: { type: String, require: true },
    type: { type: Number, require: true },
    location: { type: String, require: true },
    closeDate: { type: String, require: true },
    companyId: { type: String, require: true },
    tag: { type: String },
    qualification: Number,
    experience: Number,
    salary: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    status: { type: Number, default: JOB_STATUS.show, require: true },
  },
  { timestamps: true }
);

export default mongoose.model("Job", Job);
