import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { INSTAGRAM_CLIENT_ID } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'

function InstagramNormalConnectBtn(props) {
  const { t } = useTranslation()

  const { connected } = props

  const instagramConnect = () => {
    if (connected) return
    window.open(`https://www.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=https://rafflee.io/instagram/connect/&scope=user_profile,user_media&response_type=code`, '_blank')
  }

  return (
    <>
      <Row className={connected ? "not-allowed" : "pointer"} onClick={instagramConnect}>
        <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
          <img src={images.instagram_icon} alt="" />
        </Col>
        <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
          {connected ? t('account_page.instagram_connected') : t('account_page.instagram_connect')}
        </Col>
      </Row>
    </>
  )
}
export default InstagramNormalConnectBtn