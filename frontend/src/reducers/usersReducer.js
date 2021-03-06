import {
  GET_USERS_CUSTOMERS,
  GET_ALL_BILLS,
  GET_A_CUSTOMER,
  GET_ALL_CHEQUES,
  GET_REMAINED_BILLS,
  GET_REMAINED_CHEQUES
} from "../actions/types";

const INITIAL_VALUES = {};

export default (state = INITIAL_VALUES, action) => {
  switch (action.type) {
    case GET_USERS_CUSTOMERS:
      return { ...state, usersCustomers: action.payload };
    case GET_ALL_BILLS:
      return { ...state, allBills: action.payload };
    case GET_ALL_CHEQUES:
      return { ...state, allCheques: action.payload };
    case GET_A_CUSTOMER:
      return { ...state, theCustomer: action.payload };
    case GET_REMAINED_BILLS:
      return { ...state, remainedBills: action.payload };
    case GET_REMAINED_CHEQUES:
      return { ...state, remainedCheques: action.payload };
    default:
      return state;
  }
};
