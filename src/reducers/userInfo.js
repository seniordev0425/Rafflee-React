const initialFeedState = {

  ///////////////////////////////////////////// This state is a token of account
  token: '',

  ///////////////////////////////////////////// This state is a company status of account
  company: false,

  ///////////////////////////////////////////// This state is an ip address of device
  ip: '1.1.1.1',

  ///////////////////////////////////////////// This state is a profile data of common user account
  userProfile: {
    address: '',
    national_number: '',
    email: '',
    city: '',
    country: '',
    country_code: '',
    gender: '',
    profile_picture: '',
    birth_date: '',
    lastname: '',
    firstname: '',
    phone_number_verification: false,
    region: '',
    twitter: false,
    twitch: false,
    snapchat: false,
    instagram: false,
    facebook: false
  },

  phone_number_verified: false,

  ///////////////////////////////////////////// This state is a profile data of company account
  companyProfile: {
    city: '',
    national_number: '',
    address: '',
    company_name: '',
    country: '',
    region: '',
    logo: '',
    country_code: '',
    email: '',
    twitter: false,
    twitch: false,
    snapchat: false,
    instagram: false,
    facebook: false
  },

  ///////////////////////////////////////////// This state is an inventory array of common user account which is displayed in inventory page
  userInventory: [],

  ///////////////////////////////////////////// This state is a participation record array of common user account which is displayed in participation history page
  userParticipationHistory: [],

  ///////////////////////////////////////////// This state is a followed campaign array of common user account
  myFollowing: [],

  ///////////////////////////////////////////// This state is a followed company array of users
  myFavoriteCompanies: [],

  ///////////////////////////////////////////// This state is company social wall data
  companyWall: {},

  ///////////////////////////////////////////// This state is a campaigns array of company account
  myCampaigns: [],

  ///////////////////////////////////////////// This state is a bills array of company account
  myBills: [],


  pdfInvoice: '',
  
  ///////////////////////////////////////////// This state is a company information which is used in company page
  companyInformation: {
    company: {
      description: null,
      follow: false,
      youtube_channel: null,
      logo_url: null,
      twitter_page_url: null,
      number_of_follower: null,
      facebook_page_url: null,
      company_name: '',
      website_url: null,
      pk: null,
      instagram_page_url: null,
      type_of_account: '',
      member_since: '',
      certified: false
    },
    social_wall: {}
  },


  twitter_oauth_token: '',
  
  ///////////////////////////////////////////// This state is used when click on button 'ALREAY WON' in rafflee history page of common user account
  participationResult: {
    giveway_description: '',
    number_of_eligible_people: '',
    campaign_description: '',
    campaign_image: '',
    giveway_image_url: '',
    campaign_name: '',
    giveway_name: ''
  },


  tempActionData: null,
  twitterDirectConnect: false,

  ///////////////////////////////////////////// This state is used in section wall of account settings page
  wallSetting: {
    twitter: false,
    instagram: false,
    facebook: {}
  }
}

