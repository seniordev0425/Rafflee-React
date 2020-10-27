import React from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import Banner from '../components/layouts/brands/Banner'
import Slider from '../components/layouts/brands/Slider'
import Brands from '../components/layouts/brands/Brands'
import SubmitForm from '../components/layouts/brands/SubmitForm'

function Brand() {

  return (
    <AppLayout>
      <Banner />
      <Row style={{ marginTop: 70, marginBottom: 100 }}>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Slider />
        </Col>
      </Row>
      <div style={{ backgroundColor: '#FAFAFA' }}>
        <Brands />
      </div>
      <Row style={{ marginTop: 70, marginBottom: 100 }}>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <SubmitForm />
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Brand
