import React from 'react'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import HeaderRight from './HeaderRight'

function Header() {

  return (
    <div className="header-container">
      <div style={{ width: "100%", height: 40 }} className="d-flex justify-content-between align-items-center">
        <Link to="/admin"> <img src={images.logo} alt="logo" width="120" /> </Link>
        <div>
          <HeaderRight />
        </div>
      </div>
    </div>
  )
}

export default Header