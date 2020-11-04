const initialFeedState = {
  tags: [],
  appliesData: {
    request_job: [],
    nbr_of_apply_job: 0
  }
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
    case 'SET_ADMIN_RECRUITMENT_APPLIES':
      return {
        ...state,
        appliesData: action.data
      }
    case 'READ_ADMIN_RECRUITMENT_APPLIES':
      return {
        ...state,
        appliesData: {
          ...state.appliesData,
          request_job: state.appliesData.request_job.map(request => request.pk === action.pk ? { ...request, read: true } : request)
        }
      }
    default:
      return state
  }
}

export default Recruitment