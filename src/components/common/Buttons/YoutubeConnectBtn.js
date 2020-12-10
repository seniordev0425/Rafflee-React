import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'

import { youtubeConnectStep1 } from '../../../actions/userInfo'

import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function YoutubeConnectBtn(props) {
  const { t } = useTranslation()

  const { connected } = props

  const dispatch = useDispatch()
  const youtube_oauth_url = useSelector(state => state.userInfo.youtube_oauth_url)
  const company = useSelector(state => state.userInfo.company)

  useEffect(() => {
    if (youtube_oauth_url) {
      dispatch({ type: 'INIT_STATE', state: 'youtube_oauth_url', data: '' })
      window.open(youtube_oauth_url, '_blank')
    }
  }, [youtube_oauth_url])


  const youtubeConnect = () => {
    // if (connected) return
    dispatch(youtubeConnectStep1(company))
  }

  return (
    <Row className={connected ? "not-allowed" : "pointer"} onClick={youtubeConnect}>
      <Col xs="2" className="pl-0 pr-0 youtube-icon-container1">
        <img src={images.youtube_icon} alt="" />
      </Col>
      <Col xs="10" className="pl-0 pr-0 youtube-icon-container2">
        {connected ? t('account_page.youtube_connected') : t('account_page.youtube_connect')}
      </Col>
    </Row>
  )
}
export default YoutubeConnectBtn;