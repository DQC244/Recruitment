import { createError } from "../error";
import CompanySize from "../models/CompanySize";
export const addCompanySize = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newCompanySize = new CompanySize({ name });
    await newCompanySize.save();

    res.status(200).send("CompanySize is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteCompanySize = async (req, res, next) => {
  try {
    await CompanySize.findByIdAndDelete(req.params.id);

    res.status(200).json("CompanySize has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getCompanySize = async (req, res, next) => {
  try {
    const companySizeList = await CompanySize.find();
    res.status(200).json(companySizeList);
  } catch (error) {
    next(error);
  }
};
