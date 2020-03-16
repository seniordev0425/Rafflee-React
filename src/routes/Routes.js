import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { compose } from 'redux'

import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom'
import Home from '../screens/Home'
import Deals from '../screens/Deals'
import UserAccount from '../screens/UserAccount'
import Dashboard from '../screens/Dashboard'
import CampaignDetail from '../screens/CampaignDetail'
import ProfileActivated from '../screens/ProfileActivated'
import ResetPassword from '../screens/ResetPassword'
import SearchResult from '../screens/SearchResult'

import Loading from '../components/common/Loading'
import ScrollToTop from '../components/common/ScrollToTop'
import NotFound from '../components/common/NotFound'
import { openNotification } from '../utils/notification'

import { verifyToken } from '../apis/apiCalls'

function Routes(props){
    const {dispatch, history} = props
    const [authLoading, setAuthLoading] = useState(true);

    const [online, setOnline] = useState(navigator.onLine)

    const handleOnline = () => setOnline(navigator.onLine)
    const handleOffline = () => setOnline(navigator.onLine)

    useEffect(() => {
        const _handleOnline = handleOnline
        const _handleOffline = handleOffline
        window.addEventListener('online', _handleOnline)
        window.addEventListener('offline', _handleOffline)

        const token = localStorage.getItem('token')
        const company = localStorage.getItem('company')

        if (!token) {
            return
        }

        verifyToken(token)
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.token){
                dispatch({type: "LOG_IN_SUCCESS", data: {token: token, company: company === 'true'}})
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

        return () => {
            window.removeEventListener('online', _handleOnline)
            window.removeEventListener('offline', _handleOffline)
        };
    }, [])

    if (authLoading && localStorage.getItem('token') && !props.token) {
        return <Loading/>
    }
    return (
        <ScrollToTop>
            {
                !online && openNotification('warning', 'Warning!','No internet connection detected. Make sure Wi-Fi or mobile data is turned on, then try again.')
            }
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/user-account" component={UserAccount} />
                <Route exact path="/dashboard/:menu" component={Dashboard} />
                <Route exact path="/campaign-detail/:id" component={CampaignDetail} />
                <Route exact path="/deals" component={Deals} />
                <Route exact path="/profile/activate/:id/:token" component={ProfileActivated} />
                <Route exact path="/reset-password/:token/:id" component={ResetPassword} />
                <Route exact path="/search-result" component={SearchResult} />
                <Route component={NotFound} />
            </Switch>
        </ScrollToTop>
        
    )
    
}
function mapStateToProps(state) {
    return {
        token: state.userInfo.token,
        company: state.userInfo.company
    }
}
export default compose(withRouter, connect(mapStateToProps))(Routes);
