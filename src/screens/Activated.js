import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'


export default () => (
  <Container fluid className="p-0 NotFound">
    <section className="py-5 px-sm-5 px-4">
      <Row>
        <Col className="text-center mx-auto" style={{ maxWidth: '35rem' }}>
          <h1 className="h4 mb-4">Your account has been activated</h1>
          <Button tag={Link} to="/" color="primary">Go to Login!</Button>
        </Col>
      </Row>
    </section>
  </Container>
)
