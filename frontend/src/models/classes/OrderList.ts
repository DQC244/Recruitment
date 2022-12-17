import { OrderClass } from "models";
import List from "./List";
import Pagination from "./Pagination";

class OrderList extends List {
  declare listItems: Array<OrderClass>;

  constructor(pagination: Pagination, listItems: Array<OrderClass>) {
    super(pagination, listItems);
  }
}

export default OrderList;
