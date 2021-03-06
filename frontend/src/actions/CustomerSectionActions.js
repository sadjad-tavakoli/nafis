import {
  GET_USERS_CUSTOMERS,
  GET_ALL_BILLS,
  GET_A_CUSTOMER,
  GET_ALL_CHEQUES,
  GET_REMAINED_BILLS,
  GET_REMAINED_CHEQUES
} from "./types";
import { server, putServer } from "../apis/server";

export const getCustomerUsers = (page = 1) => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    "/customers/",
    {
      params: { page }
    }
  );
  dispatch({ type: GET_USERS_CUSTOMERS, payload: response.data });
  return response;
};

export const getAllBills = pk => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    `/customers/${pk}/bills/`
  );
  dispatch({ type: GET_ALL_BILLS, payload: response.data });
  return response;
};

export const getAllCheques = pk => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    `/customers/${pk}/cheques/`
  );
  dispatch({ type: GET_ALL_CHEQUES, payload: response.data });
  return response;
};

export const getACustomer = pk => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    `/customers/${pk}/`
  );
  dispatch({ type: GET_A_CUSTOMER, payload: response.data });
};

export const updateCustomer = (pk, data) => async dispatch => {
  return await putServer(
    localStorage.getItem("token"),
    `/customers/${pk}/`,
    data
  );
};

export const getRemainedBills = pk => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    `/customers/${pk}/remained-bills/`
  );
  dispatch({ type: GET_REMAINED_BILLS, payload: response.data });
  return response;
};

export const getRemainedCheques = pk => async dispatch => {
  const response = await server(localStorage.getItem("token")).get(
    `/customers/${pk}/remained-cheques/`
  );
  dispatch({ type: GET_REMAINED_CHEQUES, payload: response.data });
  return response;
};
