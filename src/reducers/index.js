import { combineReducers } from 'redux';
import userInfo from './userInfo'
import campaign from './campaign'
import homepage from './homepage'

const AppReducer = combineReducers({
    userInfo,
    campaign,
    homepage
});



export default AppReducer;