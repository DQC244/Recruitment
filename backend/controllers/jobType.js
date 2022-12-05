import { createError } from "../error";
import JobType from "../models/JobType";

export const addJobType = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newJobType = new JobType({ name });
    await newJobType.save();

    res.status(200).send("JobType is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteJobType = async (req, res, next) => {
  try {
    await JobType.findByIdAndDelete(req.params.id);

    res.status(200).json("JobType has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getJobType = async (req, res, next) => {
  try {
    const jobTypeList = await JobType.find();
    res.status(200).json(jobTypeList);
  } catch (error) {
    next(error);
  }
};
