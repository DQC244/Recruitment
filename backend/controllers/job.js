import mongoose from "mongoose";
import { PAGINATION_SETTING, STATUS } from "../constants";
import { createError } from "../error";
import Company from "../models/Company";
import Job from "../models/Job";

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

export const getJobList = async (req, res, next) => {
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

  let filter = {
    location: params.location,
    type: params.type,
    experience: params.experience,
  };

  if (!isNaN(params.salary)) {
    filter = {
      ...filter,
      "salary.min": { $lte: params.salary },
      "salary.max": { $gte: params.salary },
    };
  }

  Object.keys(filter).forEach((key) =>
    Boolean(filter[key]) === false ||
    (Array.isArray(filter[key]) && Boolean(filter[key].length === false))
      ? delete filter[key]
      : {}
  );

  try {
    const jobList = await Job.find(filter)
      .skip(skipItem)
      .limit(Number(params.size))
      .sort({ createdAt: -1 });

    const countJob = await Job.count(filter);

    const jobData =
      jobList.length > 0
        ? {
            pagination: {
              page: Number(params.page),
              size: Number(params.size),
              totalItem: countJob,
              totalPages: Math.ceil(countJob / params.size),
            },
            listItems: jobList,
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

    res.status(200).json(jobData);
  } catch (error) {
    next(error);
  }
};

export const getJobDetail = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);

    const company = await Company.findById(job.companyId);

    res.status(200).json({ job, company });
  } catch (error) {
    next(error);
  }
};
