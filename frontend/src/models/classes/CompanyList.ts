import { CompanyClass } from "models";
import List from "./List";
import Pagination from "./Pagination";

class CompanyList extends List {
  declare listItems: Array<CompanyClass>;

  constructor(pagination: Pagination, listItems: Array<CompanyClass>) {
    super(pagination, listItems);
  }
}

export default CompanyList;
