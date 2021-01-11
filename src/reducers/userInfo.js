const initialFeedState = {

  ///////////////////////////////////////////// This state is a token of account
  token: '',

  ///////////////////////////////////////////// This state is a company status of account
  company: false,

  ///////////////////////////////////////////// This state is a admin status of account
  is_admin: false,

  ///////////////////////////////////////////// This state is an ip address of device
  ip: '1.1.1.1',

  ///////////////////////////////////////////// This state is a profile data of common user account
  userProfile: {
    address: '',
    prefix_number: '',
    national_number: '',
    email: '',
    city: '',
    country_name: '',
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
    instagram_business: false,
    facebook: false,
    youtube: false,
    username: '',
    email_verified: false,
    points: 0
  },

  phone_number_verified: false,

  ///////////////////////////////////////////// This state is a profile data of company account
  companyProfile: {
    city: '',
    prefix_number: '',
    national_number: '',
    address: '',
    company_name: '',
    country_name: '',
    country_code: '',
    region: '',
    logo: '',
    email: '',
    twitter: false,
    twitch: false,
    snapchat: false,
    instagram: false,
    instagram_business: false,
    facebook: false,
    youtube_business: false,
    username: '',
    email_verified: false
  },

  ///////////////////////////////////////////// This state is a profile data of admin account
  adminProfile: {
    email: '',
    profile_picture: '',
    username: '',
    email_verified: false
  },

  ///////////////////////////////////////////// This state is an inventory array of common user account which is displayed in inventory page
  userInventory: [],

  ///////////////////////////////////////////// This state is a participation record array of common user account which is displayed in participation history page
  userParticipationHistory: [],

  ///////////////////////////////////////////// This state is a in progress campaign array of common user account which is displayed in progress page
  userInProgress: [],

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
  youtube_oauth_url: '',

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
  twitchDirectConnect: false,
  youtubeDirectConnect: false,
  instagramDirectConnect: false,

  ///////////////////////////////////////////// This state is used in section wall of account settings page
  wallSetting: {
    twitter: false,
    instagram: false,
    facebook: {}
  },

  ///////////////////////////////////////////// This state is used to check available username in account page
  usernameCheckedStatus: true
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
        company: action.data.company,
        is_admin: action.data.is_admin
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
        userProfile: { ...state.userProfile, phone_number_verification: true },
        VERIFY_PHONE_NUMBER_SUCCESS: action.flag
      }
    case 'SET_USER_INVENTORY':
      return {
        ...state,
        userInventory: action.data
      }
    case 'SET_PARTICIPATION_HISTORY':
      return {
        ...state,
        userParticipationHistory: action.data
      }
    case 'SET_USER_IN_PROGRESS':
      return {
        ...state,
        userInProgress: action.data
      }
    case 'SET_FOLLOWING_CAMPAIGNS':
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
      else if (action.arrname === 'in_progress') {
        return {
          ...state,
          userInProgress: state.userInProgress.map(promotion => promotion.pk === action.id ?
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
      break
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
    case 'SET_YOUTUBE_OAUTH_URL':
      return {
        ...state,
        youtube_oauth_url: action.data
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
    case 'UPDATE_COMPANY_LOGO':
      return {
        ...state,
        companyProfile: { ...state.companyProfile, logo: action.data }
      }
    case 'UPDATE_COMPANY_USERNAME':
      return {
        ...state,
        companyProfile: { ...state.companyProfile, username: action.data }
      }
    case 'UPDATE_USER_PICTURE':
      return {
        ...state,
        userProfile: { ...state.userProfile, profile_picture: action.data }
      }
    case 'UPDATE_USER_USERNAME':
      return {
        ...state,
        userProfile: { ...state.userProfile, username: action.data }
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
    case 'TWITCH_DIRECT_CONNECT':
      return {
        ...state,
        twitchDirectConnect: action.data
      }
    case 'YOUTUBE_DIRECT_CONNECT':
      return {
        ...state,
        youtubeDirectConnect: action.data
      }
    case 'INSTAGRAM_DIRECT_CONNECT':
      return {
        ...state,
        instagramDirectConnect: action.data
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
    case 'SET_USER_INSTAGRAM_BUSINESS_CONNECT':
      if (action.company) {
        return {
          ...state,
          companyProfile: { ...state.companyProfile, instagram_business: action.data }
        }
      } else {
        return {
          ...state,
          userProfile: { ...state.userProfile, instagram_business: action.data }
        }
      }
    case 'SET_WALL_SETTING':
      return {
        ...state,
        wallSetting: action.data
      }
    case 'SET_USER_NAME_CHECKED_STATUS':
      return {
        ...state,
        usernameCheckedStatus: action.data
      }
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.data
      }
    case 'UPDATE_EMAIL':
      if (action.isCompany) {
        return {
          ...state,
          companyProfile: { ...state.companyProfile, email_verified: false, email: action.newEmail }
        }
      } else {
        return {
          ...state,
          userProfile: { ...state.userProfile, email_verified: false, email: action.newEmail }
        }
      }
    default:
      return state
  }
}

export default UserInfo;