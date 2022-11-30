import { AppConstant } from "const";

export const getLabelJobType = (
  jobType?: typeof AppConstant.JOB_TYPE[keyof typeof AppConstant.JOB_TYPE]
) => {
  switch (jobType) {
    case AppConstant.JOB_TYPE.freelance:
      return "Freelance";
    case AppConstant.JOB_TYPE.fulltime:
      return "Fulltime";
    case AppConstant.JOB_TYPE.partTime:
      return "Part Time";
    case AppConstant.JOB_TYPE.internship:
      return "Internship";
    case AppConstant.JOB_TYPE.temporary:
      return "temporary";
    default:
      return "";
  }
};
