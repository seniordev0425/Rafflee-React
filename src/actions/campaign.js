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
/////////////////////////////////////////////// GET_CAMPAIGN_PARTICIPANTS_ACTION
export function getCampaignParticipants(id) {
  return apiAction({
      url: APIROUTE + `campaign/participants/${id}/`,
      method: 'GET',
      accessToken: localStorage.getItem('token'),
      onSuccess: onSuccessGetCampaignParticipants,
      onFailure: onFailed,
      label: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
  });
}
function onSuccessGetCampaignParticipants(data) {
  return {
      type: 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS',
      data: data.participants
  }
}
/////////////////////////////////////////////// GET_CAMPAIGN_PARTICIPANTS_ACTION
export function getCampaignWinnings(id) {
  return apiAction({
      url: APIROUTE + `campaign/live/get-winnings/${id}/`,
      method: 'GET',
      accessToken: localStorage.getItem('token'),
      onSuccess: onSuccessGetCampaignWinnings,
      onFailure: onFailed,
      label: 'GET_CAMPAIGN_WINNINGS_SUCCESS',
  });
}
function onSuccessGetCampaignWinnings(data) {
  return {
      type: 'GET_CAMPAIGN_WINNINGS_SUCCESS',
      data: data.result_data
  }
}
/////////////////////////////////////////////// DRAW_CAMPAIGN_ACTION
export function drawCampaign(id, drawType, winning_name) {
  let endpoint = ''
  if (drawType === 'draw_by_gift')
      endpoint = 'campaign/live/pick/'
  else if (drawType === 'draw_all_by_gift')
      endpoint = 'campaign/live/all/'
  else if (drawType === 'draw')
      endpoint = 'campaign/live/'
  else if (drawType === 'draw_all')
      endpoint = 'campaign/live/finish/'

  return apiAction({
      url: APIROUTE + endpoint + id + '/',
      method: 'POST',
      data: (drawType === 'draw_by_gift' || drawType === 'draw_all_by_gift') ? qs.stringify({winning_name: winning_name}) : null,
      accessToken: localStorage.getItem('token'),
      onSuccess: (data) => onSuccessDrawCampaign(data, drawType),
      onFailure: (data) => onFailedDrawCampaign(data, winning_name),
      label: 'DRAW_CAMPAIGN_SUCCESS',
  });
}
function onSuccessDrawCampaign(data, drawType) {
  let winnerArr = []
  if (drawType === 'draw_by_gift' || drawType === 'draw') {
    winnerArr = [{username: data.winner.username, winning: data.winner.winning, picture_profile: data.winner.picture_profile}]
  } else {
    winnerArr = data.winners
  }
  return {
      type: 'DRAW_CAMPAIGN_SUCCESS',
      data: winnerArr,
      flag: true
  }
}
function onFailedDrawCampaign(data, winning_name) {
  openNotification('warning', 'All prizes will be distributed')
  return {
    type: 'DRAW_CAMPAIGN_FAILED',
    data: winning_name
  }
}
/////////////////////////////////////////////// UPDATE_CAMPAIGN_DETAIL_FAVORITE_ACTION
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