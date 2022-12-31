import mongoose from "mongoose";
import { PAGINATION_SETTING, ROLE, STATUS } from "../constants";
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
  if (params.search || params.location) {
    filter = { $text: { $search: params.search || params.location } };
  } else {
    filter = {
      categoryId: params.categoryId,
      status: params.status,
    };

    Object.keys(filter).forEach((key) =>
      Boolean(filter[key]) === false && typeof filter[key] !== "number"
        ? delete filter[key]
        : {}
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
              totalItems: countCompany,
              totalPages: Math.ceil(countCompany / params.size),
            },
            listItems: companyList,
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

    res.status(200).json(companyData);
  } catch (error) {
    next(error);
  }
};

export const getCompanyDetail = async (req, res, next) => {
  try {
    const company = await Company.findById(req.params.id);
    const category = await Category.findById(company.categoryId);
    const totalJob = await Job.find({ companyId: req.params.id }).count();

    res
      .status(200)
      .json({ ...company._doc, categoryName: category?.name, totalJob });
  } catch (error) {
    next(error);
  }
};

// update my company

export const updateCompanyDetail = async (req, res, next) => {
  try {
    if (req.user.company !== req.params.id) {
      return res.status(400).json("you can update only your company");
    }
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: { ...req.body, status: STATUS.pending },
      },
      { new: true }
    );

    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

// Approve
export const approveCompany = async (req, res, next) => {
  try {
    const company = await Company.findByIdAndUpdate(
      req.params.id,
      {
        $set: { status: req.body.status },
      },
      { new: true }
    );

    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};
