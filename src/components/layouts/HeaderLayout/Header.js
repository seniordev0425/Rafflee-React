import React from 'react'
import { Row, Col } from 'reactstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin'

function Header({ openLoginModal }) {

  const token = useSelector(state => state.userInfo.token)

  return (
    <div className="header-container">
      <Row className="w-100">
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x d-flex justify-content-between align-items-center">
          <Link to="/">
            <img src={images.logo} alt="logo" width="120" />
          </Link>
          <div>
            {
              token ? <HeaderAfterLogin /> : <HeaderBeforeLogin openLoginModal={openLoginModal} />
            }
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header