import mongoose from "mongoose";
import { PAGINATION_SETTING, ROLE, STATUS } from "../constants";
import { createError } from "../error";
import Application from "../models/Application";
import Company from "../models/Company";
import Job from "../models/Job";

export const addJob = async (req, res, next) => {
  const user = req.user;
  if (user.company && user.package) {
    try {
      const company = await Company.findById(user.company);
      if (company.status !== STATUS.published) {
        return res(createError(400, "Your company has not been approved"));
      }

      if (user.permission === ROLE.candidate) {
        return res(
          createError(400, "You must be an employer to take this action")
        );
      }
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
    companyId: params.companyId,
    status: STATUS.published,
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

  if (params.search) {
    filter = { $text: { $search: params.search } };
  }

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
              totalItems: countJob,
              totalPages: Math.ceil(countJob / params.size),
            },
            listItems: jobList,
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

export const getMyJob = async (req, res, next) => {
  try {
    const job = await Job.find({ companyId: req.user.company }).sort({
      createdAt: -1,
    });

    const newJob = await Promise.all(
      job.map(async (item) => {
        const total = await Application.find({ jobId: item._id }).count();
        return { ...item._doc, application: total };
      })
    );

   
    const jobResult = {
      pagination: {
        page: 1,
        size: newJob.length,
        totalItems: newJob.length,
        totalPages: 1,
      },
      listItems: newJob,
    };

    res.status(200).json(jobResult);
  } catch (error) {
    next(error);
  }
};

export const handleDeleteJob = async (req, res, next) => {
  try {
    const user = req.user;
    const jobDelete = await Job.findById(req.params.id);
    if (user.company !== jobDelete.companyId) {
      return next(createError(403, "you can delete only your Job"));
    }
    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json("Job has been deleted.");
  } catch (error) {
    next(error);
  }
};
