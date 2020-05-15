import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'


function Deals() {
    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <CurrentPromotionList />
            <FooterLink />
            <Footer />
        </div>
    )
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token
    }
}

export default compose(withRouter, connect(mapStateToProps))(Deals)
