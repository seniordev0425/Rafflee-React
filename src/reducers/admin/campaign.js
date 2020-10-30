const initialFeedState = {
  campaignData: {
    max_page: 0,
    promotions: [],
    nbr_of_promotions: 0
  }
}

function Campaign(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_ADMIN_CAMPAIGNS':
      return {
        ...state,
        campaignData: action.data
      }
    
    default:
      return state
  }
}

export default Campaign