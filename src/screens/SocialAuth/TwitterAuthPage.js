import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { twitterConnectStep2 } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import Loading from '../../components/common/Loading'
import { useTranslation } from 'react-i18next'

function TwitterAuthPage(props) {
  const { t } = useTranslation()

  const { history } = props
  const SUCCESS_TWITTER_CONNECT_STEP2 = useSelector(state => state.userInfo.SUCCESS_TWITTER_CONNECT_STEP2)
  const dispatch = useDispatch()

  useEffect(() => {
    let search = window.location.search
    let params = new URLSearchParams(search)
    let body = {
      oauth_token: params.get('oauth_token'),
      oauth_verifier: params.get('oauth_verifier')
    }
    dispatch(twitterConnectStep2(body))
  }, [])

  useEffect(() => {
    if (SUCCESS_TWITTER_CONNECT_STEP2) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_TWITTER_CONNECT_STEP2', data: false })
      openNotification('success', t('social_oauth.twitter'))
      history.push('/user-account/profile')
    }
  }, [SUCCESS_TWITTER_CONNECT_STEP2])

  return (
    <>
      <Loading />
    </>
  )
}

export default withRouter(TwitterAuthPage)