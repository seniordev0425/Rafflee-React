const initialFeedState = {
    facebookPages: [],
    facebookPublications: [],
    instagramBusinessPages: []
}

function Social(state = initialFeedState, action) {
    switch (action.type) {
        case 'SET_FACEBOOK_PAGES':
            return {
                ...state,
                facebookPages: action.data
            }
        case 'SET_FACEBOOK_PUBLICATIONS':
            return {
                ...state,
                facebookPublications: action.data
            }
        case 'SET_INSTAGRAM_BUSINESS_PAGES':
            return {
                ...state,
                instagramBusinessPages: action.data
            }
        default:
            return state
    }
}

export default Social