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
    label: 'LOG_IN_SUCCESS',
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
    label: 'SIGN_UP_SUCCESS',
    requireErrorMessage: true
  });
}
function onSuccessSignUp(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].signUp)
  return {
    type: 'SIGN_UP_SUCCESS',
    data: true
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
    label: 'COMPANY_CONTACT_SUCCESS',
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
    label: 'GET_USER_PROFILE_SUCCESS',
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
    label: 'UPDATE_USER_PROFILE_SUCCESS',

  });
}
function onSuccessUpdateUserProfile(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].accountUpdate)
  return {
    type: 'UPDATE_USER_PROFILE_SUCCESS',
    data: ''
  }
}
/////////////////////////////////////////////// GET-COMPANY-PROFILE-ACTION
export function getCompanyProfile() {
  return apiAction({
    url: APIROUTE + "company/profile/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetCompanyProfile,
    onFailure: onFailed,
    label: 'GET_COMPANY_PROFILE_SUCCESS',

  });
}
function onSuccessGetCompanyProfile(data) {
  return {
    type: 'GET_COMPANY_PROFILE_SUCCESS',
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
    label: 'UPDATE_COMPANY_PROFILE_SUCCESS',

  });
}
function onSuccessUpdateCompanyProfile(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].accountUpdate)
  return {
    type: 'UPDATE_COMPANY_PROFILE_SUCCESS',
    data: ''
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
    label: 'RESEND_SMS_SUCCESS',
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
    url: APIROUTE + "campaign/user/in-progress/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetUserInventory,
    onFailure: onFailed,
    label: 'GET_USER_INVENTORY_SUCCESS',
  });
}
function onSuccessGetUserInventory(data) {
  return {
    type: 'GET_USER_INVENTORY_SUCCESS',
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
    label: 'GET_PARTICIPATION_HISTORY_SUCCESS',
  });
}
function onSuccessGetParticipationHistory(data) {
  return {
    type: 'GET_PARTICIPATION_HISTORY_SUCCESS',
    data: data.result_data
  }
}
/////////////////////////////////////////////// GET-MY-FOLLOWING-ACTION
export function getFollowing() {
  return apiAction({
    url: APIROUTE + "favorites/",
    accessToken: sessionStorage.getItem('token'),
    onSuccess: onSuccessGetFollowing,
    onFailure: onFailed,
    label: 'GET_FOLLOWING_SUCCESS',
  });
}
function onSuccessGetFollowing(data) {
  return {
    type: 'GET_FOLLOWING_SUCCESS',
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
    label: 'GET_MY_CAMPAIGNS_SUCCESS',
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
    label: 'GET_MY_BILLS_SUCCESS',
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
    label: 'GET_USER_INVENTORY_SUCCESS',
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
    url: APIROUTE + "favorites/update/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: sessionStorage.getItem('token'),
    onSuccess: (data) => onSuccessUpdateFavorite(data, name),
    onFailure: onFailed,
    label: 'UPDATE_DASHBOARD_FAVORITE_SUCCESS',
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