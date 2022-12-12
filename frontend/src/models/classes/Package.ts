class Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  expireDay: number;

  constructor(data: Package) {
    this._id = data._id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.expireDay = data.expireDay;
  }
}

export default Package;
