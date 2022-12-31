import { createError } from "../error";
import User from "../models/User";
import bcrypt from "bcrypt";
import { PAGINATION_SETTING, ROLE } from "../constants";

export const updateUser = async (req, res, next) => {
  try {
    const userData =await User.findById(req.user.id);
    if (req.params.id === req.user.id || userData.permission === ROLE.admin) {
      const { password, ...others } = req.body;

      await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...others },
        },
        { new: true }
      );

      res.status(200).json("Success!");
    } else {
      return next(createError(403, "you can update only your account"));
    }
  } catch (error) {
    next(error);
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

export const getUserList = async (req, res, next) => {
  const {
    page = PAGINATION_SETTING.DEFAULT_PAGE,
    size = PAGINATION_SETTING.PAGE_SIZE,
  } = req.body;

  const params = {
    ...req.body,
    page,
    size,
  };

  const skipItem = Math.max(
    Number(params.size) * Number(params.page) - Number(params.size),
    0
  );

  try {
    const userList = await User.find(
      { permission: { $ne: ROLE.admin } },
      {
        _id: 1,
        name: 1,
        phone: 1,
        email: 1,
        permission: 1,
        company: 1,
        image: 1,
        package: 1,
        status: 1,
        isVerified: 1,
      }
    )
      .skip(skipItem)
      .limit(Number(params.size))
      .sort({ createdAt: -1 });

    const countUser = await User.count({ permission: { $ne: ROLE.admin } });

    const userData =
      userList.length > 0
        ? {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItems: countUser,
              totalPages: Math.ceil(countUser / params.size),
            },
            listItems: userList,
          }
        : {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItems: 0,
              totalPages: 0,
            },
            listItems: [],
          };

    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json("User has been deleted.");
  } catch (error) {
    next(error);
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
