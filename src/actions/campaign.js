import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import { openNotification } from '../utils/notification'
import successMessages from '../utils/messages/success'
import errorMessages from '../utils/messages/error'

const qs = require('querystring')

function onFailed(error) {
  openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')][error])
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
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipate,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipate(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].participate)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// CAMPAIGN_SUBSCRIBE_ACTION
export function campaignSubscribe(params, id) {
  return apiAction({
    url: APIROUTE + `campaign/participate/subscription/${id}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignSubscribe,
    onFailure: onFailed,
    label: 'CAMPAIGN_SUBSCRIPTION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignSubscribe(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].campaignSubscribe)
  return {
    type: '',
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
    accessToken: sessionStorage.getItem('token'),
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
    accessToken: sessionStorage.getItem('token'),
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
    data: (drawType === 'draw_by_gift' || drawType === 'draw_all_by_gift') ? qs.stringify({ winning_name: winning_name }) : null,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: (data) => onSuccessDrawCampaign(data, drawType),
    onFailure: (data) => onFailedDrawCampaign(data, winning_name),
    label: 'DRAW_CAMPAIGN_SUCCESS',
    requireErrorMessage: true
  });
}
function onSuccessDrawCampaign(data, drawType) {
  let winnerArr = []
  if (drawType === 'draw_by_gift' || drawType === 'draw') {
    winnerArr = [{ username: data.winner.username, winning: data.winner.winning, picture_profile: data.winner.picture_profile }]
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
  openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')].ALL_WINNING_OBJECT_ARE_DISTRIBUTED)
  return {
    type: 'DRAW_CAMPAIGN_FAILED',
    data: winning_name
  }
}
/////////////////////////////////////////////// UPDATE_CAMPAIGN_DETAIL_FAVORITE_ACTION
export function updateFavorite(params, name) {
  return apiAction({
    url: APIROUTE + "favorites/update/campaign/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
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
/////////////////////////////////////////////// CREATE_CAMPAIGN_ACTION
export function createCampaign(params) {
  return apiAction({
    url: APIROUTE + "campaign/create/",
    method: 'POST',
    data: params,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCreateCampaign,
    onFailure: onFailed,
    label: 'CREATE_CAMPAIGN',
    requireErrorMessage: true

  });
}
function onSuccessCreateCampaign(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].createCampaign)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_LIKE_ACTION
export function campaignParticipateTwitterLike(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/like/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterLike,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_LIKE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterLike(data) {
  if (data.msg === 'MSG_LIKE_VALIDATED') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_LIKE_VALIDATION_MODAL'
    }
  } else {
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: 'twitter_like_validation',
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION_ACTION
export function campaignParticipateTwitterLikeValidation(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/like/validation/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterLikeValidation,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterLikeValidation(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: 'twitter_like_validation',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_ACTION
export function campaignParticipateTwitterRetweet(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/retweet/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterRetweet,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_RETWEET',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterRetweet(data) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_RETWEET_VALIDATION_MODAL'
    }
  } else {
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: 'twitter_retweet_validation',
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_VALIDATION_ACTION
export function campaignParticipateTwitterRetweetValidation(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/retweet/validation/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterRetweetValidation,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterRetweetValidation(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: 'twitter_retweet_validation',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_ACTION
export function campaignParticipateTwitterComment(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/tweet/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterComment,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_COMMENT',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterComment(data) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_COMMENT_VALIDATION_MODAL'
    }
  } else {
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: 'twitter_comment_validation',
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION_ACTION
export function campaignParticipateTwitterCommentValidation(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/tweet/validation/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterCommentValidation,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterCommentValidation(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: 'twitter_comment_validation',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_ACTION
export function campaignParticipateTwitterFollow(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/follow/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterFollow,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterFollow(data) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_FOLLOW_VALIDATION_MODAL'
    }
  } else {
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: 'twitter_follow_validation',
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_VALIDATION_ACTION
export function campaignParticipateTwitterFollowValidation(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/twitter/follow/validation/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateTwitterFollowValidation,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterFollowValidation(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: 'twitter_follow_validation',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_VIDEO_ACTION
export function campaignParticipateVideo(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/url_video/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateVideo,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_VIDEO',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateVideo(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].completeToWatchVideo)
  return {
    type: '',
    data: '',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_POLL_ACTION
export function campaignParticipatePoll(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/poll/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipatePoll,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_POLL',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipatePoll(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].completeToSubmitPoll)
  return {
    type: '',
    data: '',
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_WEBSITE_ACTION
export function campaignParticipateWebsite(params) {
  return apiAction({
    url: APIROUTE + "campaign/participate/url_website/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCampaignParticipateWebsite,
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_WEBSITE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateWebsite(data) {
  // openNotification('success', successMessages[localStorage.getItem('i18nextLng')].completeToWatchVideo)
  return {
    type: '',
    data: '',
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