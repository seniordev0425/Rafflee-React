import { APIROUTE } from '../utils/constants'
import { API } from "./types";
import { openNotification } from '../utils/notification'

const qs = require('querystring')

function onFailed(error) {
    openNotification('warning', error)
    return {
        type: 'API_FAILED',
        error: error
    }
}
/////////////////////////////////////////////// ANALYTICS-OVERVIEW-FOLLOWER-ACTION
export function overviewFollowers(time) {
    return apiAction({
        url: APIROUTE + `analytics/followers/${time}/`,
        method: 'GET',
        accessToken: sessionStorage.getItem('token'),
        onSuccess: (data) => onSuccessOverviewFollowers(data, time),
        onFailure: onFailed,
        label: `OVERVIEW_${time.toUpperCase()}_FOLLOWERS`,
    });
}
function onSuccessOverviewFollowers(data, time) {
    return {
        type: 'SET_OVERVIEW_FOLLOWERS',
        time: time,
        followers: data.result_data
    }
}
/////////////////////////////////////////////// ANALYTICS-GET-ACTIVE-GENDER-ACTION
export function getActiveGender(id) {
    return apiAction({
        url: APIROUTE + `analytics/gender/${id}/`,
        method: 'GET',
        accessToken: sessionStorage.getItem('token'),
        onSuccess: onSuccessGetActiveGender,
        onFailure: onFailed,
        label: `GET_ACTIVE_GENDER`,
    });
}
function onSuccessGetActiveGender(data) {
    return {
        type: 'SET_ACTIVE_GENDER',
        data: data
    }
}
/////////////////////////////////////////////// ANALYTICS-GET-DEMOGRAPHICS-ACTION
export function getDemographics(id, demographics_type) {
    return apiAction({
        url: APIROUTE + `analytics/map/${id}/${demographics_type}/`,
        method: 'GET',
        accessToken: sessionStorage.getItem('token'),
        onSuccess: (data) => onSuccessGetDemographics(data, id, demographics_type),
        onFailure: onFailed,
        label: `GET_DEMOGRAPHICS`,
    });
}
function onSuccessGetDemographics(data, id, demographics_type) {
    if (id === 'all') {
        return {
            type: 'SET_OVERRAL_DEMOGRAPHICS',
            demographics_type: demographics_type,
            data: data.datas
        }
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