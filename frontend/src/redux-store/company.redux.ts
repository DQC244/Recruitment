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
import { CompanyClass, CompanyListClass, PackageClass } from "models";
import { AppService } from "services";
import { AppConstant } from "const";
import { KeyAbleProps } from "models/types";

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getCompany: ["data"],
  getCompanyList: ["data"],
  setQueryParams: ["data"],
  getCategoryList: ["data"],
  getPackageList: ["data"],

  companySuccess: ["data"],
  companyFailure: ["error", "data"],
  companySet: ["data"],
  companyReset: [],
});

/* ------------- Initial State ------------- */
export interface ICompanyRedux extends IReduxStateCommon {
  company: CompanyClass;
  companyList: CompanyListClass;
  queryParams: AppService.CompanyListProps;
  categoryList: any[];
  packageList: PackageClass[];
}
export const INITIAL_STATE: ICompanyRedux = {
  ...REDUX_STATE,
  company: {} as CompanyClass,
  companyList: {} as CompanyListClass,
  categoryList: [],
  packageList: [] as PackageClass[],
  queryParams: {
    ...AppConstant.DEFAULT_PAGINATION,
  },
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get company info
  getCompanyInfo: (state: IAppReduxState) => state.companyRedux.company,

  getCategoryList: (state: IAppReduxState) => state.companyRedux.categoryList,
  getPackageList: (state: IAppReduxState) => state.companyRedux.packageList,

  // Get company List
  getCompanyList: (state: IAppReduxState) => state.companyRedux.companyList,

  // get pagination
  getPagination: (state: IAppReduxState) =>
    state.companyRedux.companyList?.pagination,

  // get query params
  getQueryParams: (state: IAppReduxState) => state.companyRedux.queryParams,
};

/* ------------- Reducers ------------- */
const request = (state = INITIAL_STATE) => requestReducerFunc(state);

const success = (state = INITIAL_STATE, action: object) =>
  successReducerFunc(state, action);

const failure = (state = INITIAL_STATE, action: object) =>
  failureReducerFunc(state, action);

const reset = () => resetReducerFunc(INITIAL_STATE);

const setQueryParams = (state = INITIAL_STATE, action: KeyAbleProps) => {
  const data = action.data || {};
  return { ...state, queryParams: { ...state.queryParams, ...data } };
};

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_COMPANY]: request,
  [Types.GET_COMPANY_LIST]: request,
  [Types.SET_QUERY_PARAMS]: setQueryParams,
  [Types.GET_CATEGORY_LIST]: request,
  [Types.GET_PACKAGE_LIST]: request,

  [Types.COMPANY_SUCCESS]: success,
  [Types.COMPANY_FAILURE]: failure,
  [Types.COMPANY_SET]: success,
  [Types.COMPANY_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
