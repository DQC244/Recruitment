import { ApiResponse } from "apisauce";
import { put, call } from "redux-saga/effects";
import { CompanyActions, JobActions } from "redux-store";
import { AppService } from "services";
import { ApiConstant } from "const";
import { KeyAbleProps } from "models/types";

export function* getJobDetail(action: { type: string; data: string }) {
  try {
    const id = action.data;

    const response: ApiResponse<KeyAbleProps> = yield call(
      AppService.getJobDetail,
      id
    );

    if ((response.status = ApiConstant.STT_OK)) {
      yield put(JobActions.jobSuccess({ job: response.data?.job }));
      yield put(
        CompanyActions.companySuccess({ company: response.data?.company })
      );
    } else {
      yield put(JobActions.jobFailure(response.data));
    }
  } catch (error) {
    yield put(JobActions.jobFailure(error));
  }
}

export function* getJobList(action: {
  type: string;
  data: AppService.JobListProps;
}) {
  try {
    const response: ApiResponse<KeyAbleProps> = yield call(
      AppService.getJobList,
      action.data
    );

    if ((response.status = ApiConstant.STT_OK)) {
      yield put(JobActions.jobSuccess({ jobList: response.data }));
    } else {
      yield put(JobActions.jobFailure(response.data));
    }
  } catch (error) {
    yield put(JobActions.jobFailure(error));
  }
}

export function* getMyJobList() {
  try {
    const response: ApiResponse<KeyAbleProps> = yield call(
      AppService.getMyJobList
    );

    if ((response.status = ApiConstant.STT_OK)) {
      yield put(JobActions.jobSuccess({ jobList: response.data }));
    } else {
      yield put(JobActions.jobFailure(response.data));
    }
  } catch (error) {
    yield put(JobActions.jobFailure(error));
  }
}
