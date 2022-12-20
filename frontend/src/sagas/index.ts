/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AdminTypes, CompanyTypes, JobTypes } from "redux-store";
import { getOrderList, getUserList } from "./admin.saga";

/* ------------- Sagas ------------- */
import {
  getCategoryList,
  getCompanyDetail,
  getCompanyList,
  getPackageList,
} from "./company.saga";
import { getApplication, getJobDetail, getJobList, getMyJobList } from "./job.saga";

/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    takeLatest(CompanyTypes.GET_COMPANY, getCompanyDetail),
    takeLatest(CompanyTypes.GET_COMPANY_LIST, getCompanyList),
    takeLatest(CompanyTypes.GET_CATEGORY_LIST, getCategoryList),
    takeLatest(CompanyTypes.GET_PACKAGE_LIST, getPackageList),
    takeLatest(JobTypes.GET_JOB, getJobDetail),
    takeLatest(JobTypes.GET_JOB_LIST, getJobList),
    takeLatest(JobTypes.GET_MY_JOB_LIST, getMyJobList),
    takeLatest(JobTypes.GET_MY_APPLICATION, getApplication),
    takeLatest(AdminTypes.GET_ORDER_LIST, getOrderList),
    takeLatest(AdminTypes.GET_USER_LIST, getUserList),
  ]);
}

export default rootSaga;
