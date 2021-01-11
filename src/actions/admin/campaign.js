import { APIROUTE } from '../../utils/constants'
import { API } from "../types";
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
/////////////////////////////////////////////// ADMIN_GET_CAMPAIGN_ACTION
export function getCampaigns(keyword, page) {
  return apiAction({
    url: keyword ? APIROUTE + `dashboard/promotion/${keyword}/${page}/` : APIROUTE + `dashboard/promotion/${page}/`,
    method: 'GET',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetCampaigns,
    onFailure: onFailed,
    label: 'ADMIN_GET_CAMPAIGNS',
  });
}
function onSuccessGetCampaigns(data) {
  return {
    type: 'SET_ADMIN_CAMPAIGNS',
    data: data
  }
}

/////////////////////////////////////////////// UPDATE_CAMPAIGN_ACTION
export function updateCampaign(params) {
  return apiAction({
    url: APIROUTE + "dashboard/campaign/update/",
    method: 'POST',
    data: params,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessUpdateCampaign,
    onFailure: onFailed,
    label: 'ADMIN_UPDATE_CAMPAIGN',
    requireErrorMessage: true
  });
}
function onSuccessUpdateCampaign(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].updateCampaign)
  return {
    type: '',
    data: ''
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