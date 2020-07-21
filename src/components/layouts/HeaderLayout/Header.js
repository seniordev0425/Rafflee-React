import React from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import images from '../../../utils/images'
import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin'

function Header(props) {
  return (
    <div className="header-container">
      <div style={{ width: "100%", height: 40 }}>
        <Link to="/"> <img src={images.logo} alt="logo" width="120" /> </Link>
        <div className="header-right-part">
          {
            props.token ? <HeaderAfterLogin /> : <HeaderBeforeLogin />
          }
        </div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    token: state.userInfo.token
  }
}

export default connect(mapStateToProps)(Header)