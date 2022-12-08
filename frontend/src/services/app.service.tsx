import { createApi } from "api";
import { ApiConstant, AppConstant } from "const";
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

export const getCategories = () => createApi().get(ApiConstant.GET_CATEGORIES);

export const createCompany = (data: companyType) =>
  createApi().post(ApiConstant.POST_CREATE_COMPANY, data);

export const getCompanyDetail = (id: string) =>
  createApi().get(stringFormat(ApiConstant.GET_COMPANY_DETAIL, { id }));

export const getCompanyList = (data: CompanyListProps) =>
  createApi().get(ApiConstant.GET_COMPANY_LIST, data);

export const createJob = (data: JobProps) =>
  createApi().post(ApiConstant.POST_CREATE_JOB, data);
