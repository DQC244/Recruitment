import mongoose from "mongoose";
import { PAGINATION_SETTING, STATUS } from "../constants";
import { createError } from "../error";
import Category from "../models/Category";
import Job from "../models/Job";
import User from "../models/User";

export const addJob = async (req, res, next) => {
  const user = req.user;
  if (user.company) {
    try {
      const newJob = new Job({ ...req.body, companyId: user.company });

      await newJob.save();

      res.status(200).send("Job is created");
    } catch (error) {
      if (error.code === 11000) {
        const msg = Object.keys(error.keyValue)[0] + " existed!";

        return next(createError(400, msg));
      } else {
        next(error);
      }
    }
  } else {
    next(createError(400, "You must have company first"));
  }
};

export const deleteJob = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (job.companyId !== req.user.company) {
      return next(createError(403, "you can delete only your Job"));
    }
    if (job.status === STATUS.published) {
      return next(createError(400, "you can't delete posted jobs"));
    }
    await Job.deleteOne(job);

    res.status(200).json("Job has been deleted.");
  } catch (error) {
    next(error);
  }
};

// export const getJobList = async (req, res, next) => {
//   const {
//     page = PAGINATION_SETTING.DEFAULT_PAGE,
//     size = PAGINATION_SETTING.PAGE_SIZE,
//   } = req.query;

//   const params = {
//     ...req.query,
//     page,
//     size,
//   };

//   const skipItem = Math.max(
//     Number(params.size) * Number(params.page) - Number(params.size),
//     0
//   );

//   let filter;
//   if (params.search) {
//     filter = { $text: { $search: params.search } };
//   } else {
//     filter = {
//       categoryId: params.categoryId,
//       location: params.location,
//     };

//     Object.keys(filter).forEach((key) =>
//       Boolean(filter[key]) === false ? delete filter[key] : {}
//     );
//   }

//   try {
//     const companyList = await Job.find(filter)
//       .skip(skipItem)
//       .limit(Number(params.size) * Number(params.page))
//       .sort({ createdAt: -1 });

//     const countCompany = await Job.count(filter);

//     const companyData =
//       companyList.length > 0
//         ? {
//             pagination: {
//               page: Number(params.page),
//               size: Number(params.size),
//               totalItem: countCompany,
//               totalPages: Math.ceil(countCompany / params.size),
//             },
//             listItems: companyList,
//           }
//         : {
//             pagination: {
//               page: Number(params.page),
//               size: Number(params.size),
//               totalItem: 0,
//               totalPages: 0,
//             },
//             listItems: [],
//           };

//     res.status(200).json(companyData);
//   } catch (error) {
//     next(error);
//   }
// };

export const getJobDetail = async (req, res, next) => {
  try {
    const company = await Job.findById(req.params.id);
    const { name } = await Category.findById(company.categoryId);
    res.status(200).json({ ...company._doc, categoryName: name });
  } catch (error) {
    next(error);
  }
};
