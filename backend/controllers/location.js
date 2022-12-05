import { createError } from "../error";
import Location from "../models/Location";

export const addLocation = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newLocation = new Location({ name });
    await newLocation.save();

    res.status(200).send("Location is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteLocation = async (req, res, next) => {
  try {
    await Location.findByIdAndDelete(req.params.id);

    res.status(200).json("Location has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getLocation = async (req, res, next) => {
  try {
    const locationList = await Location.find();
    res.status(200).json(locationList);
  } catch (error) {
    next(error);
  }
};
