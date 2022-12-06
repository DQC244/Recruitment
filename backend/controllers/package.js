import { createError } from "../error";
import Package from "../models/Package";

export const addPackage = async (req, res, next) => {
  try {
    const newPackage = new Package({ ...req.body });

    await newPackage.save();

    res.status(200).send("Package is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deletePackage = async (req, res, next) => {
  try {
    await Package.findByIdAndDelete(req.params.id);

    res.status(200).json("Package has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getPackage = async (req, res, next) => {
  try {
    const packageList = await Package.find();
    res.status(200).json(packageList);
  } catch (error) {
    next(error);
  }
};
