import { ApiResponse } from "apisauce";
import { ApiConstant } from "const";
import { KeyAbleProps } from "models/types";
import { call, put } from "redux-saga/effects";
import { AdminActions } from "redux-store";
import { AdminService } from "services";

export function* getOrderList(action: { type: string; data: any }) {
  const data = action.data;

  try {
    const response: ApiResponse<KeyAbleProps> = yield call(
      AdminService.getOrderList,
      data
    );

    if (response.status === ApiConstant.STT_OK) {
      yield put(
        AdminActions.adminSuccess({
          orderList: {
            pagination: response.data?.pagination,
            listItems: response.data?.listItems,
          },
        })
      );
    } else {
      yield put(AdminActions.adminFailure(response.data));
    }
  } catch (error) {
    yield put(AdminActions.adminFailure(error));
  }
}

export function* getUserList(action: { type: string; data: any }) {
  const data = action.data;

  try {
    const response: ApiResponse<KeyAbleProps> = yield call(
      AdminService.getUserList,
      data
    );

    if (response.status === ApiConstant.STT_OK) {
      yield put(
        AdminActions.adminSuccess({
          userList: {
            pagination: response.data?.pagination,
            listItems: response.data?.listItems,
          },
        })
      );
    } else {
      yield put(AdminActions.adminFailure(response.data));
    }
  } catch (error) {
    yield put(AdminActions.adminFailure(error));
  }
}
