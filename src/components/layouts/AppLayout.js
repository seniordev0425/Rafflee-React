import React from 'react'
import { useSelector } from 'react-redux'
import JoinHeader from './HeaderLayout/JoinHeader'
import Header from './HeaderLayout/Header'
import AdminHeader from '../adminLayouts/Header'
import FooterLink from './footer/FooterLink'
import Footer from './footer/Footer'

function AppLayout(props) { // Top parent container
  const { children, openLoginModal } = props

  const is_admin = useSelector(state => state.userInfo.is_admin)

  return (
    <div style={{ fontFamily: "sofiapro" }}>
      <div className="parent-header-container">
        {is_admin
          ?
          <AdminHeader />
          :
          <React.Fragment>
            <JoinHeader />
            <Header openLoginModal={openLoginModal} />
          </React.Fragment>
        }
      </div>
      {children}
      <FooterLink />
      <Footer />
    </div>
  )
}

export default AppLayout