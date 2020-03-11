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
        favorite: false
    }
    
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
        default:
            return state
    }
}

export default Campaign;