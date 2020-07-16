import React from 'react'
import JoinHeader from './HeaderLayout/JoinHeader'
import Header from './HeaderLayout/Header'
import FooterLink from './footer/FooterLink'
import Footer from './footer/Footer'

function AppLayout(props) {
  const { children } = props

  return (
    <div style={{ fontFamily: "sofiapro" }}>
      <div className="parent-header-container">
        <JoinHeader />
        <Header />
      </div>
      {children}
      <FooterLink />
      <Footer />
    </div>
  )
}

export default AppLayout