const initialFeedState = {
    facebookPages: [],
    facebookPublications: []
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
        default:
            return state
    }
}

export default Social