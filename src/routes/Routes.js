import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import Home from '../screens/Home'
import About from '../screens/About'
import Deals from '../screens/Deals'
import UserAccount from '../screens/UserAccount'
import Dashboard from '../screens/Dashboard'
import MyCircle from '../screens/MyCircle'
import CampaignDetail from '../screens/CampaignDetail'
import ProfileActivated from '../screens/ProfileActivated'
import ActivateEmail from '../screens/ActivateEmail'
import ResetPassword from '../screens/ResetPassword'
import SearchResult from '../screens/SearchResult'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import GeneralConditions from '../screens/GeneralConditions'
import Report from '../screens/Report'
import FAQ from '../screens/FAQ'
import Careers from '../screens/Careers'
import Influencer from '../screens/Influencer'
import CompanyPage from '../screens/CompanyPage'
import ParticipationResult from '../screens/ParticipationResult'
import TwitterAuthPage from '../screens/SocialAuth/TwitterAuthPage'
import TwitchAuthPage from '../screens/SocialAuth/TwitchAuthPage'
import InstagramAuthPage from '../screens/SocialAuth/InstagramAuthPage'

import LoadingPage from '../components/common/LoadingPage'
import ScrollToTop from '../components/common/ScrollToTop'
import InProgress from '../screens/InProgress'
import NotFound from '../components/common/NotFound'

import AdminRoutes from './AdminRoutes'

import { openNotification } from '../utils/notification'

import { verifyToken } from '../apis/apiCalls'
import { getUserProfile, getCompanyProfile } from '../actions/userInfo'
import { IP_ADDRESS_API } from '../utils/constants'

import { useTranslation } from 'react-i18next'

