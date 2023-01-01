class Application {
  _id: string;
  name: string;
  email: string;
  cvUrl?: string;
  message?: string;
  createdAt: string;

  constructor(data: Application) {
    this._id = data._id;
    this.name = data.name;
    this.email = data.email;
    this.cvUrl = data.cvUrl;
    this.message = data.message;
    this.createdAt = data.createdAt;
  }
}

export default Application;
