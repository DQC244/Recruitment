import dayjs from "dayjs";
import { DAY_BY_TIMESTAMP } from "../constants";
import { createError } from "../error";
import Order from "../models/Order";
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

export const verifyPackage = async (req, res, next) => {
  try {
    const orderList = await Order.find({
      userId: req.userId,
      packageId: req.user.package,
    }).sort({ createdAt: -1 });

    const order = orderList[0];

    if (!order) {
      return res.status(200).json(false);
    }

    const packageInfo = await Package.findById(order.packageId);

    const now = parseInt(Date.now() / 1000);

    const deviant = (now - dayjs(order.createdAt).unix()) / DAY_BY_TIMESTAMP;

    if (deviant >= packageInfo.expireDay) {
      return res.status(200).json(false);
    }

    res.status(200).json(true);
  } catch (error) {
    next(error);
  }
};
