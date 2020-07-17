import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function SnapchatConnectBtn(props) {
  const { t } = useTranslation()
  const { connected } = props

  const snapchatConnect = () => {

  }

  return (
    <Row className={connected ? "not-allowed" : "not-allowed"} onClick={snapchatConnect}>
      <Col xs="2" className="pl-0 pr-0 snapchat-icon-container1">
        <img src={images.snapchat_icon} alt="" />
      </Col>
      <Col xs="10" className="pl-0 pr-0 snapchat-icon-container2">
        {connected ? t('account_page.snapchat_connected') : t('account_page.snapchat_connect')}
      </Col>
    </Row>
  )
}
export default SnapchatConnectBtn