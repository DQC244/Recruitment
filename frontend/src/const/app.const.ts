export const KEY_TOKEN = "access_token";
export const COOKIE_EXPIRED_DATE = 7;

export const NOT_HAVE_VALUE_LABEL = "- -";
export const NOT_AVAILABLE_VALUE = "N/A";

export const DEBOUNCE_TIME_IN_MILLISECOND = 1000;

export const SIZE_PAGINATION_DEFAULT = 2;
export const DEFAULT_PAGINATION = {
  page: 1,
  size: SIZE_PAGINATION_DEFAULT,
};
export const SORT_DIRECTION = {
  asc: 1,
  desc: -1,
};

// Date, Time Format
export const DATE_FORMAT = "dd/MM/yy";
export const FULL_DATE_FORMAT = "dd/MM/yyyy";
export const TIME_FORMAT = "HH:mm";

export enum USER_TYPE {
  admin,
  employer,
  candidate,
}

export const COMPANY_LOCATION = {
  all: -1,
  hanoi: 0,
  hoChiMinh: 1,
  daNang: 2,
  other: 3,
};

export const JOB_TYPE = {
  freelance: 0,
  fulltime: 1,
  partTime: 2,
  internship: 3,
  temporary: 4,
};

export const COMPANY_SIZE = {
  0: "1-10",
  1: "11-50",
  2: "51-100",
  3: "101-200",
  4: "201-500",
  5: "500+",
};

export const QUALIFICATION = {
  bachelorDegree: 0,
  doctorateDegree: 1,
  highSchool: 2,
  masterDegree: 3,
};

export const EXPERIENCE_TYPE = {
  fresher: 0,
  junior: 1,
  middle: 2,
  senior: 3,
};

export enum STATUS {
  pending = 0,
  published,
  expired,
  reject,
}
