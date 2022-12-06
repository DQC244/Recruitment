import { AppConstant } from "const";

class Pagination {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;

  constructor(
    data: Pagination = {
      ...AppConstant.DEFAULT_PAGINATION,
      totalItems: 0,
      totalPages: 1,
    }
  ) {
    this.page = data.page;
    this.size = data.size;
    this.totalItems = data.totalItems;
    this.totalPages = data.totalPages;
  }
}

export default Pagination;
