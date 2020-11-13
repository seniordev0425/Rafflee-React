import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router'
import { youtubeConnectStep2 } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import LoadingPage from '../../components/common/LoadingPage'
import { useTranslation } from 'react-i18next'

function YoutubeAuthPage(props) {
  const { t } = useTranslation()

  const { history } = props
  const company = useSelector(state => state.userInfo.company)
  const SUCCESS_YOUTUBE_CONNECT_STEP2 = useSelector(state => state.userInfo.SUCCESS_YOUTUBE_CONNECT_STEP2)
  const dispatch = useDispatch()

  useEffect(() => {
    // Get code from redirected url
    let search = window.location.search
    let params = new URLSearchParams(search)
    let body = {
      code: params.get('code')
    }
    // Call youtube connect endpoint with code
    dispatch(youtubeConnectStep2(body, company))
  }, [])

  useEffect(() => {
    if (SUCCESS_YOUTUBE_CONNECT_STEP2) {
      // If youtube connect is success then redirect user to account page
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_YOUTUBE_CONNECT_STEP2', data: false })
      openNotification('success', t('social_oauth.youtube'))
      history.push('/user-account/profile')
    }
  }, [SUCCESS_YOUTUBE_CONNECT_STEP2])

  return (
    <>
      <LoadingPage />
    </>
  )
}

export default withRouter(YoutubeAuthPage)