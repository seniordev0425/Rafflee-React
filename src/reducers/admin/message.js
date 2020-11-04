const initialFeedState = {
  companyFormData: {
    max_page: 0,
    messages: [],
    nbr_of_messages: 0
  },
  homepageFormData: {
    max_page: 0,
    messages: [],
    nbr_of_messages: 0
  },
  reportFormData: {
    max_page: 0,
    messages: [],
    nbr_of_messages: 0
  }
}

function Message(state = initialFeedState, action) {
  switch (action.type) {
    case 'SET_ADMIN_COMPANY_MESSAGES':
      return {
        ...state,
        companyFormData: action.data
      }
    case 'SET_ADMIN_HOMEPAGE_MESSAGES':
      return {
        ...state,
        homepageFormData: action.data
      }
    case 'SET_ADMIN_REPORT_MESSAGES':
      return {
        ...state,
        reportFormData: action.data
      }
    case 'READ_ADMIN_COMPANY_MESSAGES':
      return {
        ...state,
        companyFormData: {
          ...state.companyFormData,
          messages: state.companyFormData.messages.map(message => message.pk === action.pk ? { ...message, read: true } : message)
        }
      }
    case 'READ_ADMIN_HOMEPAGE_MESSAGES':
      return {
        ...state,
        homepageFormData: {
          ...state.homepageFormData,
          messages: state.homepageFormData.messages.map(message => message.pk === action.pk ? { ...message, read: true } : message)
        }
      }
    case 'READ_ADMIN_REPORT_MESSAGES':
      return {
        ...state,
        reportFormData: {
          ...state.reportFormData,
          messages: state.reportFormData.messages.map(message => message.pk === action.pk ? { ...message, read: true } : message)
        }
      }
    default:
      return state
  }
}

export default Message