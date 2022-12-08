import { AppConstant } from "const";

class Job {
  _id?: string;
  title: string;
  location: string;
  description: string;
  type: number;
  closeDate: Date;
  companyId?: string;
  qualification: number;
  experience: number;
  tag: string;
  image: string;
  status?: AppConstant.STATUS;
  salary: {
    min: number;
    max: number;
  };

  constructor(data: Job) {
    this._id = data._id;
    this.title = data.title;
    this.location = data.location;
    this.description = data.description;
    this.type = data.type;
    this.companyId = data.companyId;
    this.closeDate = data.closeDate;
    this.status = data.status;
    this.qualification = data.qualification;
    this.experience = data.experience;
    this.tag = data.tag;
    this.image = data.image;
    this.salary = data.salary;
  }
}

export default Job;
