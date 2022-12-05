import { createError } from "../error";
import User from "../models/User";
import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const { password, ...others } = req.body;

      const updateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...others },
        },
        { new: true }
      );

      res.status(200).json("Success!");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you can update only your account"));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      await User.findByIdAndDelete(req.params.id);

      res.status(200).json("User has been deleted.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "you can delete only your account"));
  }
};

export const selfUser = (req, res, next) => {
  try {
    const { password, ...others } = req.user._doc;
    return res.status(200).send(others);
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    const isCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Incorrect password!"));

    const newPassword = req.body.newPassword;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newPassword, salt);

    const newUser = { ...user._doc, password: hash };

    const updateUser = await User.findByIdAndUpdate(
      req.userId,
      {
        $set: newUser,
      },
      { new: true }
    );

    res.status(200).json(updateUser);
  } catch (error) {
    next(error);
  }
};
