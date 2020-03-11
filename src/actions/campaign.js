import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import { openNotification } from '../utils/notification'

const qs = require('querystring')

function onFailed(error) {
  return {
    type: 'API_FAILED',
    error: error    
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_ACTION
export function campaignParticipate(params) {
  return apiAction({
      url: APIROUTE + "campaign/participate/",
      method: 'POST',
      data: qs.stringify(params),
      accessToken: localStorage.getItem('token'),
      onSuccess: onSuccessCampaignParticipate,
      onFailure: onFailed,
      label: 'CAMPAIGN_PARTICIPATE_SUCCESS',
  });
}
function onSuccessCampaignParticipate(data) {
  openNotification('success', 'Successfully Participated')
  return {
      type: 'API_SUCCESS',
      data: ''
  }
}
/////////////////////////////////////////////// GET_CAMPAIGN_DATA_ACTION
export function getCampaignData(id, params) {
  return apiAction({
      url: APIROUTE + `campaign/${id}/`,
      method: 'POST',
      data: qs.stringify(params),
      onSuccess: onSuccessGetCampaignData,
      onFailure: onFailed,
      label: 'GET_CAMPAIGN_DATA_SUCCESS',
  });
}
function onSuccessGetCampaignData(data) {
  return {
      type: 'GET_CAMPAIGN_DATA_SUCCESS',
      data: data.result_data
  }
}
/////////////////////////////////////////////// UPDATE_CAMPAIGN_DETAIL_FAVORITE_SUCCESS
export function updateFavorite(params, name) {
  return apiAction({
      url: APIROUTE + "favorites/update/",
      method: 'POST',
      data: qs.stringify(params),
      accessToken: localStorage.getItem('token'),
      onSuccess: (data) => onSuccessUpdateFavorite(data, name),
      onFailure: onFailed,
      label: 'UPDATE_CAMPAIGN_DETAIL_FAVORITE_SUCCESS',
  });
}
function onSuccessUpdateFavorite(data, name) {
  return {
      type: 'UPDATE_CAMPAIGN_DETAIL_FAVORITE_SUCCESS',
      arrname: name,
      id: data.promotion_id,
      result: data.msg
  }
}


function apiAction({
    url = "",
    method = "GET",
    data = null,
    accessToken = null,
    onSuccess = () => {},
    onFailure = () => {},
    label = "",
    headersOverride = null
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
        headersOverride
      }
    };
  }