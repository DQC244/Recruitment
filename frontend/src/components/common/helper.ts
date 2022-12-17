import { AppConstant } from "const";
import { STATUS } from "const/app.const";
import theme from "public/material";

export const getExperienceLabel = (type?: number) => {
  switch (type) {
    case AppConstant.EXPERIENCE_TYPE.fresher: {
      return "1-2 years";
    }
    case AppConstant.EXPERIENCE_TYPE.junior: {
      return "2-3 years";
    }
    case AppConstant.EXPERIENCE_TYPE.middle: {
      return "3-5 years";
    }
    case AppConstant.EXPERIENCE_TYPE.senior: {
      return "5+ years";
    }
    default:
      return "";
  }
};
export const getQualificationLabel = (type?: number) => {
  switch (type) {
    case AppConstant.QUALIFICATION.bachelorDegree: {
      return "Master Degree";
    }
    case AppConstant.QUALIFICATION.doctorateDegree: {
      return "Doctorate Degree";
    }
    case AppConstant.QUALIFICATION.highSchool: {
      return "High School";
    }
    case AppConstant.QUALIFICATION.masterDegree: {
      return "Master Degree";
    }
    default:
      return "";
  }
};

export const getStatusLabel = (id?: STATUS) => {
  switch (id) {
    case AppConstant.STATUS.expired:
      return "Expired";
    case AppConstant.STATUS.pending:
      return "Pending";
    case AppConstant.STATUS.published:
      return "Published";
    case AppConstant.STATUS.reject:
      return "Rejected";
    default:
      return "";
  }
};

export const getColorStatus = (id?: STATUS) => {
  switch (id) {
    case AppConstant.STATUS.expired:
      return theme.palette.error.light;
    case AppConstant.STATUS.pending:
      return theme.palette.warning.light;
    case AppConstant.STATUS.published:
      return theme.palette.success.main;
    case AppConstant.STATUS.reject:
      return theme.palette.error.main;
    default:
      return "";
  }
};
