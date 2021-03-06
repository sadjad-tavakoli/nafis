import { GET_INTERVAL_REPORTS, GET_CHARTS_REPORT } from "../actions/types";

const INITIAL_VALUES = {};

export default (state = INITIAL_VALUES, action) => {
  // console.log(GET_ACTIVE_BILL,action.payload)
  switch (action.type) {
    case GET_INTERVAL_REPORTS:
      return { ...state, intervalReports: action.payload};
    case GET_CHARTS_REPORT:
      return { ...state, chartsReport: action.payload};
    default:
      return state;
  }
};