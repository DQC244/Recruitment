import { createApi } from "api";
import { ApiConstant, AppConstant } from "const";
import { CompanyClass } from "models";
import stringFormat from "string-format";

export type companyType = {
  name: string;
  email: string;
  phone: string;
  location: string;
  since: Date;
  categoryId: string;
  teamSize?: typeof AppConstant.COMPANY_SIZE[keyof typeof AppConstant.COMPANY_SIZE];
  description: string;
  logo: string;
  website?: {
    web?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
};

export type CompanyListProps = {
  page: number;
  size: number;
  category?: string;
  location?: string;
  search?: string;
};

type JobProps = {
  title: string;
  location: string;
  description: string;
  type: number;
  closeDate: Date;
  qualification: number;
  experience: number;
  tag: string;
  image: string;
  salary: {
    min: number;
    max: number;
  };
};

export type JobListProps = {
  page: number;
  size: number;
  location?: string;
  search?: string;
  salary?: number;
  type?: number[];
  experience?: number[];
  companyId?: string;
};

export const getCategories = () => createApi().get(ApiConstant.GET_CATEGORIES);

// company
export const createCompany = (data: companyType) =>
  createApi().post(ApiConstant.POST_CREATE_COMPANY, data);

export const getCompanyDetail = (id: string) =>
  createApi().get(stringFormat(ApiConstant.GET_COMPANY_DETAIL, { id }));

export const updateCompanyDetail = (id: string, data: CompanyClass) =>
  createApi().put(stringFormat(ApiConstant.PUT_UPDATE_COMPANY, { id }), data);

export const getCompanyList = (data: CompanyListProps) =>
  createApi().get(ApiConstant.GET_COMPANY_LIST, data);

// job
export const createJob = (data: JobProps) =>
  createApi().post(ApiConstant.POST_CREATE_JOB, data);

export const getJobDetail = (id: string) =>
  createApi().get(stringFormat(ApiConstant.GET_JOB_DETAIL, { id }));

export const getJobList = (data: JobListProps) =>
  createApi().get(ApiConstant.GET_JOB_LIST, data);

export const getMyJobList = () =>
  createApi().post(ApiConstant.POST_MY_JOB_LIST);

export const deleteJob = (id: string) =>
  createApi().delete(stringFormat(ApiConstant.DELETE_MY_JOB, { id }));

// package
export const getPackageList = () =>
  createApi().get(ApiConstant.GET_PACKAGE_LIST);

export const postCheckout = (tokenId: any, amount: number, packageId: string) =>
  createApi().post(ApiConstant.POST_CHECKOUT, { tokenId, amount, packageId });
