import { EnvConstant } from "const";
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootSaga from "sagas";

import {
  Creators as AccountActions,
  Types as AccountTypes,
  reducer as AccountReducer,
  Selector as AccountSelector,
  IAccountRedux,
} from "./account.redux";

/* ------------- Assemble The Reducers ------------- */
const appReducer = combineReducers({
  accountRedux: AccountReducer,
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
  ? createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  : createStore(rootReducer, applyMiddleware(sagaMiddleware));

// kick off root saga
sagaMiddleware.run(rootSaga);

interface IAppReduxState {
  accountRedux: IAccountRedux;
}

/* ------------- Redux Actions ------------- */
export { AccountActions, AccountTypes, AccountSelector };
export type { IAppReduxState, IAccountRedux };

export default store;
