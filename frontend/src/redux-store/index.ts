import { EnvConstant } from "const";
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "sagas";

import {
  Creators as CompanyActions,
  Types as CompanyTypes,
  reducer as CompanyReducer,
  Selector as CompanySelector,
  ICompanyRedux,
} from "./company.redux";

import {
  Creators as JobActions,
  Types as JobTypes,
  reducer as JobReducer,
  Selector as JobSelector,
  IJobRedux,
} from "./job.redux";

import {
  Creators as AdminActions,
  Types as AdminTypes,
  reducer as AdminReducer,
  Selector as AdminSelector,
  IAdminRedux,
} from "./admin.redux";

/* ------------- Assemble The Reducers ------------- */
const appReducer = combineReducers({
  companyRedux: CompanyReducer,
  jobRedux: JobReducer,
  adminRedux: AdminReducer,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: any) => {
  return appReducer(state, action);
};

/* ------------- Redux Configuration ------------- */

/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

// Create store
const store = EnvConstant.IS_DEV
  ? createStore(
      rootReducer,
      composeWithDevTools(applyMiddleware(sagaMiddleware))
    )
  : createStore(rootReducer, applyMiddleware(sagaMiddleware));

// kick off root saga
sagaMiddleware.run(rootSaga);

interface IAppReduxState {
  companyRedux: ICompanyRedux;
  jobRedux: IJobRedux;
  adminRedux: IAdminRedux;
}

/* ------------- Redux Actions ------------- */
export {
  CompanyActions,
  CompanyTypes,
  CompanySelector,
  JobActions,
  JobTypes,
  JobSelector,
  AdminActions,
  AdminTypes,
  AdminSelector,
};
export type { IAppReduxState, ICompanyRedux, IAdminRedux };

export default store;
