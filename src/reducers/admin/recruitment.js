const initialFeedState = {
  tags: []
}

function Recruitment(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_ADMIN_RECRUITMENT_TAGS':
      return {
        ...state,
        tags: action.data
      }
    case 'ADD_RECRUITMENT_TAG':
      return {
        ...state,
        tags: [...state.tags, action.tag]
      }
    case 'REMOVE_RECRUITMENT_TAG':
      return {
        ...state,
        tags: state.tags.filter(tag => tag !== action.tag)
      }
    default:
      return state
  }
}

export default Recruitment