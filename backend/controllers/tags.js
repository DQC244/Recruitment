import { createError } from "../error";
import Tag from "../models/Tags";

export const addTags = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newTags = new Tag({ name });
    await newTags.save();

    res.status(200).send("Tag is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteTags = async (req, res, next) => {
  try {
    await Tag.findByIdAndDelete(req.params.id);

    res.status(200).json("Tag has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    const tagList = await Tag.find();
    res.status(200).json(tagList);
  } catch (error) {
    next(error);
  }
};
