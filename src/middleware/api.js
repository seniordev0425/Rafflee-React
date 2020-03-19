// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { API } from "../actions/types";
import { accessDenied, apiError, apiStart, apiEnd, apiSuccess } from "../actions/api";

const apiMiddleware = ({ dispatch }) => next => action => {
  next(action);

  if (action.type !== API) return;

  const {
    url,
    method,
    data,
    accessToken,
    onSuccess,
    onFailure,
    label,
    headers,
    requireErrorMessage
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"] = "application/x-www-form-urlencoded";
  if (accessToken){
    if (label === 'SIGN_UP_SUCCESS')axios.defaults.headers.common["Authorization"] = accessToken;
    else axios.defaults.headers.common["Authorization"] = `JWT ${accessToken}`;
  }
  else axios.defaults.headers.common["Authorization"] = null;
    
  if (label) {
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      console.log(data)
      dispatch(onSuccess(data));
      dispatch(apiSuccess(label));
    })
    .catch(error => {
      console.log(error.response)
      if (requireErrorMessage) {
        if (error.response && error.response.data && error.response.data.msg) dispatch(onFailure(error.response.data.msg));
        else dispatch(onFailure(''));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;
