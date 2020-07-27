import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { instagramConnect } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import Loading from '../../components/common/Loading'
import { useTranslation } from 'react-i18next'

function InstagramAuthPage(props) {
  const { t } = useTranslation()

  const { history } = props
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

  return (
    <>
      <Loading />
    </>
  )
}

export default withRouter(InstagramAuthPage)