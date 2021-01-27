import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import errorMessages from '../utils/messages/error'
import { openNotification } from '../utils/notification'

const qs = require('querystring')

function onFailed(error) {
  openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')][error])
  return {
    type: 'API_FAILED',
    error: error
  }
}
/////////////////////////////////////////////// GET-FACEBOOK-PAGES-ACTION
export function getFacebookPages() {
  return apiAction({
    url: APIROUTE + `facebook/page/search/`,
    method: 'GET',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetFacebookPages,
    onFailure: onFailed,
    label: 'GET_FACEBOOK_PAGES'
  });
}
function onSuccessGetFacebookPages(data) {
  return {
    type: 'SET_FACEBOOK_PAGES',
    data: data.search
  }
}
/////////////////////////////////////////////// GET-FACEBOOK-PUBLICATIONS-ACTION
export function getFacebookPublications(params) {
  return apiAction({
    url: APIROUTE + `facebook/publication/search/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetFacebookPublications,
    onFailure: onFailed,
    label: 'GET_FACEBOOK_PUBLICATIONS'
  });
}
function onSuccessGetFacebookPublications(data) {
  return {
    type: 'SET_FACEBOOK_PUBLICATIONS',
    data: data.search
  }
}
/////////////////////////////////////////////// GET_INSTAGRAM_BUSINESS_PAGES
export function instagramBusinessConnect1(params) {
  return apiAction({
    url: APIROUTE + `instagram/business/connect/1/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessInstagramBusinessConnect1,
    onFailure: onFailed,
    label: 'GET_INSTAGRAM_BUSINESS_PAGES'
  });
}
function onSuccessInstagramBusinessConnect1(data) {
  return {
    type: 'SET_INSTAGRAM_BUSINESS_PAGES',
    data: data.pages
  }
}
/////////////////////////////////////////////// INSTAGRAM_BUSINESS_CONNECT_VALIDATION
export function instagramBusinessConnect2(params) {
  return apiAction({
    url: APIROUTE + `instagram/business/connect/2/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessInstagramBusinessConnectValidation,
    onFailure: onFailed,
    label: 'VALIDATE_INSTAGRAM_BUSINESS_CONNECT',
    requireErrorMessage: true
  });
}
function onSuccessInstagramBusinessConnectValidation(data) {
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// GET-INSTAGRAM-PUBLICATIONS-ACTION
export function getInstagramPublications() {
  return apiAction({
    url: APIROUTE + `instagram/publication/search/`,
    method: 'GET',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetInstagramPublications,
    onFailure: onFailed,
    label: 'GET_INSTAGRAM_PUBLICATIONS'
  });
}
function onSuccessGetInstagramPublications(data) {
  return {
    type: 'SET_INSTAGRAM_PUBLICATIONS',
    data: data.publication
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