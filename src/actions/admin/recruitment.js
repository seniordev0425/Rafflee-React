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
/////////////////////////////////////////////// ADMIN_GET_RECRUITMENT_TAGS_ACTION
export function getRecruitmentTags() {
  return apiAction({
    url: APIROUTE + 'admin/dashboard/recruitment/tags/',
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetRecruitmentTags,
    onFailure: onFailed,
    label: 'ADMIN_GET_RECRUITMENT_TAGS',
  });
}
function onSuccessGetRecruitmentTags(data) {
  return {
    type: 'SET_ADMIN_RECRUITMENT_TAGS',
    data: data.tags
  }
}
/////////////////////////////////////////////// ADMIN_RECRUITMENT_UPDATE_ACTION
export function updateRecruitment(params) {
  return apiAction({
    url: APIROUTE + 'admin/dashboard/recruitment/update/',
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessUpdateRecruitment,
    onFailure: onFailed,
    label: 'ADMIN_UPDATE_RECRUITMENT',
  });
}
function onSuccessUpdateRecruitment(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].updateRecruitment)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// ADMIN_RECRUITMENT_CREATE_ACTION
export function createRecruitment(params) {
  return apiAction({
    url: APIROUTE + 'admin/dashboard/recruitment/create/',
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessCreateRecruitment,
    onFailure: onFailed,
    label: 'ADMIN_CREATE_RECRUITMENT',
  });
}
function onSuccessCreateRecruitment(data) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].createRecruitment)
  return {
    type: '',
    data: ''
  }
}
/////////////////////////////////////////////// ADMIN_RECRUITMENT_TAG_CREATE_ACTION
export function createRecruitmentTag(params, tag) {
  return apiAction({
    url: APIROUTE + 'admin/dashboard/recruitment/tags/create/',
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessCreateRecruitmentTag(data, tag),
    onFailure: onFailed,
    label: 'ADMIN_CREATE_RECRUITMENT_TAG',
  });
}
function onSuccessCreateRecruitmentTag(data, tag) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].tagAdded)
  return {
    type: 'ADD_RECRUITMENT_TAG',
    tag: tag
  }
}
/////////////////////////////////////////////// ADMIN_CREATE_RECRUITMENT_TAG_ACTION
export function removeRecruitmentTag(params, tag) {
  return apiAction({
    url: APIROUTE + 'admin/dashboard/recruitment/tags/delete/',
    method: 'DELETE',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessRemoveRecruitmentTag(data, tag),
    onFailure: onFailed,
    label: 'ADMIN_REMOVE_RECRUITMENT_TAG',
  });
}
function onSuccessRemoveRecruitmentTag(data, tag) {
  openNotification('success', successMessages[localStorage.getItem('i18nextLng')].tagRemoved)
  return {
    type: 'REMOVE_RECRUITMENT_TAG',
    tag: tag
  }
}
/////////////////////////////////////////////// ADMIN_GET_RECRUITMENT_APPLIES_ACTION
export function getRecruitmentApplies(page) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/recruitment/apply/${page}/`,
    accessToken: localStorage.getItem('token'),
    onSuccess: onSuccessGetRecruitmentApplies,  
    onFailure: onFailed,
    label: 'ADMIN_GET_RECRUITMENT_APPLIES',
  });
}
function onSuccessGetRecruitmentApplies(data) {
  return {
    type: 'SET_ADMIN_RECRUITMENT_APPLIES',
    data: data
  }
}
/////////////////////////////////////////////// ADMIN_GET_RECRUITMENT_APPLIES_ACTION
export function readRecruitmentApply(params) {
  return apiAction({
    url: APIROUTE + `admin/dashboard/recruitment/apply/read/`,
    method: 'POST',
    data: qs.stringify(params),
    accessToken: localStorage.getItem('token'),
    onSuccess: (data) => onSuccessReadRecruitmentApply(params),  
    onFailure: onFailed,
    label: 'ADMIN_READ_RECRUITMENT_APPLY',
  });
}
function onSuccessReadRecruitmentApply(params) {
  return {
    type: 'READ_ADMIN_RECRUITMENT_APPLIES',
    pk: params.pk
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