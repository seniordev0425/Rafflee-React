const initialFeedState = {
  companies: []
}

function Company(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_ADMIN_COMPANY_LIST':
      return {
        ...state,
        companies: action.data
      }
    
    default:
      return state
  }
}

export default Company