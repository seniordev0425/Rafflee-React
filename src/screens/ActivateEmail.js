import React, { useLayoutEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Col, Container, Row } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import { activateEmail } from '../actions/userInfo'
import AppLayout from '../components/layouts/AppLayout'
import LoadingPage from '../components/common/LoadingPage'

import { useTranslation } from 'react-i18next'

function ActivateEmail(props) {
  const { t } = useTranslation()

  const { match } = props

  const ACTIVATE_EMAIL_PROCESS = useSelector(state => state.userInfo.ACTIVATE_EMAIL)
  const ACTIVATE_EMAIL_SUCCESS = useSelector(state => state.userInfo.SUCCESS_ACTIVATE_EMAIL)
  const dispatch = useDispatch()

  useLayoutEffect(() => {
    dispatch(activateEmail(match.params.id, match.params.token))
  }, [])

  if (ACTIVATE_EMAIL_PROCESS) return <LoadingPage />

  return (
    <AppLayout>
      <Container fluid className="mt-5">
        <section className="py-5 px-sm-5 px-4">
          <Row className="mt-5">
            <Col className="text-center mx-auto">
              {ACTIVATE_EMAIL_SUCCESS
                ?
                <h1 className="h4 mb-4 congratulation-header">{t('activate_email_page.successfully_activated')}</h1>
                :
                <h1 className="h4 mb-4 congratulation-header">{t('activate_email_page.failed')}</h1>
              }
            </Col>
          </Row>
        </section>
      </Container>
    </AppLayout>
  )
}

export default withRouter(ActivateEmail)
