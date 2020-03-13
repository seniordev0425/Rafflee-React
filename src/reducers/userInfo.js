const initialFeedState = {
    token: '',
    company: false,
    myInfo: null,
    isLoading: false,

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
        region: ''
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
        email: ''
    },

    signUpSuccess: false,
    userInventory: [],
    userParticipationHistory: [],
    myFollowing: [],
    myCampaigns: [],
    myBills: [],
    
}

function UserInfo(state = initialFeedState, action){
    switch(action.type){
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
                [action.name]: action.data
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
                myFollowing: action.data
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
        case 'UPDATE_DASHBOARD_FAVORITE_SUCCESS':
            if (action.arrname === 'inventory') {
                return {
                    ...state,
                    userInventory: state.userInventory.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    ),
                    myFollowing: action.result === 'FAVORITE_ADDED' ? [...state.myFollowing, {id: 10}] : state.myFollowing.filter((_, i) => i !== state.myFollowing.length - 1)
                }
            }
            else if (action.arrname === 'participation_history') {
                return {
                    ...state,
                    userParticipationHistory: state.userParticipationHistory.map(promotion => promotion.pk === action.id ?
                        {...promotion, favorite: !promotion.favorite} : promotion
                    ),
                    myFollowing: action.result === 'FAVORITE_ADDED' ? [...state.myFollowing, {id: 10}] : state.myFollowing.filter((_, i) => i !== state.myFollowing.length - 1)
                }
            }
            else if (action.arrname === 'following') {
                return {
                    ...state,
                    myFollowing: state.myFollowing.filter((promotion) => promotion.id !== action.id)
                }
            }
        
        default:
            return state
    }
}

export default UserInfo;