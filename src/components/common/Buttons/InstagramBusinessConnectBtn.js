import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import InstagramConnectModal from '../../modals/InstagramConnectModal'
import { openNotification } from '../../../utils/notification'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function InstagramConnectBtn(props) {
  const { t } = useTranslation()

  const { connected } = props

  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => setOpenModal(!openModal)

  useEffect(() => {
    if (connected) {
      setOpenModal(false)
    }
  }, [connected])

  const openInstagramBusinessConnectModal = () => {
    if (connected) return
    setOpenModal(true)
  }

  return (
    <>
      <Row className={connected ? "not-allowed" : "pointer"} onClick={openInstagramBusinessConnectModal}>
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
      />
    </>
  )
}
export default InstagramConnectBtn