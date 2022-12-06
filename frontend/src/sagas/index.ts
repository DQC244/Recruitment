/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { CompanyTypes } from "redux-store";

/* ------------- Sagas ------------- */
import { getCompanyDetail, getCompanyList } from "./company.saga";

/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    // Account setting
    takeLatest(CompanyTypes.GET_COMPANY, getCompanyDetail),
    takeLatest(CompanyTypes.GET_COMPANY_LIST, getCompanyList),
  ]);
}

export default rootSaga;
