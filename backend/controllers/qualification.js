import { createError } from "../error";
import Qualification from "../models/Qualification";

export const addQualification = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newQualification = new Qualification({ name });
    await newQualification.save();

    res.status(200).send("Qualification is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteQualification = async (req, res, next) => {
  try {
    await Qualification.findByIdAndDelete(req.params.id);

    res.status(200).json("Qualification has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getQualification = async (req, res, next) => {
  try {
    const qualificationList = await Qualification.find();
    res.status(200).json(qualificationList);
  } catch (error) {
    next(error);
  }
};
