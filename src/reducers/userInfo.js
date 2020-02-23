const initialFeedState = {
    myInfo: null,
    token: null
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
        default:
            return state
    }
}

export default UserInfo;