import mongoose from "mongoose";

const Job = new mongoose.Schema(
  {
    id: { type: String, unique: true, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    categoryId: { type: String, require: true },
    type: { type: String, require: true },
    tag: { type: String },
    location: { type: String, require: true },
    closeDate: { type: Date, require: true },
    qualificationId: String,
    experienceId: String,
    salary: {
      min: Number,
      max: Number,
    },
    companyId: { type: String, require: true },
    experience: { type: String },
    image: { type: String, require: true },
  },
  { timestamps: true }
);
