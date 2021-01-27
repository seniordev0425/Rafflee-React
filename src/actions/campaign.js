import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import { openNotification } from '../utils/notification'
import successMessages from '../utils/messages/success'
import errorMessages from '../utils/messages/error'
import { TWITCH_CLIENT_ID } from '../utils/constants'

const qs = require('querystring')

function onFailed(error) {
  openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')][error])
  if (error === 'MSG_ERROR_USER_NOT_CONNECTED_TO_TWITCH') {
    return { type: 'TWITCH_DIRECT_CONNECT', data: true }
  }
  else if (error === 'MSG_ERROR_USER_NOT_CONNECTED_TO_TWITTER') {
    return { type: 'TWITTER_DIRECT_CONNECT', data: true }
  }
  else if (error === 'MSG_ERROR_USER_NOT_CONNECTED_TO_YOUTUBE') {
    return { type: 'YOUTUBE_DIRECT_CONNECT', data: true }
  }
  else if (error === 'MSG_ERROR_USER_NOT_CONNECTED_TO_INSTAGRAM') {
    return { type: 'INSTAGRAM_DIRECT_CONNECT', data: true }
  }

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
    label: 'CAMPAIGN_PARTICIPATE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipate(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].participate)
  return {
    type: 'UPDATE_PARTICIPATION_VALIDATED',
    data: true
  }
}
/////////////////////////////////////////////// CAMPAIGN_SUBSCRIBE_ACTION
export function campaignSubscribe(params, id) {
  return apiAction({
    url: APIROUTE + `campaign/participate/subscription/${id}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
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
    label: 'GET_CAMPAIGN_DATA',
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
    label: 'GET_CAMPAIGN_PARTICIPANTS',
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
    label: 'GET_CAMPAIGN_WINNINGS',
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
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessDrawCampaign(data, drawType),
    onFailure: (data) => onFailedDrawCampaign(data, winning_name),
    label: 'DRAW_CAMPAIGN',
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
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessUpdateFavorite(data, name),
    onFailure: onFailed,
    label: 'UPDATE_CAMPAIGN_DETAIL_FAVORITE',
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
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessCreateCampaign,
    onFailure: onFailed,
    label: 'CREATE_CAMPAIGN',
    requireErrorMessage: true
  });
}
function onSuccessCreateCampaign(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].createCampaign)
  return {
    type: 'CREATED_PROMOTION_ID',
    data: data.promotion_id
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_LIKE_ACTION
export function campaignParticipateYoutubeLike(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/like/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeLike(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_LIKE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeLike(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_YOUTUBE_LIKE_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `youtube_like_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_LIKE_VALIDATION_ACTION
export function campaignParticipateYoutubeLikeValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/like/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeLikeValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_LIKE_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeLikeValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `youtube_like_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_ACTION
export function campaignParticipateYoutubeComment(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/comment/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeComment(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeComment(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `youtube_comment_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION_ACTION
export function campaignParticipateYoutubeCommentValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/comment/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeCommentValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeCommentValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `youtube_comment_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_ACTION
export function campaignParticipateYoutubeFollow(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/follow/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeFollow(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeFollow(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `youtube_follow_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION_ACTION
export function campaignParticipateYoutubeFollowValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/follow/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeFollowValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeFollowValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `youtube_follow_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_YOUTUBE_VIDEO_VALIDATION_ACTION
export function campaignParticipateYoutubeVideoValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/youtube/video/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateYoutubeVideoValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_YOUTUBE_VIDEO_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateYoutubeVideoValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `youtube_video_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_LIKE_ACTION
export function campaignParticipateTwitterLike(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/like/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterLike(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_LIKE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterLike(data, pk) {
  if (data.msg === 'MSG_LIKE_VALIDATED') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_LIKE_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitter_like_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION_ACTION
export function campaignParticipateTwitterLikeValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/like/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterLikeValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterLikeValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitter_like_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_ACTION
export function campaignParticipateTwitterRetweet(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/retweet/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterRetweet(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_RETWEET',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterRetweet(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_RETWEET_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitter_retweet_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_VALIDATION_ACTION
export function campaignParticipateTwitterRetweetValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/retweet/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterRetweetValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_RETWEET_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterRetweetValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitter_retweet_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_TWEET_ACTION
export function campaignParticipateTwitterTweet(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/tweet/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterTweet(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_TWEET',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterTweet(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_TWEET_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitter_tweet_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_TWEET_VALIDATION_ACTION
export function campaignParticipateTwitterTweetValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/tweet/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterTweetValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_TWEET_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterTweetValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitter_tweet_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_ACTION
export function campaignParticipateTwitterComment(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/tweet/comment/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterComment(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_COMMENT',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterComment(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_COMMENT_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitter_comment_tweet_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION_ACTION
export function campaignParticipateTwitterCommentValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/tweet/comment/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterCommentValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterCommentValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitter_comment_tweet_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_ACTION
export function campaignParticipateTwitterFollow(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/follow/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterFollow(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterFollow(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITTER_FOLLOW_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitter_follow_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_VALIDATION_ACTION
export function campaignParticipateTwitterFollowValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitter/follow/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitterFollowValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITTER_FOLLOW_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitterFollowValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitter_follow_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITCH_FOLLOW_ACTION
export function campaignParticipateTwitchFollow(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitch/follow/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitchFollow(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITCH_FOLLOW',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitchFollow(data, pk) {
  if (data.msg === 'MSG_ACTION_EXIST') {
    return {
      type: 'SET_TEMP_ACTION_DATA',
      data: data,
      openModalName: 'OPEN_TWITCH_FOLLOW_VALIDATION_MODAL'
    }
  } else {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')][data.msg])
    return {
      type: 'SET_ACTION_VALIDATION_STATUS',
      data: `twitch_follow_validation_${pk}`,
      confirmed_participation: data.confirmed_participation
    }
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TWITCH_FOLLOW_VALIDATION_ACTION
export function campaignParticipateTwitchFollowValidation(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/twitch/follow/validation/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTwitchFollowValidation(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TWITCH_FOLLOW_VALIDATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTwitchFollowValidation(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `twitch_follow_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_VIDEO_ACTION
export function campaignParticipateVideo(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/url_video/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateVideo(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_VIDEO',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateVideo(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].completeToWatchVideo)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `video_watch_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_POLL_ACTION
export function campaignParticipatePoll(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/poll/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipatePoll(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_POLL',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipatePoll(data, pk) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].completeToSubmitPoll)
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `poll_action_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_WEBSITE_ACTION
export function campaignParticipateWebsite(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/url_website/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateWebsite(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_WEBSITE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateWebsite(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `website_visit_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_INSTAGRAM_PROFILE_ACTION
export function campaignParticipateInstagramProfile(params, pk, instagram_follow_url) {
  return apiAction({
    url: APIROUTE + `campaign/participate/instagram/follow/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateInstagramProfile(data, pk, instagram_follow_url),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_INSTAGRAM_PROFILE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateInstagramProfile(data, pk, instagram_follow_url) {
  window.open(instagram_follow_url, '_blank')
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `instagram_follow_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_INSTAGRAM_PUBLICATION_ACTION
export function campaignParticipateInstagramPublication(params, pk, instagram_like_url) {
  return apiAction({
    url: APIROUTE + `campaign/participate/instagram/like/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateInstagramPublication(data, pk, instagram_like_url),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_INSTAGRAM_PUBLICATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateInstagramPublication(data, pk, instagram_like_url) {
  window.open(instagram_like_url, '_blank')
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `instagram_like_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_INSTAGRAM_COMMENT_ACTION
export function campaignParticipateInstagramComment(params, pk, instagram_comment_url) {
  return apiAction({
    url: APIROUTE + `campaign/participate/instagram/comment/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateInstagramComment(data, pk, instagram_comment_url),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_INSTAGRAM_COMMENT',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateInstagramComment(data, pk, instagram_comment_url) {
  if (data.status !== 201 && data?.in_progress !== true) window.open(instagram_comment_url, '_blank')
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: (data.status === 201 || data.in_progress) ? `instagram_comment_in_progress_${pk}` : `instagram_comment_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}


/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_TIKTOK_PROFILE_ACTION
export function campaignParticipateTiktokProfile(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/tiktok/follow/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTiktokProfile(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TIKTOK_PROFILE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTiktokProfile(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `tiktok_follow_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_INSTAGRAM_PUBLICATION_ACTION
export function campaignParticipateTiktokPublication(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/tiktok/like/${pk}`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateTiktokPublication(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_TIKTOK_PUBLICATION',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateTiktokPublication(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `tiktok_like_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_FACEBOOK_PAGE_ACTION
export function campaignParticipateFacebookPage(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/facebook/page/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateFacebookPage(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_FACEBOOK_PAGE',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateFacebookPage(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `facebook_page_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_FACEBOOK_URL_ACTION
export function campaignParticipateFacebookUrl(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/facebook/url/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateFacebookUrl(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_FACEBOOK_URL',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateFacebookUrl(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `facebook_url_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CAMPAIGN_PARTICIPATE_FACEBOOK_POST_ACTION
export function campaignParticipateFacebookPost(params, pk) {
  return apiAction({
    url: APIROUTE + `campaign/participate/facebook/post/${pk}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCampaignParticipateFacebookPost(data, pk),
    onFailure: onFailed,
    label: 'CAMPAIGN_PARTICIPATE_FACEBOOK_POST',
    requireErrorMessage: true
  });
}
function onSuccessCampaignParticipateFacebookPost(data, pk) {
  return {
    type: 'SET_ACTION_VALIDATION_STATUS',
    data: `facebook_post_validation_${pk}`,
    entries: data.entries,
    remaining_actions: data.remaining_actions,
    confirmed_participation: data.confirmed_participation
  }
}
/////////////////////////////////////////////// CLOSE_CAMPAIGN_ACTION
export function closeCampaign(params) {
  return apiAction({
    url: APIROUTE + "campaign/close/",
    method: 'POST',
    data: params,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessCloseCampaign,
    onFailure: onFailed,
    label: 'CLOSE_CAMPAIGN',
    requireErrorMessage: true

  });
}
function onSuccessCloseCampaign(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].closeCampaign)
  return {
    type: 'UPDATE_MYCAMPAIGN_ENDDATE',
    data: { promotion_id: data.promotion_id, end_date: data.end_date }
  }
}
/////////////////////////////////////////////// CLOSE_CAMPAIGN_ACTION
export function getWinningData(id, name) {
  return apiAction({
    url: APIROUTE + `campaign/prizes/details/${id}/${name}/`,
    onSuccess: onSuccessGetWinningData,
    onFailure: onFailed,
    label: 'GET_WINNING_DATA',
  });
}
function onSuccessGetWinningData(data) {
  return {
    type: 'SET_WINNING_DATA',
    data: data
  }
}
/////////////////////////////////////////////// GET_BEING_CREATED_CAMPAIGN_ACTION
export function getBeingCreatedCampaigns() {
  return apiAction({
    url: APIROUTE + "company/campaign/being-created/",
    method: 'GET',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetBeingCreatedCampaigns,
    onFailure: onFailed,
    label: 'GET_BEING_CREATED_CAMPAIGNS',
  });
}
function onSuccessGetBeingCreatedCampaigns(data) {
  return {
    type: 'SET_BEING_CREATED_CAMPAIGNS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// DELETE_BEING_CREATED_CAMPAIGN_ACTION
export function deleteBeingCreatedCampaign(params) {
  return apiAction({
    url: APIROUTE + "company/campaign/being-created/delete/",
    method: 'DELETE',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessDeleteCampaign(data, params),
    onFailure: onFailed,
    label: 'DELETE_BEING_CREATED_CAMPAIGN',
    requireErrorMessage: true
  });
}
function onSuccessDeleteCampaign(data, params) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].deleteBeingCreatedCampaign)
  return {
    type: 'DELETE_BEING_CREATED_CAMPAIGN',
    data: params.pk
  }
}

/////////////////////////////////////////////// SAVE_CAMPAIGN_ACTION
export function saveCampaign(params) {
  return apiAction({
    url: APIROUTE + "campaign/save/",
    method: 'POST',
    data: params,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessSaveCampaign,
    onFailure: onFailed,
    label: 'SAVE_CAMPAIGN',
    requireErrorMessage: true
  });
}
function onSuccessSaveCampaign(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].saveCampaign)
  return {
    type: '',
  }
}
/////////////////////////////////////////////// GET_CAMPAIGN_RULES_ACTION
export function getCampaignRules(id) {
  return apiAction({
    url: APIROUTE + `campaign/${id}/rules/`,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetCampaignRules,
    onFailure: onFailed,
    label: 'GET_CAMPAIGN_RULES',
    requireErrorMessage: true

  });
}
function onSuccessGetCampaignRules(data) {
  return {
    type: 'SET_CAMPAIGN_RULES',
    data: data.result_data
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