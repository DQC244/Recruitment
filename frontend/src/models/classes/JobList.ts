import { JobClass } from "models";
import List from "./List";
import Pagination from "./Pagination";

class JobList extends List {
  declare listItems: Array<JobClass>;

  constructor(pagination: Pagination, listItems: Array<JobClass>) {
    super(pagination, listItems);
  }
}

export default JobList;
