import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import { openNotification } from '../utils/notification'

const qs = require('querystring')

function onFailed(error) {
  // openNotification('warning', 'SignUp Failed', 'password doesnt match')
  return {
    type: 'API_FAILED',
    error: error    
  }
}
/////////////////////////////////////////////// LOGIN-ACTION
export function logIn(params) {
  return apiAction({
      url: APIROUTE + "login/",
      method: 'POST',
      data: qs.stringify(params),
      onSuccess: onSuccessLogIn,
      onFailure: onFailed,
      label: 'LOG_IN_SUCCESS',
  });
}
function onSuccessLogIn(data) {
  openNotification('success', 'Login Success')
  localStorage.setItem('token', data.token)
  localStorage.setItem('company', data.company)
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
      accessToken: localStorage.getItem('token'),
      onSuccess: onSuccessLogOut,
      onFailure: onFailed,
      label: 'LOG_IN_SUCCESS',
  });
}
function onSuccessLogOut(data) {
  if (localStorage.length) localStorage.clear() 
  return {
      type: 'LOG_IN_SUCCESS',
      data: {token: null, company: false}
  }
}
/////////////////////////////////////////////// SIGNUP-ACTION
export function signUp(params) {
  return apiAction({
    url: APIROUTE + "account/register/",
    method: 'POST',
    data: qs.stringify(params),
    accessToken: "Basic cmFmZmxlZTpKM1N1aXNMM1A0c3NXb3JkUg==",
    onSuccess: onSuccessSignUp,
    onFailure: onFailed,
    label: 'SIGN_UP_SUCCESS',
  });
}
function onSuccessSignUp(data) {
  openNotification('success', 'SignUp Success!', 'We sent a confirm link to your email. Please check your email inbox.')
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
  openNotification('success', 'Successfully submitted')
  return {
      type: 'API_SUCCESS',
      data: ''
  }
}
/////////////////////////////////////////////// GET-USER-PROFILE-ACTION
export function getUserProfile() {
    return apiAction({
        url: APIROUTE + "account/profile/",
        accessToken: localStorage.getItem('token'),
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
     accessToken: localStorage.getItem('token'),
     onSuccess: onSuccessUpdateUserProfile,
     onFailure: onFailed,
     label: 'UPDATE_USER_PROFILE_SUCCESS',
     
 });
}
function onSuccessUpdateUserProfile(data) {
  openNotification('success', 'Success', 'Successfully Updated.')
 return {
     type: 'UPDATE_USER_PROFILE_SUCCESS',
     data: ''
 }
}
/////////////////////////////////////////////// GET-COMPANY-PROFILE-ACTION
export function getCompanyProfile() {
  return apiAction({
     url: APIROUTE + "company/profile/",
     accessToken: localStorage.getItem('token'),
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
     accessToken: localStorage.getItem('token'),
     onSuccess: onSuccessUpdateCompanyProfile,
     onFailure: onFailed,
     label: 'UPDATE_COMPANY_PROFILE_SUCCESS',
     
 });
}
function onSuccessUpdateCompanyProfile(data) {
  openNotification('success', 'Success', 'Successfully Updated.')
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
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
      onSuccess: onSuccessSendSms,
      onFailure: onFailed,
      label: 'SEND_SMS_SUCCESS',
  });
}
function onSuccessSendSms(data) {
  return {
      type: 'API_SUCCESS',
      name: 'TOGGLE_VERIFICATION_MODAL',
      data: true
  }
}
/////////////////////////////////////////////// VERIFY-PHONE-NUMBER-ACTION
export function verifyPhoneNumber(params) {
  return apiAction({
      url: APIROUTE + "account/number/verification/",
      method: 'POST',
      data: qs.stringify(params),
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
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
      accessToken: localStorage.getItem('token'),
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
      type: 'API_SUCCESS',
      data: ''
  }
}
/////////////////////////////////////////////// UPDATE-DASHBOARD-FAVORITE-SUCCESS
export function updateFavorite(params, name) {
  return apiAction({
      url: APIROUTE + "favorites/update/",
      method: 'POST',
      data: qs.stringify(params),
      accessToken: localStorage.getItem('token'),
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