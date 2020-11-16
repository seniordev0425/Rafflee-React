import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { Button, Col, Container, Row } from 'reactstrap'
import { Link } from 'react-router-dom'
import { instagramConnect } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import LoadingPage from '../../components/common/LoadingPage'
import { useTranslation } from 'react-i18next'

function InstagramAuthPage(props) {
  const { t } = useTranslation()

  const { history } = props

  const INSTAGRAM_CONNECT_PROCESS = useSelector(state => state.userInfo.INSTAGRAM_CONNECT)
  const SUCCESS_INSTAGRAM_CONNECT = useSelector(state => state.userInfo.SUCCESS_INSTAGRAM_CONNECT)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get oauthToken from redirected url
    let search = window.location.search
    let params = new URLSearchParams(search)
    let body = {
      token: params.get('code')
    }
    // Call instagram connect endpoint with oauthToken
    dispatch(instagramConnect(body))
  }, [])

  useEffect(() => {
    if (SUCCESS_INSTAGRAM_CONNECT) {
      // If instagram connect is success then redirect user to account page
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_INSTAGRAM_CONNECT', data: false })
      openNotification('success', t('social_oauth.instagram'))
      history.push('/user-account/profile')
    }
  }, [SUCCESS_INSTAGRAM_CONNECT])

  if (INSTAGRAM_CONNECT_PROCESS) return <LoadingPage />

  return (
    <Container fluid className="p-0 NotFound">
      <section className="py-5 px-sm-5 px-4">
        <Row>
          <Col className="text-center mx-auto" style={{ maxWidth: '35rem' }}>
            <h1 className="h4 mb-4">{t('auth_page.something_went_wrong')}</h1>
            <p className="mb-5">{t('auth_page.try_again_later')}</p>
            <Button tag={Link} to='/user-account/profile' color="primary">
              {t('auth_page.go_back')}
            </Button>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default withRouter(InstagramAuthPage)