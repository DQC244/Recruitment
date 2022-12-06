import Pagination from "./Pagination";

class List {
  pagination: Pagination;
  items: Array<unknown>;

  constructor(pagination?: Pagination, items?: Array<unknown>) {
    this.items = Array.isArray(items) ? items : [];
    this.pagination = pagination || new Pagination();
  }
}

export default List;
