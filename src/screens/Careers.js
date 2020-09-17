import React from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import Banner from '../components/layouts/careers/Banner'
import CareerOpening from '../components/layouts/careers/CareerOpening'
import CareerDetail from '../components/layouts/careers/CareerDetail'

import { useTranslation } from 'react-i18next'

function Careers(props) {
  const { t } = useTranslation()
  const { match } = props

  return (
    <AppLayout>
      <Banner />
      <Row style={{ marginTop: 70, marginBottom: 100 }}>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          {match.params.menu === 'openings'
            ?
            <CareerOpening />
            :
            <CareerDetail />
          }
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Careers
