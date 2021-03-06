import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

import authReducer from "./authReducer";
import saleReducer from "./saleReducer";
import depositoryReducer from "./depositoryReducer";
import billReducer from "./billReducer";
import reportsReducer from "./reportsReducer";
import usersCustomers from "./usersReducer";
import suppliersReducer from "./suppliersReducer";

export default combineReducers({
  auth: authReducer,
  sale: saleReducer,
  depository: depositoryReducer,
  bills: billReducer,
  toastr: toastrReducer,
  reports: reportsReducer,
  customers: usersCustomers,
  suppliers: suppliersReducer
});
