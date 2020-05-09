const initialFeedState = {
    token: '',
    company: false,
    myInfo: null,
    isLoading: false,
    ip: '1.1.1.1',

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
        twitch: false
    },

    phone_number_verified: false,

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
        twitch: false
    },

    signUpSuccess: false,
    userInventory: [],
    userParticipationHistory: [],
    myFollowing: [],
    myFavoriteCompanies: [],
    companyWall: {},
    myCampaigns: [],
    myBills: [],
    pdfInvoice: '',
    companyInformation: {
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
    twitter_oauth_token: '',
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
        case 'API_ERROR':
            return {
                ...state
            }
        case 'API_FAILED':
            return {
                ...state
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
        case 'SIGN_UP_SUCCESS':
            return {
                ...state,
                signUpSuccess: action.data
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
        default:
            return state
    }
}

export default UserInfo;