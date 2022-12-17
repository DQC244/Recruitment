import { createApi } from "api";
import { ApiConstant } from "const";
import stringFormat from "string-format";

type OrderListParams = {
  page: number;
  size: number;
};

export const getOrderList = (params: OrderListParams) =>
  createApi().post(ApiConstant.POST_GET_ORDER, params);

export const getUserList = (params: OrderListParams) =>
  createApi().post(ApiConstant.POST_GET_USER, params);

export const deleteUser = (id: string) =>
  createApi().delete(stringFormat(ApiConstant.DELETE_USER, { id }));
