import { AccountClass } from "models";
import List from "./List";
import Pagination from "./Pagination";

class AccountList extends List {
  declare listItems: Array<AccountClass>;

  constructor(pagination: Pagination, listItems: Array<AccountClass>) {
    super(pagination, listItems);
  }
}

export default AccountList;
