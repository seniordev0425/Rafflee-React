import { combineReducers } from 'redux';
import userInfo from './userInfo'
import campaign from './campaign'
import homepage from './homepage'
import analytics from './analytics'
import social from './social'
import adminCampaign from './admin/campaign'
import adminCompany from './admin/company'
import adminMessage from './admin/message'

const AppReducer = combineReducers({
  userInfo,
  campaign,
  homepage,
  analytics,
  social,
  adminCampaign,
  adminCompany,
  adminMessage
})

export default AppReducer