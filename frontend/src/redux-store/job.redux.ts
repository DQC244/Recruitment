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
import { JobClass, JobListClass } from "models";
import { AppService } from "services";
import { AppConstant } from "const";
import { KeyAbleProps } from "models/types";

/* ------------- Types and Action Creators ------------- */
export const { Types, Creators } = createActions({
  getJob: ["data"],
  getJobList: ["data"],
  setQueryParams: ["data"],
  resetQueryParams: [],

  jobSuccess: ["data"],
  jobFailure: ["error", "data"],
  jobSet: ["data"],
  jobReset: [],
});

/* ------------- Initial State ------------- */
export interface IJobRedux extends IReduxStateCommon {
  job: JobClass;
  queryParams: AppService.JobListProps;
  jobList: JobListClass;
}
export const INITIAL_STATE: IJobRedux = {
  ...REDUX_STATE,
  job: {} as JobClass,
  jobList: {} as JobListClass,

  queryParams: {
    ...AppConstant.DEFAULT_PAGINATION,
  },
};

/* ------------- Selector ------------- */
export const Selector = {
  // Get job info
  getJobInfo: (state: IAppReduxState) => state.jobRedux.job,

  // Get job List
  getJobList: (state: IAppReduxState) => state.jobRedux.jobList,

  // get pagination
  getPagination: (state: IAppReduxState) => state.jobRedux.jobList?.pagination,

  // get query params
  getQueryParams: (state: IAppReduxState) => state.jobRedux.queryParams,
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

const resetQueryParams = (state = INITIAL_STATE, action: KeyAbleProps) => {
  return {
    ...state,
    queryParams: {
      ...AppConstant.DEFAULT_PAGINATION,
    },
  };
};

/* ------------- Mapping ------------- */
const HANDLERS = {
  [Types.GET_JOB]: request,
  [Types.GET_JOB_LIST]: request,
  [Types.SET_QUERY_PARAMS]: setQueryParams,
  [Types.RESET_QUERY_PARAMS]: resetQueryParams,

  [Types.JOB_SUCCESS]: success,
  [Types.JOB_FAILURE]: failure,
  [Types.JOB_SET]: success,
  [Types.JOB_RESET]: reset,
};

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, HANDLERS);

export default Creators;
