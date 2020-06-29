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
/////////////////////////////////////////////// GET_ALL_PROMOTIONS_ACTION
export function getAllPromotions(params) {
    return apiAction({
        url: APIROUTE + "campaign/all-campaigns/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessGetAllPromotions,
        onFailure: onFailed,
        label: 'GET_ALL_PROMOTIONS_SUCCESS',
    });
}
function onSuccessGetAllPromotions(data) {
    return {
        type: 'GET_ALL_PROMOTIONS_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// GET_HOT_PROMOTIONS_ACTION
export function getHotPromotions(params) {
    return apiAction({
        url: APIROUTE + "homepage/hot/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessGetHotPromotions,
        onFailure: onFailed,
        label: 'GET_HOT_PROMOTIONS_SUCCESS',
    });
}
function onSuccessGetHotPromotions(data) {
    return {
        type: 'GET_HOT_PROMOTIONS_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// GET_HIGHLIGHTED_PROMOTIONS_ACTION
export function getHighlightedPromotions(params) {
    return apiAction({
        url: APIROUTE + "homepage/highlights/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessGetHighlightedPromotions,
        onFailure: onFailed,
        label: 'GET_HIGHLIGHTED_PROMOTIONS_SUCCESS',
    });
}
function onSuccessGetHighlightedPromotions(data) {
    return {
        type: 'GET_HIGHLIGHTED_PROMOTIONS_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// GET_NEW_PROMOTIONS_ACTION
export function getNewPromotions(params) {
    return apiAction({
        url: APIROUTE + "homepage/new/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessGetNewPromotions,
        onFailure: onFailed,
        label: 'GET_NEW_PROMOTIONS_SUCCESS',
    });
}
function onSuccessGetNewPromotions(data) {
    return {
        type: 'GET_NEW_PROMOTIONS_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// GET_BEST_PROMOTIONS_ACTION
export function getBestPromotions(params) {
    return apiAction({
        url: APIROUTE + "homepage/end-soon/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessGetBestPromotions,
        onFailure: onFailed,
        label: 'GET_BEST_PROMOTIONS_SUCCESS',
    });
}
function onSuccessGetBestPromotions(data) {
    return {
        type: 'GET_BEST_PROMOTIONS_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// UPDATE_FAVORITE_ACTION
export function updateFavorite(params, name) {
    return apiAction({
        url: APIROUTE + "favorites/update/campaign/",
        method: 'POST',
        data: qs.stringify(params),
        accessToken: sessionStorage.getItem('token'),
        onSuccess: (data) => onSuccessUpdateFavorite(data, name),
        onFailure: onFailed,
        label: 'UPDATE_FAVORITE_SUCCESS',
    });
}
function onSuccessUpdateFavorite(data, name) {
    return {
        type: 'UPDATE_FAVORITE_SUCCESS',
        arrname: name,
        id: data.promotion_id
    }
}
/////////////////////////////////////////////// GET_CATEGORIES_ACTION
export function getCategories() {
    return apiAction({
        url: APIROUTE + "categories/",
        onSuccess: onSuccessGetCategories,
        onFailure: onFailed,
        label: 'GET_CATEGORIES',
    });
}
function onSuccessGetCategories(data) {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        data: data.result_data
    }
}
/////////////////////////////////////////////// GET_CATEGORIES_ACTION
export function betaReport(params) {
    return apiAction({
        url: APIROUTE + "beta/report/",
        method: 'POST',
        data: qs.stringify(params),
        onSuccess: onSuccessBetaReport,
        onFailure: onFailed,
        label: 'BETA_REPORT',
        requireErrorMessage: true
    });
}
function onSuccessBetaReport(data) {
    openNotification('success', successMessages[localStorage.getItem('i18nextLng')].success)
    return {
        type: '',
        data: ''
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