import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import Application from "../models/Application.js";

export const addApplication = async (req, res, next) => {
  try {
    const newApplication = new Application({ ...req.body });

    await newApplication.save();

    res.status(200).send("success");
  } catch (error) {
    next(error);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const application = await Application.find({ jobId: req.body.jobId }).sort({
      createdAt: -1,
    });
  
    const applicationResult = {
      pagination: {
        page: 1,
        size: application.length,
        totalItems: application.length,
        totalPages: 1,
      },
      listItems: application,
    };

    res.status(200).json(applicationResult);
  } catch (error) {
    next(error);
  }
};
