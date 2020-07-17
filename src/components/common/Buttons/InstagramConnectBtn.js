import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import InstagramConnectModal from '../../modals/InstagramConnectModal'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function InstagramConnectBtn(props) {
  const { t } = useTranslation()

  const { connected } = props

  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => setOpenModal(!openModal)

  const openInstagramConnectModal = () => {
    // if (connected) return
    setOpenModal(true)
  }

  return (
    <>
      <Row className={connected ? "not-allowed" : "pointer"} onClick={openInstagramConnectModal}>
        <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
          <img src={images.instagram_icon} alt="" />
        </Col>
        <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
          {connected ? t('account_page.instagram_connected') : t('account_page.instagram_connect')}
        </Col>
      </Row>
      <InstagramConnectModal
        open={openModal}
        onToggle={handleModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  )
}
export default InstagramConnectBtn