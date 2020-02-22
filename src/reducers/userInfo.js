const initialFeedState = {
    myInfo: null
}

function UserInfo(state = initialFeedState, action){
    switch(action.type){
        case 'setMyInfo':
            return {
                ...state,
                myInfo: action.data
            }
        default:
            return state
    }
}

export default UserInfo;