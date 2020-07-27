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

/////////////////////////////////////////////// LOGIN-ACTION
export function logIn(params, rememberMe) {
  return apiAction({
    url: APIROUTE + "login/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: (data) => onSuccessLogIn(data, rememberMe),
    onFailure: onFailed,
    label: 'LOG_IN',
    requireErrorMessage: true

  });
}
export function facebookLogin(params) {
  return apiAction({
    url: APIROUTE + "login/facebook/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: (data) => onSuccessLogIn(data, false),
    onFailure: onFailed,
    label: 'FACEBOOK_LOG_IN',
    requireErrorMessage: true
  });
}
export function googleLogin(params) {
  return apiAction({
    url: APIROUTE + "login/google/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: (data) => onSuccessLogIn(data, false),
    onFailure: onFailed,
    label: 'GOOGLE_LOG_IN',
    requireErrorMessage: true
  });
}
function onSuccessLogIn(data, rememberMe) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].logIn)
  sessionStorage.setItem('token', data.token)
  sessionStorage.setItem('company', data.company)
  if (rememberMe) {
    localStorage.setItem('token', data.token)
    localStorage.setItem('company', data.company)
  }
  return {
    type: 'LOG_IN_SUCCESS',
    data: data
  }
}
/////////////////////////////////////////////// LOGOUT-ACTION
export function logOut(params) {
  return apiAction({
    url: APIROUTE + "logout/",
    method: 'POST',
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessLogOut,
    onFailure: onFailed,
    label: 'LOG_OUT',
  });
}
function onSuccessLogOut(data) {
  sessionStorage.clear()
  localStorage.removeItem('token')
  localStorage.removeItem('company')
  return {
    type: 'LOG_IN_SUCCESS',
    data: { token: null, company: false }
  }
}
/////////////////////////////////////////////// DELETE-ACCOUNT-ACTION
export function deleteAccount(params) {
  return apiAction({
    url: APIROUTE + "account/profile/deactivate/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessDeleteAccount,
    onFailure: onFailed,
    label: 'DELETE_ACCOUNT',
    requireErrorMessage: true
  });
}
function onSuccessDeleteAccount(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].deleteAccount)
  return {
    type: 'DELETE_ACCOUNT_SUCCESS',
    flag: true
  }
}
/////////////////////////////////////////////// SIGNUP-ACTION
export function signUp(params) {
  return apiAction({
    url: APIROUTE + "account/register/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: onSuccessSignUp,
    onFailure: onFailed,
    label: 'SIGN_UP',
    requireErrorMessage: true
  });
}
function onSuccessSignUp(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].signUp)
  return {
    type: '',
    data: ''  
  }
}
/////////////////////////////////////////////// COMPANY-CONTACT-ACTION
export function companyContact(params) {
  return apiAction({
    url: APIROUTE + "company/contact-form/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: onSuccessCompanyContact,
    onFailure: onFailed,
    label: 'COMPANY_CONTACT',
  });
}
function onSuccessCompanyContact(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].companySendMessage)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// GET-USER-PROFILE-ACTION
export function getUserProfile() {
  return apiAction({
    url: APIROUTE + "account/profile/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetUserProfile,
    onFailure: onFailed,
    label: 'GET_USER_PROFILE',
  });
}
function onSuccessGetUserProfile(data) {
  return {
    type: 'GET_USER_PROFILE_SUCCESS',
    data: data.user_informations
  }
}
/////////////////////////////////////////////// UPDATE-USER-PROFILE-ACTION
export function updateUserProfile(params) {
  return apiAction({
    url: APIROUTE + "account/profile/update/",
    method: 'POST',
    data: params,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessUpdateUserProfile,
    onFailure: onFailed,
    label: 'UPDATE_USER_PROFILE',
  });
}
function onSuccessUpdateUserProfile(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].accountUpdate)
  if (data.token) {
    if (localStorage.getItem('token')) localStorage.setItem('token', data.token)
    sessionStorage.setItem('token', data.token)
    return {
      type: 'UPDATE_TOKEN',
      data: data.token
    }
  } else {
    return {
      type: ''
    }
  }
}
/////////////////////////////////////////////// GET-COMPANY-PROFILE-ACTION
export function getCompanyProfile() {
  return apiAction({
    url: APIROUTE + "company/profile/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetCompanyProfile,
    onFailure: onFailed,
    label: 'GET_COMPANY_PROFILE',

  });
}
function onSuccessGetCompanyProfile(data) {
  return {
    type: '',
    data: data.user_informations
  }
}
/////////////////////////////////////////////// UPDATE-COMPANY-PROFILE-ACTION
export function updateCompanyProfile(params) {
  return apiAction({
    url: APIROUTE + "company/profile/update/",
    method: 'POST',
    data: params,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessUpdateCompanyProfile,
    onFailure: onFailed,
    label: 'UPDATE_COMPANY_PROFILE',

  });
}
function onSuccessUpdateCompanyProfile(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].accountUpdate)
  if (data.token) {
    if (localStorage.getItem('token')) localStorage.setItem('token', data.token)
    sessionStorage.setItem('token', data.token)
    return {
      type: 'UPDATE_TOKEN',
      data: data.token
    }
  } else {
    return {
      type: ''
    }
  }
}
/////////////////////////////////////////////// RESEND-SMS-ACTION
export function resendSms(params) {
  return apiAction({
    url: APIROUTE + "account/number/send-sms/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessResendSms,
    onFailure: onFailed,
    label: 'RESEND_SMS',
  });
}
function onSuccessResendSms(data) {
  return {
    type: 'RESEND_SMS_SUCCESS',
    data: ''
  }
}
/////////////////////////////////////////////// SEND-SMS-ACTION
export function sendSms(params) {
  return apiAction({
    url: APIROUTE + "account/number/send-sms/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessSendSms,
    onFailure: onFailed,
    label: 'SEND_SMS',
    requireErrorMessage: true
  });
}
function onSuccessSendSms(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// VERIFY-PHONE-NUMBER-ACTION
export function verifyPhoneNumber(params) {
  return apiAction({
    url: APIROUTE + "account/number/verification/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessVerifyPhoneNumber,
    onFailure: onFailed,
    label: 'VERIFY_PHONE_NUMBER_REQUEST',
  });
}
function onSuccessVerifyPhoneNumber(data) {
  return {
    type: 'VERIFY_PHONE_NUMBER_SUCCESS',
    flag: true
  }
}
/////////////////////////////////////////////// GET-USER-INVENTORY-ACTION
export function getUserInventory() {
  return apiAction({
    url: APIROUTE + "campaign/user/inventory/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetUserInventory,
    onFailure: onFailed,
    label: 'GET_USER_INVENTORY',
  });
}
function onSuccessGetUserInventory(data) {
  return {
    type: 'SET_USER_INVENTORY',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-PARTICIPATION-HISTORY-ACTION
export function getParticipationHistory() {
  return apiAction({
    url: APIROUTE + "campaign/user/historical/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetParticipationHistory,
    onFailure: onFailed,
    label: 'GET_PARTICIPATION_HISTORY',
  });
}
function onSuccessGetParticipationHistory(data) {
  return {
    type: 'SET_PARTICIPATION_HISTORY',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-USER-INPROGRESS-ACTION
export function getUserInProgress() {
  return apiAction({
    url: APIROUTE + "campaign/user/in-progress/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetUserInProgress,
    onFailure: onFailed,
    label: 'GET_USER_IN_PROGRESS',
  });
}
function onSuccessGetUserInProgress(data) {
  return {
    type: 'SET_USER_IN_PROGRESS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-MY-FOLLOWING-ACTION
export function getFollowing() {
  return apiAction({
    url: APIROUTE + "favorites/campaign/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetFollowing,
    onFailure: onFailed,
    label: 'GET_FOLLOWING_CAMPAIGNS',
  });
}
function onSuccessGetFollowing(data) {
  return {
    type: 'SET_FOLLOWING_CAMPAIGNS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET_FAVORITE_COMPANIES
export function getFavoriteCompanies() {
  return apiAction({
    url: APIROUTE + `favorites/company/`,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetFavoriteCompanies,
    onFailure: onFailed,
    label: 'GET_FAVORITE_COMPANIES',
  });
}
function onSuccessGetFavoriteCompanies(data) {
  return {
    type: 'SET_MY_FAVORITE_COMPANIES',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-MY-CAMPAIGNS-ACTION
export function getMyCampaigns() {
  return apiAction({
    url: APIROUTE + "company/campaign/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetMyCampaigns,
    onFailure: onFailed,
    label: 'GET_MY_CAMPAIGNS',
  });
}
function onSuccessGetMyCampaigns(data) {
  return {
    type: 'GET_MY_CAMPAIGNS_SUCCESS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-MY-BILLS-ACTION
export function getMyBills() {
  return apiAction({
    url: APIROUTE + "company/bills/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetMyBills,
    onFailure: onFailed,
    label: 'GET_MY_BILLS',
  });
}
function onSuccessGetMyBills(data) {
  return {
    type: 'GET_MY_BILLS_SUCCESS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-PDF-INVOICE-ACTION
export function getPdfInvoice(id) {
  return apiAction({
    url: APIROUTE + `company/bill/${id}/`,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetPdfInvoice,
    onFailure: onFailed,
    label: 'GET_PDF_INVOICE',
  });
}
function onSuccessGetPdfInvoice(data) {
  return {
    type: 'SET_PDF_INVOICE',
    data: data.result_data
  }
}
/////////////////////////////////////////////// PROFILE-ACTIVATE-ACTION
export function profileActivate(id, token) {
  return apiAction({
    url: APIROUTE + `account/profile/activate/${id}/${token}/`,
    onSuccess: onSuccessProfileActivate,
    onFailure: onFailed,
    label: 'GET_USER_INVENTORY',
  });
}
function onSuccessProfileActivate(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// UPDATE-DASHBOARD-FAVORITE-ACTION
export function updateFavorite(params, name) {
  return apiAction({
    url: APIROUTE + "favorites/update/campaign/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: (data) => onSuccessUpdateFavorite(data, name),
    onFailure: onFailed,
    label: 'UPDATE_DASHBOARD_FAVORITE',
  });
}
function onSuccessUpdateFavorite(data, name) {
  return {
    type: 'UPDATE_DASHBOARD_FAVORITE_SUCCESS',
    arrname: name,
    id: data.promotion_id,
    result: data.msg
  }
}
/////////////////////////////////////////////// RESET-PASSWORD-REQUEST-ACTION
export function resetPasswordRequest(params) {
  return apiAction({
    url: APIROUTE + "account/password/reset/email/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: onSuccessResetPasswordRequest,
    onFailure: onFailed,
    label: 'RESET_PASSWORD_REQUEST',
    requireErrorMessage: true
  });
}
function onSuccessResetPasswordRequest(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].resetPasswordRequest)
  return {
    type: 'RESET_PASSWORD_REQUEST_SUCCESS',
    flag: true
  }
}
/////////////////////////////////////////////// RESET-PASSWORD-ACTION
export function resetPassword(params) {
  return apiAction({
    url: APIROUTE + "account/password/reset/",
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: onSuccessResetPassword,
    onFailure: onFailed,
    label: 'RESET_PASSWORD',
    requireErrorMessage: true
  });
}
function onSuccessResetPassword(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].resetPassword)
  return {
    type: 'RESET_PASSWORD_SUCCESS',
    flag: true
  }
}
/////////////////////////////////////////////// RESET-PASSWORD-ACTION
export function updatePassword(params) {
  return apiAction({
    url: APIROUTE + "account/password/update/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessUpdatePassword,
    onFailure: onFailed,
    label: 'UPDATE_PASSWORD',
    requireErrorMessage: true
  });
}
function onSuccessUpdatePassword(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].resetPassword)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// GET-COMPANY-INFORMATION-ACTION
export function getCompanyInformation(id, params) {
  return apiAction({
    url: APIROUTE + `company/${id}/`,
    method: 'POST',
    data: qs.stringify(params),
    onSuccess: onSuccessGetCompanyInformation,
    onFailure: onFailed,
    label: 'GET_COMPANY_INFORMATION',
  });
}
function onSuccessGetCompanyInformation(data) {
  return {
    type: 'SET_COMPANY_INFORMATION',
    data: data.msg
  }
}
/////////////////////////////////////////////// CAMPAIGN_FOLLOW_ACTION
export function followCircle(params, id) {
  return apiAction({
    url: APIROUTE + `account/follow/${id}/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessFollowCircle,
    onFailure: onFailed,
    label: 'FOLLOW_CIRCLE',
    requireErrorMessage: true
  });
}
function onSuccessFollowCircle(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].followCircle)
  return {
    type: 'SET_COMPANY_FOLLOW_VALUE',
    data: true
  }
}
/////////////////////////////////////////////// CAMPAIGN_UNFOLLOW_ACTION
export function unfollowCircle(id) {
  return apiAction({
    url: APIROUTE + `account/unfollow/${id}/`,
    method: 'POST',
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessUnfollowCircle,
    onFailure: onFailed,
    label: 'UNFOLLOW_CIRCLE',
    requireErrorMessage: true
  });
}
function onSuccessUnfollowCircle(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].unfollowCircle)
  return {
    type: 'SET_COMPANY_FOLLOW_VALUE',
    data: false
  }
}
/////////////////////////////////////////////// TWITTER_CONNECT_STEP1
export function twitterConnectStep1() {
  return apiAction({
    url: APIROUTE + `twitter/connect/1/`,
    method: 'POST',
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessTwitterConnectStep1,
    onFailure: onFailed,
    label: 'TWITTER_CONNECT_STEP1',
  });
}
function onSuccessTwitterConnectStep1(data) {
  return {
    type: 'SET_TWITTER_OAUTH_TOKEN',
    data: data.oauth_token
  }
}
/////////////////////////////////////////////// TWITTER_CONNECT_STEP2
export function twitterConnectStep2(params) {
  return apiAction({
    url: APIROUTE + `twitter/connect/2/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessTwitterConnectStep2,
    onFailure: onFailed,
    label: 'TWITTER_CONNECT_STEP2',
  });
}
function onSuccessTwitterConnectStep2(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// TWITCH_CONNECT
export function twitchConnect(params) {
  return apiAction({
    url: APIROUTE + `twitch/connect/web/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessTwitchConnect,
    onFailure: onFailed,
    label: 'TWITCH_CONNECT',
  });
}
function onSuccessTwitchConnect(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// INSTAGRAM_CONNECT
export function instagramConnect(params) {
  return apiAction({
    url: APIROUTE + `instagram/connect/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessInstagramConnect,
    onFailure: onFailed,
    label: 'INSTAGRAM_CONNECT',
  });
}
function onSuccessInstagramConnect(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// FACEBOOK_CONNECT
export function facebookConnect(params, company) {
  return apiAction({
    url: APIROUTE + `facebook/connect/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: (data) => onSuccessFacebookConnect(data, company),
    onFailure: onFailed,
    label: 'FACEBOOK_CONNECT',
  });
}
function onSuccessFacebookConnect(data, company) {
  return {
    type: 'SET_USER_FACEBOOK_CONNECT',
    data: true,
    company: company
  }
}
/////////////////////////////////////////////// PARTICIPATION_RESULT_ACTION
export function participationResult(id) {
  return apiAction({
    url: APIROUTE + `account/result/${id}/`,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessParticipationResult,
    onFailure: onFailed,
    label: 'PARTICIPATION_RESULT',
    requireErrorMessage: true
  });
}
function onSuccessParticipationResult(data) {
  return {
    type: 'SET_PARTICIPATION_RESULT',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET_COMPANY_WALL_ACTION
export function getCompanyWall(id) {
  return apiAction({
    url: APIROUTE + `company/wall/${id}/`,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetCompanyWall,
    onFailure: onFailed,
    label: 'GET_COMPANY_WALL',
  });
}
function onSuccessGetCompanyWall(data) {
  return {
    type: 'SET_COMPANY_WALL',
    data: data.wall
  }
}
/////////////////////////////////////////////// GET_WALL_SETTING_ACTION
export function getWallSetting() {
  return apiAction({
    url: APIROUTE + `account/wall/settings/`,
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetWallSetting,
    onFailure: onFailed,
    label: 'GET_WALL_SETTING',
  });
}
function onSuccessGetWallSetting(data) {
  return {
    type: 'SET_WALL_SETTING',
    data: data
  }
}
/////////////////////////////////////////////// UPDATE_WALL_SETTING_ACTION
export function updateWallSetting(params) {
  return apiAction({
    url: APIROUTE + `account/wall/settings/`,
    data: qs.stringify(params),
    method: 'POST',
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessUpdateWallSetting,
    onFailure: onFailed,
    label: 'UPDATE_WALL_SETTING',
  });
}
function onSuccessUpdateWallSetting(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// CHECK_USER_NAME_ACTION
export function checkUserName(params) {
  return apiAction({
    url: APIROUTE + `account/profile/username/`,
    data: qs.stringify(params),
    method: 'POST',
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessCheckUserName,
    onFailure: onFailed,
    label: 'CHECK_USER_NAME',
  });
}
function onSuccessCheckUserName(data) {
  return {
    type: 'SET_USER_NAME_CHECKED_STATUS',
    data: !data.exist
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