import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { connect, useSelector } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import CookieConsent from 'react-cookie-consent'
import Home from '../screens/Home'
import Deals from '../screens/Deals'
import UserAccount from '../screens/UserAccount'
import Dashboard from '../screens/Dashboard'
import CampaignDetail from '../screens/CampaignDetail'
import ProfileActivated from '../screens/ProfileActivated'
import ResetPassword from '../screens/ResetPassword'
import SearchResult from '../screens/SearchResult'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import GeneralConditions from '../screens/GeneralConditions'
import CompanyPage from '../screens/CompanyPage'
import ParticipationResult from '../screens/ParticipationResult'
import TwitterAuthPage from '../screens/SocialAuth/TwitterAuthPage'
import TwitchAuthPage from '../screens/SocialAuth/TwitchAuthPage'

import Loading from '../components/common/Loading'
import ScrollToTop from '../components/common/ScrollToTop'
import NotFound from '../components/common/NotFound'
import { openNotification } from '../utils/notification'

import { verifyToken } from '../apis/apiCalls'
import { getUserProfile, getCompanyProfile, twitterConnectStep1 } from '../actions/userInfo'

import { useTranslation } from 'react-i18next'

const API = 'https://api.ipify.org?format=jsonp?callback=?'

function Routes(props) {
    const { t } = useTranslation()

    const token = useSelector(state => state.userInfo.token)
    const company = useSelector(state => state.userInfo.company)
    const twitter_oauth_token = useSelector(state => state.userInfo.twitter_oauth_token)
    const twitterDirectConnect = useSelector(state => state.userInfo.twitterDirectConnect)
    const AUTH_ERROR = useSelector(state => state.userInfo.AUTH_ERROR)

    const { dispatch, history } = props
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
        fetch(API, { method: 'GET', headers: {} })
            .then(response => {
                return response.text()
            })
            .then(ip => {
                setIsFethingIP(false)
                dispatch({ type: 'FETCH_IP_SUCCESS', data: ip })
            })
            .catch(error => setIsFethingIP(false))

        const _handleOnline = handleOnline
        const _handleOffline = handleOffline
        window.addEventListener('online', _handleOnline)
        window.addEventListener('offline', _handleOffline)

        const session_token = sessionStorage.getItem('token')
        const company = sessionStorage.getItem('company')

        const rememberToken = localStorage.getItem('token')
        const rememberCompany = localStorage.getItem('company')

        if (!session_token && !rememberToken) {
            return
        }

        if (session_token) {
            verifyToken(session_token)
                .then(response => response.text())
                .then(result => {
                    var json_rlt = JSON.parse(result)
                    if (json_rlt.token) {
                        dispatch({ type: "LOG_IN_SUCCESS", data: { token: session_token, company: company === 'true' } })
                    }
                    else {
                        sessionStorage.clear()
                        localStorage.removeItem('token')
                        localStorage.removeItem('company')
                        history.push('/')
                    }
                    setAuthLoading(false)
                })
                .catch(error => {
                    sessionStorage.clear()
                    setAuthLoading(false)
                });
            return
        }

        if (rememberToken) {
            verifyToken(rememberToken)
                .then(response => response.text())
                .then(result => {
                    var json_rlt = JSON.parse(result)
                    if (json_rlt.token) {
                        dispatch({ type: "LOG_IN_SUCCESS", data: { token: rememberToken, company: rememberCompany === 'true' } })
                        sessionStorage.setItem('token', rememberToken)
                        sessionStorage.setItem('company', rememberCompany)
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

        return () => {
            window.removeEventListener('online', _handleOnline)
            window.removeEventListener('offline', _handleOffline)
        };
    }, [])

    useEffect(() => {
        if (twitter_oauth_token) {
            dispatch({ type: 'INIT_STATE', state: 'twitter_oauth_token', data: '' })
            window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${twitter_oauth_token}`, '_blank')
        }
    }, [twitter_oauth_token])

    useEffect(() => {
        if (twitterDirectConnect) {
            dispatch({ type: 'INIT_STATE', state: 'twitterDirectConnect', data: false })
            dispatch(twitterConnectStep1())
        }
    }, [twitterDirectConnect])

    useEffect(() => {
        if (AUTH_ERROR) {
            openNotification('warning', 'Login to continue')
            history.push('/')
            dispatch({ type: 'INIT_STATE', state: 'AUTH_ERROR', data: false })
            dispatch({ type: "LOG_IN_SUCCESS", data: { token: '', company: false } })
            sessionStorage.clear()
            localStorage.removeItem('token')
            localStorage.removeItem('company')
        }
    }, [AUTH_ERROR])

    if ((authLoading && sessionStorage.getItem('token') && !props.token) || isFetchingIP) {
        return <Loading />
    }

    return (
        <ScrollToTop>
            {
                !online && openNotification('warning', 'No internet connection detected. Make sure Wi-Fi or mobile data is turned on, then try again.')
            }
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user-account/:menu" component={UserAccount} />
                <Route exact path="/dashboard/:menu" component={Dashboard} />
                <Route exact path="/campaign-detail/:id" component={CampaignDetail} />
                <Route exact path="/deals" component={Deals} />
                <Route exact path="/profile/activate/:id/:token" component={ProfileActivated} />
                <Route exact path="/reset-password/:token/:id" component={ResetPassword} />
                <Route exact path="/search-result" component={SearchResult} />
                <Route exact path="/general-conditions" component={GeneralConditions} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route exact path="/company/:id" component={CompanyPage} />
                <Route exact path="/twitter/login/callback/" component={TwitterAuthPage} />
                <Route exact path="/twitch/connect/" component={TwitchAuthPage} />
                <Route exact path="/participation-result/:id" component={ParticipationResult} />
                <Route component={NotFound} />
            </Switch>
            <CookieConsent
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
function mapStateToProps(state) {
    return {
        token: state.userInfo.token,
        company: state.userInfo.company
    }
}

export default compose(withRouter, connect(mapStateToProps))(Routes)
