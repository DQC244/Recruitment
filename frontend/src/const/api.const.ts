// Common
export const HEADER_DEFAULT = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

export const TIMEOUT = 30000;

// HTTP Status
export const STT_OK = 200;
export const STT_CREATED = 201;
export const STT_BAD_REQUEST = 400;
export const STT_UNAUTHORIZED = 401;
export const STT_FORBIDDEN = 403;
export const STT_NOT_FOUND = 404;
export const STT_INTERNAL_SERVER = 500;
export const STT_NOT_MODIFIED = 304;

// API
export const POST_LOGIN = "/api/auth/signIn";
export const POST_REGISTER = "api/auth/signup";
export const PUT_CHANGE_PASSWORD = "api/user/change-password";
export const PUT_UPDATE_USER = "/api/user/update/{id}";
export const GET_PROFILE = "/api/user/self";
export const GET_CATEGORIES = "/api/category/get";
export const POST_CREATE_COMPANY = "/api/company/add";
export const GET_COMPANY_DETAIL = "/api/company/get/{id}";
export const GET_COMPANY_LIST = "/api/company/get";
export const POST_CREATE_JOB = "/api/job/add";
export const GET_JOB_DETAIL = "/api/job/get/{id}";
export const GET_JOB_LIST = "/api/job/get";
export const POST_MY_JOB_LIST = "/api/job/get/self";
export const GET_PACKAGE_LIST = "/api/package/get";

export const POST_CHECKOUT = "/api/checkout/payment";
