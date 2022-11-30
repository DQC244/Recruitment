/**
 * Saga index: connects action type and saga
 */

import { takeLatest, all } from "redux-saga/effects";

/* ------------- Types ------------- */
import { AccountTypes } from "redux-store";

/* ------------- Sagas ------------- */
import { getAccountRequest } from "./account.saga";

/* ------------- Connect Types To Sagas ------------- */
function* rootSaga() {
  yield all([
    // Account setting
    takeLatest(AccountTypes.GET_ACCOUNT, getAccountRequest),
  ]);
}

export default rootSaga;
