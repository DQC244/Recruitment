class Order {
  _id: string;
  userId: string;
  packageId: string;
  amount: Number;
  paymentId: string;
  updatedAt: string;
  createdAt: string;

  constructor(data: Order) {
    this._id = data._id;
    this.userId = data.userId;
    this.packageId = data.packageId;
    this.amount = data.amount;
    this.paymentId = data.paymentId;
    this.updatedAt = data.updatedAt;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }
}

export default Order;
