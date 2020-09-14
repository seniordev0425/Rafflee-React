const initialFeedState = {
  tempCampaigns: []
}

function Campaign(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_ADMIN_TEMP_CAMPAIGNS_IN_DASHBOARD':
      return {
        ...state,
        tempCampaigns: action.data
      }
    
    default:
      return state
  }
}

export default Campaign