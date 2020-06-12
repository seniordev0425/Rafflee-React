import { combineReducers } from 'redux';
import userInfo from './userInfo'
import campaign from './campaign'
import homepage from './homepage'
import analytics from './analytics'

const AppReducer = combineReducers({
    userInfo,
    campaign,
    homepage,
    analytics
});



export default AppReducer;