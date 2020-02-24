const initialFeedState = {
    myInfo: null,   //account information. object
    token: null,    //token information. string
    company: false  //is company?
}

function UserInfo(state = initialFeedState, action){
    switch(action.type){
        case 'setMyInfo':
            return {
                ...state,
                myInfo: action.data
            }
        case 'setToken':
            return {
                ...state,
                token: action.data
            }
        case 'setCompany':
            return {
                ...state,
                company: action.data
            }
        default:
            return state
    }
}

export default UserInfo;