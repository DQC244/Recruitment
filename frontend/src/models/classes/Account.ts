import { AppConstant } from "const";

class Account {
  _id: string;
  name: string;
  phone?: string;
  email: string;
  permission: AppConstant.USER_TYPE;
  company?: string;
  image?: string;
  package?: string;
  status?: number;
  isVerified?: boolean;

  constructor(data: Account) {
    this._id = data._id;
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.permission = data.permission;
    this.company = data.company;
    this.image = data.image;
    this.package = data.package;
    this.status = data.status;
    this.isVerified = data.isVerified;
  }
}

export default Account;
