import { IAppReduxState } from "./index";
import { createActions, createReducer } from "reduxsauce";
import {
  IReduxStateCommon,
  REDUX_STATE,
  requestReducerFunc,
  failureReducerFunc,
  successReducerFunc,
  resetReducerFunc,
} from "./redux-structure";
import { AccountListClass, OrderListClass } from "models";
import { AppConstant } from "const";
import { KeyAbleProps } from "models/types";

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getOrderList: ["data"],
  setQueryParams: ["data"],
  getUserList: ["data"],

  adminSuccess: ["data"],
  adminFailure: ["error", "data"],
  adminSet: ["data"],
  adminReset: [],
});

/* ------------- Initial State ------------- */
export interface IAdminRedux extends IReduxStateCommon {
  orderList: OrderListClass;
  userList: AccountListClass;
  queryParams: {
    page: number;
    size: number;
  };
}
export const INITIAL_STATE: IAdminRedux = {
  ...REDUX_STATE,
  orderList: {} as OrderListClass,
  userList: {} as AccountListClass,
  queryParams: {
    ...AppConstant.DEFAULT_PAGINATION,
  },
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get company info
  getOrderList: (state: IAppReduxState) => state.adminRedux.orderList,

  // get query params
  getQueryParams: (state: IAppReduxState) => state.adminRedux.queryParams,

  // get user list
  getUserList: (state: IAppReduxState) => state.adminRedux.userList,
  // get pagination
  getPagination: (state: IAppReduxState) =>
    state.adminRedux.userList?.pagination,
};

/* ------------- Reducers ------------- */
const request = (state = INITIAL_STATE) => requestReducerFunc(state);

const success = (state = INITIAL_STATE, action: object) =>
  successReducerFunc(state, action);

const failure = (state = INITIAL_STATE, action: object) =>
  failureReducerFunc(state, action);

const reset = () => resetReducerFunc(INITIAL_STATE);

const setQueryParams = (state = INITIAL_STATE, action: any) => {
  const data = action?.data || {};
  return { ...state, queryParams: { ...state.queryParams, ...data } };
};

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_ORDER_LIST]: request,
  [Types.SET_QUERY_PARAMS]: setQueryParams,
  [Types.GET_USER_LIST]: request,

  [Types.ADMIN_SUCCESS]: success,
  [Types.ADMIN_FAILURE]: failure,
  [Types.ADMIN_SET]: success,
  [Types.ADMIN_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
