import { ApiResponse } from "apisauce";
import { put, call } from "redux-saga/effects";
import { CompanyActions } from "redux-store";
import { AppService } from "services";
import { ApiConstant } from "const";
import { KeyAbleProps } from "models/types";

export function* getCompanyDetail(action: { type: string; data: string }) {
  try {
    const id = action.data;

    const response: ApiResponse<KeyAbleProps> = yield call(
      AppService.getCompanyDetail,
      id
    );

    if ((response.status = ApiConstant.STT_OK)) {
      yield put(CompanyActions.companySuccess({ company: response.data }));
    } else {
      yield put(CompanyActions.companyFailure(response.data));
    }
  } catch (error) {
    yield put(CompanyActions.companyFailure(error));
  }
}

export function* getCompanyList(action: {
  type: string;
  data: AppService.CompanyListProps;
}) {
  try {
    const data = action.data;
    const response: ApiResponse<KeyAbleProps> = yield call(
      AppService.getCompanyList,
      data
    );

    const responseData = response.data;

    if (response.status === ApiConstant.STT_OK) {
      yield put(
        CompanyActions.companySuccess({
          companyList: {
            pagination: responseData?.pagination,
            listItems: responseData?.listItems,
          },
        })
      );
    } else {
      yield put(CompanyActions.companyFailure(responseData));
    }
  } catch (error) {
    yield put(CompanyActions.companyFailure(error));
  }
}
