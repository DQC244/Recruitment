import { createApi } from "api";
import { ApiConstant, AppConstant } from "const";
import stringFormat from "string-format";

export type registerUserProps = {
  name: string;
  phone?: string;
  email: string;
  permission: AppConstant.USER_TYPE;
  company?: string;
  image?: string;
  password: string;
};

export type ChangePasswordProps = {
  password: string;
  newPassword: string;
};

export type UpdateUSerProps = {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
};

export const getSelfAccount = () => createApi().post(ApiConstant.GET_PROFILE);

export const login = (data: { email: string; password: string }) =>
  createApi().post(ApiConstant.POST_LOGIN, data);

export const registerUser = (data: registerUserProps) =>
  createApi().post(ApiConstant.POST_REGISTER, data);

export const changePassword = (data: ChangePasswordProps) =>
  createApi().put(ApiConstant.PUT_CHANGE_PASSWORD, data);

export const handleUpdateUser = (data: UpdateUSerProps) =>
  createApi().put(
    stringFormat(ApiConstant.PUT_UPDATE_USER, { id: data.id }),
    data
  );
