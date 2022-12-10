/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { CompanyTypes, JobTypes } from "redux-store";

/* ------------- Sagas ------------- */
import { getCompanyDetail, getCompanyList } from "./company.saga";
import { getJobDetail, getJobList } from "./job.saga";

/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    takeLatest(CompanyTypes.GET_COMPANY, getCompanyDetail),
    takeLatest(CompanyTypes.GET_COMPANY_LIST, getCompanyList),
    takeLatest(JobTypes.GET_JOB, getJobDetail),
    takeLatest(JobTypes.GET_JOB_LIST, getJobList),
  ]);
}

export default rootSaga;
