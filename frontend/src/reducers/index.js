import { combineReducers } from "redux";
import { reducer as toastrReducer } from "react-redux-toastr";

import authReducer from "./authReducer";
import saleReducer from "./saleReducer";
import depositoryReducer from "./depositoryReducer";
import billReducer from "./billReducer";

export default combineReducers({
  auth: authReducer,
  sale: saleReducer,
  depository: depositoryReducer,
  bills: billReducer,
  toastr: toastrReducer
});