function UserInfo(state = initialFeedState, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return {
        ...state,
        [action.state]: action.data
      }
    case 'API_START':
      return {
        ...state,
        [action.payload]: true,

      };
    case 'API_END':
      return {
        ...state,
        [action.payload]: false
      };
    case 'API_SUCCESS':
      return {
        ...state,
        [action.payload]: true
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        AUTH_ERROR: true
      }
    case 'GET_USER_PROFILE_SUCCESS':
      return {
        ...state,
        userProfile: action.data,
        phone_number_verified: action.data.phone_number_verification
      }
    case 'GET_COMPANY_PROFILE_SUCCESS':
      return {
        ...state,
        companyProfile: action.data
      }
    case 'FETCH_IP_SUCCESS':
      return {
        ...state,
        ip: action.data
      }
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        token: action.data.token,
        company: action.data.company
      }
    case 'DELETE_ACCOUNT_SUCCESS':
      return {
        ...state,
        DELETE_ACCOUNT_SUCCESS: action.flag
      }
    case 'RESET_PASSWORD_REQUEST_SUCCESS':
      return {
        ...state,
        RESET_PASSWORD_REQUEST_SUCCESS: action.flag
      }
    case 'RESET_PASSWORD_SUCCESS':
      return {
        ...state,
        RESET_PASSWORD_SUCCESS: action.flag
      }
    case 'VERIFY_PHONE_NUMBER_SUCCESS':
      return {
        ...state,
        phone_number_verified: true,
        VERIFY_PHONE_NUMBER_SUCCESS: action.flag
      }
    case 'GET_USER_INVENTORY_SUCCESS':
      return {
        ...state,
        userInventory: action.data
      }
    case 'GET_PARTICIPATION_HISTORY_SUCCESS':
      return {
        ...state,
        userParticipationHistory: action.data
      }
    case 'GET_FOLLOWING_SUCCESS':
      return {
        ...state,
        myFollowing: (action.data || [])
      }
    case 'SET_MY_FAVORITE_COMPANIES':
      return {
        ...state,
        myFavoriteCompanies: action.data
      }
    case 'SET_COMPANY_WALL':
      return {
        ...state,
        companyWall: action.data
      }
    case 'GET_MY_CAMPAIGNS_SUCCESS':
      return {
        ...state,
        myCampaigns: action.data
      }
    case 'GET_MY_BILLS_SUCCESS':
      return {
        ...state,
        myBills: action.data
      }
    case 'SET_PDF_INVOICE':
      return {
        ...state,
        pdfInvoice: action.data
      }
    case 'UPDATE_DASHBOARD_FAVORITE_SUCCESS':
      if (action.arrname === 'inventory') {
        return {
          ...state,
          userInventory: state.userInventory.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          ),
          myFollowing: action.result === 'MSG_FAVORITE_ADDED' ? [...state.myFollowing, { id: 10 }] : state.myFollowing.filter((_, i) => i !== state.myFollowing.length - 1)
        }
      }
      else if (action.arrname === 'participation_history') {
        return {
          ...state,
          userParticipationHistory: state.userParticipationHistory.map(promotion => promotion.pk === action.id ?
            { ...promotion, favorite: !promotion.favorite } : promotion
          ),
          myFollowing: action.result === 'MSG_FAVORITE_ADDED' ? [...state.myFollowing, { id: 10 }] : state.myFollowing.filter((_, i) => i !== state.myFollowing.length - 1)
        }
      }
      else if (action.arrname === 'following') {
        return {
          ...state,
          myFollowing: state.myFollowing.filter((promotion) => promotion.promotion_id !== action.id)
        }
      }
    case 'SET_COMPANY_INFORMATION':
      return {
        ...state,
        companyInformation: action.data
      }
    case 'SET_TWITTER_OAUTH_TOKEN':
      return {
        ...state,
        twitter_oauth_token: action.data
      }
    case 'SET_PARTICIPATION_RESULT':
      return {
        ...state,
        participationResult: action.data
      }
    case 'SET_ACTION_FILED_STATUS': {
      return {
        ...state,
        [action.name]: true
      }
    }
    case 'SET_TEMP_ACTION_DATA':
      return {
        ...state,
        tempActionData: action.data,
        [action.openModalName]: true
      }
    case 'SET_ACTION_VALIDATION_STATUS':
      return {
        ...state,
        [action.data]: true
      }
    case 'UPDATE_COMPANY_LOGO':
      return {
        ...state,
        companyProfile: { ...state.companyProfile, logo: action.data }
      }
    case 'UPDATE_USER_PICTURE':
      return {
        ...state,
        userProfile: { ...state.userProfile, profile_picture: action.data }
      }
    case 'SET_COMPANY_FOLLOW_VALUE':
      return {
        ...state,
        companyInformation: { ...state.companyInformation, company: { ...state.companyInformation.company, follow: action.data } }
      }
    case 'TWITTER_DIRECT_CONNECT':
      return {
        ...state,
        twitterDirectConnect: action.data
      }
    case 'UPDATE_MYCAMPAIGN_ENDDATE':
      return {
        ...state,
        myCampaigns: state.myCampaigns.map(promotion => promotion.pk === action.data.promotion_id ?
          { ...promotion, end_date: `${action.data.end_date}Z` } : promotion
        )
      }
    case 'SET_USER_FACEBOOK_CONNECT':
      if (action.company) {
        return {
          ...state,
          companyProfile: { ...state.companyProfile, facebook: action.data }
        }
      } else {
        return {
          ...state,
          userProfile: { ...state.userProfile, facebook: action.data }
        }
      }
    case 'SET_WALL_SETTING':
      return {
        ...state,
        wallSetting: action.data
      }
    default:
      return state
  }
}

export default UserInfo;