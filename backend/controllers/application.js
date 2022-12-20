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
    const application =await Application.find({ jobId: req.body.jobId });


    res.status(200).send(application);
  } catch (error) {
    next(error);
  }
};
