import React from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import HeaderRight from './HeaderRight'

function Header() {

  return (
    <div className="header-container">
      <Row className="w-100">
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x d-flex justify-content-between align-items-center">
          <Link to="/admin"> <img src={images.logo} alt="logo" width="120" /> </Link>
          <div>
            <HeaderRight />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Header