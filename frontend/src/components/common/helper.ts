import { AppConstant } from "const";

export const getExperienceLabel = (type: number) => {
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
    case AppConstant.EXPERIENCE_TYPE.junior: {
      return "5+ years";
    }
  }
};
export const getQualificationLabel = (type: number) => {
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
  }
};
