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
export const DELETE_USER = "/api/user/delete/{id}";

export const GET_CATEGORIES = "/api/category/get";
export const UPDATE_CATEGORY = "/api/category/update/{id}";
export const CREATE_CATEGORY = "/api/category/add";
export const DELETE_CATEGORY = "/api/category/delete/{id}";

export const POST_CREATE_COMPANY = "/api/company/add";
export const GET_COMPANY_DETAIL = "/api/company/get/{id}";
export const GET_COMPANY_LIST = "/api/company/get";
export const POST_CREATE_JOB = "/api/job/add";
export const GET_JOB_DETAIL = "/api/job/get/{id}";
export const GET_JOB_LIST = "/api/job/get";
export const POST_MY_JOB_LIST = "/api/job/get-self";
export const GET_PACKAGE_LIST = "/api/package/get";

export const POST_CHECKOUT = "/api/checkout/payment";
export const PUT_UPDATE_COMPANY = "/api/company/update/{id}";
export const DELETE_MY_JOB = "/api/job/delete/{id}";

export const POST_VERIFY_ADMIN = "/api/user/verify-admin";
export const POST_GET_ORDER = "/api/order/get";
export const POST_GET_USER = "/api/user/get-list";
export const VERIFY_PACKAGE = "/api/package/verify-package";

export const APPROVE_COMPANY = "/api/company/approve/{id}";
export const DELETE_PACKAGE = "/api/package/delete/{id}";
export const UPDATE_PACKAGE = "/api/package/update/{id}";
export const CREATE_PACKAGE = "/api/package/add";
export const GET_ORDER_INCOME = "/api/order/income";

export const APPLY_JOB = "/api/application/add";
export const GET_APPLICATION_LIST = "/api/application/get";
export const GET_APPLICATION_CONVERT = "/api/application/convert-pdf";

export const VERIFY_CODE = "/api/auth/verify-token";
export const UPDATE_JOB = "/api/job/update/{id}";
