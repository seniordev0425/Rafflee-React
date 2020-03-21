const initialFeedState = {
    campaignData: {
        pk: '',
        categories: null,
        winnings: null,
        release_date: '',
        type_of_promotion: '',
        description: '',
        campaign_name: '',
        number_of_eligible_people: '',
        end_date: '',
        favorite: false,
        campaign_image: '',
        poll: {},
        social_action: []
    },
    participants: [],
    campaignWinnings: [],
    winnerArr: [],
    TOGGLE_WINNERS_MODAL: false,
    
}

function Campaign(state = initialFeedState, action){
    switch(action.type){
        case 'GET_CAMPAIGN_DATA_SUCCESS': 
            return {
                ...state,
                campaignData: action.data
            }
        case 'UPDATE_CAMPAIGN_DETAIL_FAVORITE_SUCCESS':
            return {
                ...state,
                campaignData: {...state.campaignData, favorite: !state.campaignData.favorite}
            }
        case 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS':
            return {
                ...state,
                participants: action.data
            }
        case 'GET_CAMPAIGN_WINNINGS_SUCCESS':
            return {
                ...state,
                campaignWinnings: action.data
            }
        case 'DRAW_CAMPAIGN_SUCCESS':
            return {
                ...state,
                winnerArr: action.data,
                TOGGLE_WINNERS_MODAL: action.flag
            }
        case 'DRAW_CAMPAIGN_FAILED':
            return {
                ...state,
                campaignWinnings: state.campaignWinnings.filter((item) => item.name !== action.data)
            }
        default:
            return state
    }
}

export default Campaign;