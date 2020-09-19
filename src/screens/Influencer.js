import React from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import Banner from '../components/layouts/influencer/Banner'
import Slider from '../components/layouts/influencer/Slider'
import Brands from '../components/layouts/influencer/Brands'
import SubmitForm from '../components/layouts/influencer/SubmitForm'
import images from '../utils/images'

import { useTranslation } from 'react-i18next'

function Influencer() {
  const { t } = useTranslation()

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

export default Influencer
