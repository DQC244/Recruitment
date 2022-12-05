import apisauce, { ApiResponse, ApisauceConfig } from "apisauce";
import { ApiConstant, AppConstant, EnvConstant } from "const";
import Cookie from "js-cookie";

const DEFAULT_CONFIG: ApisauceConfig = {
  baseURL: "",
  headers: { ...ApiConstant.HEADER_DEFAULT },
  timeout: ApiConstant.TIMEOUT,
};

const handleErrorRequest = (response: ApiResponse<IApiResponse>) => {
  if (
    (response.status && response.status === ApiConstant.STT_UNAUTHORIZED) ||
    response.status === ApiConstant.STT_FORBIDDEN
  ) {
    Cookie.remove(AppConstant.KEY_TOKEN);
  }
  if (
    response.status &&
    false ===
      [ApiConstant.STT_OK, ApiConstant.STT_CREATED].includes(response.status)
  ) {
    console.log(response);
  }
};

const Api = apisauce.create(DEFAULT_CONFIG);
Api.addResponseTransform(handleErrorRequest);

const createInstance = (baseURL?: string, token?: string) => {
  const newToken = token || Cookie.get(AppConstant.KEY_TOKEN);

  baseURL && Api.setBaseURL(baseURL);
  newToken && Api.setHeader("access_token", newToken);
  Api.addResponseTransform(handleErrorRequest);

  return Api;
};

export const createApi = (token?: string) =>
  createInstance(EnvConstant.BASE_SERVICE_URL, token);

export default Api;

export interface IApiResponse {
  status: number;
  data: object;
}
