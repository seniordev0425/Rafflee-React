import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import Banner from '../components/layouts/careers/Banner'
import CareerOpening from '../components/layouts/careers/CareerOpening'
import CareerDetail from '../components/layouts/careers/CareerDetail'

function Careers(props) {
  const { match } = props

  const recruitment = props.location.state?.recruitment
  const [currentPage, setCurrentPage] = useState(1)

  return (
    <AppLayout>
      <Banner />
      <Row style={{ marginTop: 70, marginBottom: 100 }}>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          {match.params.menu === 'openings'
            ?
            <CareerOpening
              currentPage={currentPage}
              onChangeCurrentPage={(value) => setCurrentPage(value)}
            />
            :
            <CareerDetail recruitment={recruitment} />
          }
        </Col>
      </Row>
    </AppLayout>
  )
}

export default Careers