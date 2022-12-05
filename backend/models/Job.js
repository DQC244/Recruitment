import mongoose from "mongoose";

const Job = new mongoose.Schema(
  {
    id: { type: String, unique: true, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    categoryId: { type: String, require: true },
    typeId: { type: String, require: true },
    tagId: { type: String, require: true },
    locationId: { type: String, require: true },
    closeDate: { type: Date, require: true },
    qualificationId: String,
    experienceId: String,
    salary: {
      min: Number,
      max: Number,
    },
    companyId: { type: String, require: true },
    experience: { type: String, require: true },
    image: { type: String, require: true },
  },
  { timestamps: true }
);
