const initialFeedState = {
    overviewDayFollowers: [],
    overviewWeekFollowers: [],
    overviewMonthFollowers: [],
    overviewYearFollowers: [],
    activeGender: {
        unknow: 0,
        female_percentage: 0,
        male: 0,
        male_percentage: 0,
        unknow_percentage: 0,
        female: 0
    },
    overralActionDemographics: [],
    overralParitipationDemographics: [],
    campaignsInformations: []
}

function Analytics(state = initialFeedState, action) {
    switch (action.type) {
        case 'SET_OVERVIEW_FOLLOWERS':
            if (action.time === 'day') {
                return {
                    ...state,
                    overviewDayFollowers: action.followers
                }
            } else if (action.time === 'week') {
                return {
                    ...state,
                    overviewWeekFollowers: action.followers
                }
            } else if (action.time === 'month') {
                return {
                    ...state,
                    overviewMonthFollowers: action.followers
                }
            } else if (action.time === 'year') {
                return {
                    ...state,
                    overviewYearFollowers: action.followers
                }
            }
        case 'SET_ACTIVE_GENDER':
            return {
                ...state,
                activeGender: action.data
            }
        case 'SET_OVERRAL_DEMOGRAPHICS':
            if (action.demographics_type === 'action') {
                return {
                    ...state,
                    overralActionDemographics: action.data
                }
            } else {
                return {
                    ...state,
                    overralParitipationDemographics: action.data
                }
            }
        case 'SET_CAMPAIGNS_INFORMATIONS':
            return {
                ...state,
                campaignsInformations: action.data
            }
        default:
            return state
    }
}

export default Analytics;