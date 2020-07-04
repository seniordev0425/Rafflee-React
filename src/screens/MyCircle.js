import React from 'react'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import MyCircleLayout from '../components/layouts/myCircleLayout/MyCircleLayout'

function MyCircle() {
    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <div className="parent-header-container">
                <JoinHeader />
                <Header />
            </div>
            <div>
                <MyCircleLayout />
            </div>
            <FooterLink />
            <Footer />
        </div>
    )
}

export default MyCircle