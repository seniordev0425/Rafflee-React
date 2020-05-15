import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Row } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { profileActivate } from '../actions/userInfo'
import Header from '../components/layouts/HeaderLayout/Header'
import Loading from '../components/common/Loading'

import { useTranslation } from 'react-i18next'

function ProfileActivated(props) {
  const { t } = useTranslation()

  const { match } = props

  const isLoading = useSelector(state => state.userInfo.GET_USER_INVENTORY_SUCCESS)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileActivate(match.params.id, match.params.token))
  }, [])

  if (isLoading) return <Loading />

  return (
    <>
      <Header />
      <Container fluid className="mt-5">
        <section className="py-5 px-sm-5 px-4">
          <Row className="mt-5">
            <Col className="text-center mx-auto">
              <h1 className="h4 mb-4 congratulation-header">{t('profile_activated_page.successfully_activated')}</h1>
              <Button tag={Link} to="/" color="primary" className="mt-5">{t('profile_activated_page.goto_login')}</Button>
            </Col>
          </Row>
        </section>
      </Container>
    </>
  )
}

export default withRouter(ProfileActivated)
