const initialFeedState = {

  ///////////////////////////////////////////// Campaign data in campaign detail page
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
    favorite: false,
    campaign_image: '',
    poll: {},
    action_participate: [],
    user_actions: []
  },

  ///////////////////////////////////////////// This state is participants array of campaign which is used in live page or participants page of company account
  participants: [],     
  
  ///////////////////////////////////////////// This state is campaign prizes array of campaign which is used in live page of company account 
  campaignWinnings: [],                           

  ///////////////////////////////////////////// This state is winner array of campaign which is displayed in congratulation modal 
  winnerArr: [],


  TOGGLE_WINNERS_MODAL: false,
  
  ///////////////////////////////////////////// This state is created campaign id which is used in result section of create campaign page
  created_promotion_id: '',

  ///////////////////////////////////////////// This state is prize data which is displayed when click on prizes in campaign detail page
  winningData: {
    name: '',
    number_of_eligible_people: '',
    description: '',
    image_url: ''
  }
}

function Campaign(state = initialFeedState, action) {
  switch (action.type) {
    case 'GET_CAMPAIGN_DATA_SUCCESS':
      return {
        ...state,
        campaignData: action.data
      }
    case 'UPDATE_CAMPAIGN_DETAIL_FAVORITE_SUCCESS':
      return {
        ...state,
        campaignData: { ...state.campaignData, favorite: !state.campaignData.favorite }
      }
    case 'GET_CAMPAIGN_PARTICIPANTS_SUCCESS':
      return {
        ...state,
        participants: action.data
      }
    case 'GET_CAMPAIGN_WINNINGS_SUCCESS':
      return {
        ...state,
        campaignWinnings: action.data
      }
    case 'DRAW_CAMPAIGN_SUCCESS':
      return {
        ...state,
        winnerArr: action.data,
        TOGGLE_WINNERS_MODAL: action.flag
      }
    case 'DRAW_CAMPAIGN_FAILED':
      return {
        ...state,
        campaignWinnings: state.campaignWinnings.filter((item) => item.name !== action.data)
      }
    case 'CREATED_PROMOTION_ID':
      return {
        ...state,
        created_promotion_id: action.data
      }
    case 'SET_WINNING_DATA':
      return {
        ...state,
        winningData: action.data
      }
    default:
      return state
  }
}

export default Campaign;