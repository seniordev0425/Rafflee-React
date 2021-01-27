const initialFeedState = {
  ///////////////////////////////////////////// This state is an available facebook pages of account
  facebookPages: [],

  ///////////////////////////////////////////// This state is an available publications depend on facebook pages
  facebookPublications: [],

  ///////////////////////////////////////////// This state is an available instagram pages of account
  instagramBusinessPages: [],
  instagramPublications: []
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
    case 'SET_INSTAGRAM_PUBLICATIONS':
      return {
        ...state,
        instagramPublications: action.data
      }
    default:
      return state
  }
}

export default Social