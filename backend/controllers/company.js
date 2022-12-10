import mongoose from "mongoose";
import { PAGINATION_SETTING } from "../constants";
import { createError } from "../error";
import Category from "../models/Category";
import Company from "../models/Company";
import Job from "../models/Job";
import User from "../models/User";

export const addCompany = async (req, res, next) => {
  if (!req.user.company) {
    const userId = req.userId;

    const newCompany = new Company({ ...req.body });
    newCompany
      .save()
      .then(async () => {
        await User.findByIdAndUpdate(
          userId,
          {
            $set: { company: newCompany._id.toString() },
          },
          { new: true }
        );
      })
      .then(() => {
        res.status(200).send(newCompany);
      })
      .catch((error) => {
        if (error.code === 11000) {
          const msg = Object.keys(error.keyValue)[0] + " existed!";

          return next(createError(400, msg));
        } else {
          next(error);
        }
      });
  } else {
    return next(createError(400, "You created other company"));
  }
};

export const deleteCompany = async (req, res, next) => {
  if (req.params.id === req.user.company) {
    Promise.all([
      User.findByIdAndUpdate(
        req.userId,
        {
          $set: { company: "" },
        },
        { new: true }
      ),
      Company.findByIdAndDelete(req.params.id),
    ])
      .then(() => {
        res.status(200).json("Company has been deleted.");
      })
      .catch(() => {
        next(error);
      });
  } else {
    return next(createError(403, "you can delete only your company"));
  }
};

export const getCompany = async (req, res, next) => {
  const {
    page = PAGINATION_SETTING.DEFAULT_PAGE,
    size = PAGINATION_SETTING.PAGE_SIZE,
  } = req.query;

  const params = {
    ...req.query,
    page,
    size,
  };

  const skipItem = Math.max(
    Number(params.size) * Number(params.page) - Number(params.size),
    0
  );

  let filter;
  if (params.search) {
    filter = { $text: { $search: params.search } };
  } else {
    filter = {
      categoryId: params.categoryId,
      location: params.location,
    };

    Object.keys(filter).forEach((key) =>
      Boolean(filter[key]) === false ? delete filter[key] : {}
    );
  }

  try {
    const companyList = await Company.find(filter)
      .skip(skipItem)
      .limit(Number(params.size))
      .sort({ createdAt: -1 });

    const countCompany = await Company.count(filter);

    const companyData =
      companyList.length > 0
        ? {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItem: countCompany,
              totalPages: Math.ceil(countCompany / params.size),
            },
            listItems: companyList,
          }
        : {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItem: 0,
              totalPages: 0,
            },
            listItems: [],
          };

    res.status(200).json(companyData);
  } catch (error) {
    next(error);
  }
};

export const getCompanyDetail = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    const { name } = await Category.findById(company.categoryId);

    res.status(200).json({ ...company._doc, categoryName: name });
  } catch (error) {
    next(error);
  }
};
