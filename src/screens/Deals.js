import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import AppLayout from '../components/layouts/AppLayout'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'

function Deals() {
    return (
        <AppLayout>
            <CurrentPromotionList />
        </AppLayout>
    )
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token
    }
}

export default compose(withRouter, connect(mapStateToProps))(Deals)
