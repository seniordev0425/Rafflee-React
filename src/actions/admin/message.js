import { APIROUTE } from '../../utils/constants'
import { API } from "../types"
import { openNotification } from '../../utils/notification'
import successMessages from '../../utils/messages/success'
import errorMessages from '../../utils/messages/error'

const qs = require('querystring')

function onFailed(error) {
  openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')][error])
  return {
    type: 'API_FAILED',
    error: error
  }
}
/////////////////////////////////////////////// ADMIN_GET_COMPANY_MESSAGES_ACTION
export function getCompanyMessages(page) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/company/form/${page}/`,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetCompanyMessages,
    onFailure: onFailed,
    label: 'ADMIN_GET_COMPANY_MESSAGES',
  });
}
function onSuccessGetCompanyMessages(data) {
  return {
    type: 'SET_ADMIN_COMPANY_MESSAGES',
    data: data
  }
}
/////////////////////////////////////////////// ADMIN_GET_HOMEPAGE_MESSAGES_ACTION
export function getHomepageMessages(page) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/homepage/form/${page}/`,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetHomepageMessages,  
    onFailure: onFailed,
    label: 'ADMIN_GET_HOMEPAGE_MESSAGES',
  });
}
function onSuccessGetHomepageMessages(data) {
  return {
    type: 'SET_ADMIN_HOMEPAGE_MESSAGES',
    data: data
  }
}
/////////////////////////////////////////////// ADMIN_GET_REPORT_MESSAGES_ACTION
export function getReportMessages(page) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/report/form/${page}/`,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetReportMessages,  
    onFailure: onFailed,
    label: 'ADMIN_GET_REPORT_MESSAGES',
  });
}
function onSuccessGetReportMessages(data) {
  return {
    type: 'SET_ADMIN_REPORT_MESSAGES',
    data: data
  }
}


function apiAction({
  url = "",
  method = "GET",
  data = null,
  accessToken = null,
  onSuccess = () => { },
  onFailure = () => { },
  label = "",
  headersOverride = null,
  requireErrorMessage = false
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      accessToken,
      onSuccess,
      onFailure,
      label,
      headersOverride,
      requireErrorMessage
    }
  };
}