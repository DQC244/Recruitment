import { ApplicationClasses } from "models";
import List from "./List";
import Pagination from "./Pagination";

class ApplicationList extends List {
  declare listItems: Array<ApplicationClasses>;

  constructor(pagination: Pagination, listItems: Array<ApplicationClasses>) {
    super(pagination, listItems);
  }
}

export default ApplicationList;
