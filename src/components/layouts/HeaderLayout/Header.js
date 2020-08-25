import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin'

function Header() {

  const token = useSelector(state => state.userInfo.token)

  return (
    <div className="header-container">
      <div style={{ width: "100%", height: 40 }}>
        <Link to="/"> <img src={images.logo} alt="logo" width="120" /> </Link>
        <div className="header-right-part">
          {
            token ? <HeaderAfterLogin /> : <HeaderBeforeLogin />
          }
        </div>
      </div>
    </div>
  )
}

export default Header