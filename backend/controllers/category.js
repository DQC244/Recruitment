import { createError } from "../error";
import Category from "../models/Category";

export const addCategory = async (req, res, next) => {
  try {
    const name = req.body.name;
    if (!name) {
      return next(createError(400, "Filed name is required"));
    }
    const newCategory = new Category({ name, image: req.body.image });
    await newCategory.save();

    res.status(200).send("Category is created");
  } catch (error) {
    if (error.code === 11000) {
      const msg = Object.keys(error.keyValue)[0] + " existed!";

      return next(createError(400, msg));
    } else {
      next(error);
    }
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json("Category has been deleted.");
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      $set: { ...req.body },
    });
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const categoryList = await Category.find();
    res.status(200).json(categoryList);
  } catch (error) {
    next(error);
  }
};
