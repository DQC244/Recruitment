import mongoose from "mongoose";
import { PAGINATION_SETTING } from "../constants";
import Order from "../models/Order";

export const getOrderList = async (req, res, next) => {
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
    const orderList = await Order.find()
      .skip(skipItem)
      .limit(Number(params.size))
      .sort({ createdAt: -1 });

    const count = await Order.count();

    const orderData =
      orderList.length > 0
        ? {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItems: count,
              totalPages: Math.ceil(count / params.size),
            },
            listItems: orderList,
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

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
};
