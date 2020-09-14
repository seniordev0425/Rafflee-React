import { combineReducers } from 'redux';
import userInfo from './userInfo'
import campaign from './campaign'
import homepage from './homepage'
import analytics from './analytics'
import social from './social'
import adminCampaign from './admin/campaign'

const AppReducer = combineReducers({
  userInfo,
  campaign,
  homepage,
  analytics,
  social,
  adminCampaign
})

export default AppReducer