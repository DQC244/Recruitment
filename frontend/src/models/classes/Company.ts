import { AppConstant } from "const";
import { STATUS } from "const/app.const";

class Company {
  _id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  since: Date;
  categoryId: string;
  categoryName?: string;
  teamSize?: typeof AppConstant.COMPANY_SIZE[keyof typeof AppConstant.COMPANY_SIZE];
  description: string;
  logo: string;
  status: STATUS;
  totalJob?: number;
  website?: {
    web?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
  updatedAt: string;
  createdAt: string;

  constructor(data: Company) {
    this._id = data._id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.location = data.location;
    this.since = data.since;
    this.categoryId = data.categoryId;
    this.categoryName = data.categoryName;
    this.teamSize = data.teamSize;
    this.description = data.description;
    this.logo = data.logo;
    this.status = data.status;
    this.website = data.website;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }
}

export default Company;
