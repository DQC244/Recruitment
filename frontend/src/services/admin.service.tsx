import { createApi } from "api";
import { ApiConstant } from "const";

type OrderListParams = {
  page: number;
  size: number;
};

export const getOrderList = (params: OrderListParams) =>
  createApi().post(ApiConstant.POST_GET_ORDER, params);
