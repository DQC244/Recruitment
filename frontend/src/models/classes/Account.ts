import { AppConstant } from "const";

class Account {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  permission: AppConstant.USER_TYPE;
  company?: string;
  image?: string;
  job?: string[];
  package?: string;

  constructor(data: Account) {
    this._id = data._id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.permission = data.permission;
    this.company = data.company;
    this.image = data.image;
    this.job = data.job;
    this.package = data.package;
  }
}

export default Account;
