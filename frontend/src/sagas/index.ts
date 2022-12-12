/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { CompanyTypes, JobTypes } from "redux-store";

/* ------------- Sagas ------------- */
import {
  getCategoryList,
  getCompanyDetail,
  getCompanyList,
  getPackageList,
} from "./company.saga";
import { getJobDetail, getJobList } from "./job.saga";

/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    takeLatest(CompanyTypes.GET_COMPANY, getCompanyDetail),
    takeLatest(CompanyTypes.GET_COMPANY_LIST, getCompanyList),
    takeLatest(CompanyTypes.GET_CATEGORY_LIST, getCategoryList),
    takeLatest(CompanyTypes.GET_PACKAGE_LIST, getPackageList),
    takeLatest(JobTypes.GET_JOB, getJobDetail),
    takeLatest(JobTypes.GET_JOB_LIST, getJobList),
  ]);
}

export default rootSaga;
