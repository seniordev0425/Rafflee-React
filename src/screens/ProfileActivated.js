import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Col, Container, Row } from 'reactstrap'
import { Link, withRouter } from 'react-router-dom'
import { profileActivate } from '../actions/userInfo'
import AppLayout from '../components/layouts/AppLayout'
import LoadingPage from '../components/common/LoadingPage'

import { useTranslation } from 'react-i18next'

function ProfileActivated(props) {
  const { t } = useTranslation()

  const { match, history } = props

  const isLoading = useSelector(state => state.userInfo.PROFILE_ACTIVATE)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(profileActivate(match.params.id, match.params.token, history))
  }, [])

  if (isLoading) return <LoadingPage />

  return (
    <AppLayout>
      <Container fluid className="p-0 NotFound">
        <section className="py-5 px-sm-5 px-4">
          <Row>
            <Col className="text-center mx-auto" style={{ maxWidth: '35rem' }}>
              <h1 className="h4 mb-4">{t('auth_page.something_went_wrong')}</h1>
              <p className="mb-5">{t('auth_page.try_again_later')}</p>
              <Button tag={Link} to='/' color="primary">
                {t('auth_page.go_back')}
              </Button>
            </Col>
          </Row>
        </section>
      </Container>
    </AppLayout>
  )
}

export default withRouter(ProfileActivated)