function Routes(props) {
  const { t } = useTranslation()

  const { history } = props

  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)
  const is_admin = useSelector(state => state.userInfo.is_admin)

  const AUTH_ERROR = useSelector(state => state.userInfo.AUTH_ERROR)

  const dispatch = useDispatch()

  const [authLoading, setAuthLoading] = useState(true)
  const [isFetchingIP, setIsFethingIP] = useState(false)

  const [online, setOnline] = useState(navigator.onLine)

  const handleOnline = () => setOnline(navigator.onLine)
  const handleOffline = () => setOnline(navigator.onLine)

  useEffect(() => {
    if (token) {
      if (company) {
        dispatch(getCompanyProfile())
      } else {
        dispatch(getUserProfile())
      }
    }
  }, [token])

  useEffect(() => {
    setIsFethingIP(true)
    // Fetch device ip address
    fetch(IP_ADDRESS_API, { method: 'GET', headers: {} })
      .then(response => {
        return response.text()
      })
      .then(ip => {
        setIsFethingIP(false)
        dispatch({ type: 'FETCH_IP_SUCCESS', data: ip })
      })
      .catch(error => setIsFethingIP(false))

    // Check whether online or offline
    const _handleOnline = handleOnline
    const _handleOffline = handleOffline
    // Add 2 listeners
    window.addEventListener('online', _handleOnline)
    window.addEventListener('offline', _handleOffline)


    // Load remember token
    const rememberToken = localStorage.getItem('token')
    const rememberCompany = localStorage.getItem('company')
    const rememberAdmin = localStorage.getItem('is_admin')

    if (!rememberToken) {
      return
    }

    if (rememberToken) { // if remember token which is in localstorage exists then verify this token. If success keep this token and put it into session storage
      verifyToken(rememberToken)
        .then(response => response.text())
        .then(result => {
          var json_rlt = JSON.parse(result)
          if (json_rlt.token) {
            dispatch({
              type: "LOG_IN_SUCCESS",
              data: {
                token: rememberToken,
                company: rememberCompany === 'true',
                is_admin: rememberAdmin === 'true'
              }
            })
          }
          else {
            localStorage.removeItem('token')
            localStorage.removeItem('company')
            history.push('/')
          }
          setAuthLoading(false)
        })
        .catch(error => {
          localStorage.removeItem('token')
          localStorage.removeItem('company')
          setAuthLoading(false)
        });
    }

    // Remove listeners when component will unmount
    return () => {
      window.removeEventListener('online', _handleOnline)
      window.removeEventListener('offline', _handleOffline)
    };
  }, [])

  useEffect(() => {
    // if 401 error occurs then redirect to home page and remove tokens
    if (AUTH_ERROR) {
      history.push('/')
      dispatch({ type: 'INIT_STATE', state: 'AUTH_ERROR', data: false })
      dispatch({ type: "LOG_IN_SUCCESS", data: { token: '', company: false } })
      localStorage.removeItem('token')
      localStorage.removeItem('company')
    }
  }, [AUTH_ERROR])

  if ((authLoading && localStorage.getItem('token') && !token) || isFetchingIP) {
    return <LoadingPage />
  }

  return (
    <ScrollToTop>
      { // Show this notification if user is not online
        !online && openNotification('warning', 'No internet connection detected. Make sure Wi-Fi or mobile data is turned on, then try again.')
      }
      <Switch>
        {is_admin && <Redirect exact from="/" to="/admin" />}
        {is_admin && <Route path="/admin" component={AdminRoutes} />}

        {!is_admin && <Redirect from="/admin" to="/" />}
        {!is_admin && <Route exact path="/" component={Home} />}
        
        <Route exact path="/campaign-detail/:id" component={CampaignDetail} />
        <Route exact path="/deals" component={Deals} />
        <Route exact path="/profile/activate/:id/:token" component={ProfileActivated} />
        <Route exact path="/profile/email/activate/:id/:token" component={ActivateEmail} />
        <Route exact path="/reset-password/:token/:id" component={ResetPassword} />
        <Route exact path="/search-result" component={SearchResult} />
        <Route exact path="/company/:id" component={CompanyPage} />
        <Route exact path="/twitter/login/callback/" component={TwitterAuthPage} />
        <Route exact path="/twitch/connect/" component={TwitchAuthPage} />
        <Route exact path="/instagram/connect/" component={InstagramAuthPage} />
        <Route exact path="/participation-result/:id" component={ParticipationResult} />
        <Route exact path="/report" component={Report} />
        <Route exact path="/general-conditions" component={GeneralConditions} />
        <Route exact path="/privacy-policy" component={PrivacyPolicy} />
        <Route exact path="/faq" component={FAQ} />
        <Route exact path="/careers/:menu" component={Careers} />
        <Route exact path="/about" component={About} />
        <Route exact path="/influencer" component={Influencer} />

        {(token && !is_admin) &&
          <Route exact path="/user-account/:menu" component={UserAccount} />
        }
        {(token && !is_admin) &&
          <Route exact path="/dashboard/:menu" component={Dashboard} />
        }
        {(token && !is_admin) &&
          <Route exact path="/my-circle" component={MyCircle} />
        }
        {(!token && !is_admin) &&
          <Redirect exact from="/user-account/:menu" to="/" />
        }
        {(!token && !is_admin) &&
          <Redirect exact from="/dashboard/:menu" to="/" />
        }
        {(!token && !is_admin) &&
          <Redirect exact from="/my-circle" to="/" />
        }

        <Route exact path="/in-progress" component={InProgress} />
        <Route component={NotFound} />
      </Switch>

      <CookieConsent // Cookie bar
        style={{ justifyContent: "center", background: "#7778edd9" }}
        contentStyle={{ flex: null, textAlign: "center" }}
        buttonText={t('button_group.accept')}
        buttonStyle={{ background: "#0091ff", color: "white", borderRadius: 3, margin: 0 }}
        enableDeclineButton={true}
        flipButtons
        declineButtonText={t('button_group.decline')}
        declineButtonStyle={{ background: "#f01212", borderRadius: 3, margin: 0, marginLeft: 15 }}
      >
        This site uses cookies, by continuing to use the service, you accept our Cookie Policy
      </CookieConsent>
    </ScrollToTop>
  )
}

export default withRouter(Routes)
