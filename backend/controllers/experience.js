import { createError } from "../error";
import Experience from "../models/Experience";

export const addExperience = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newExperience = new Experience({ name });
    await newExperience.save();

    res.status(200).send("Experience is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteExperience = async (req, res, next) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);

    res.status(200).json("Experience has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getExperience = async (req, res, next) => {
  try {
    const experienceList = await Experience.find();
    res.status(200).json(experienceList);
  } catch (error) {
    next(error);
  }
};
