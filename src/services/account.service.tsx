import Api from "api";
import { ApiConstant } from "const";

export const getAccount = () => Api.get(ApiConstant.GET_PROFILE);
