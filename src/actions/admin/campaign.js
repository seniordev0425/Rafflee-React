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
export function getCampaigns(params) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/promotion/`,
    data: qs.stringify(params),
    method: 'GET',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetCampaigns,
    onFailure: onFailed,
    label: 'ADMIN_GET_CAMPAIGNS',
  });
}
function onSuccessGetCampaigns(data) {
  return {
    type: 'SET_ADMIN_TEMP_CAMPAIGNS_IN_DASHBOARD',
    data: data.promotions
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