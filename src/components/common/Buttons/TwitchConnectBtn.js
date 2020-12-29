import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY, TWITCH_OAUTH_TOKEN_URL_FOR_USER } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

function TwitchConnectBtn(props) {
  const { t } = useTranslation()

  const { connected } = props
  const company = useSelector(state => state.userInfo.company)

  const getTwitchToken = () => {
    if (connected) return
    if (company) {
      window.open(TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY, '_blank')
    } else {
      window.open(TWITCH_OAUTH_TOKEN_URL_FOR_USER, '_blank')
    }
  }

  return (
    <Row className={connected ? "not-allowed" : "pointer"} onClick={getTwitchToken}>
      <Col xs="2" className="pl-0 pr-0 twitch-icon-container1">
        <img src={images.twitch_icon} alt="" />
      </Col>
      <Col xs="10" className="pl-0 pr-0 twitch-icon-container2">
        {connected ? t('account_page.twitch_connected') : t('account_page.twitch_connect')}
      </Col>
    </Row>

  )
}
export default TwitchConnectBtn;