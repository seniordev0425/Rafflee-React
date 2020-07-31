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

  const company = useSelector(state => state.userInfo.company)
  const VALIDATE_INSTAGRAM_BUSINESS_CONNECT_SUCCESS = useSelector(state => state.userInfo.SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT)
  const dispatch = useDispatch()

  const [openModal, setOpenModal] = useState(false)
  const handleModal = () => setOpenModal(!openModal)

  useEffect(() => {
    if (VALIDATE_INSTAGRAM_BUSINESS_CONNECT_SUCCESS) {
      dispatch({ type: 'SET_USER_INSTAGRAM_BUSINESS_CONNECT', company: company, data: true })
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT', data: false })
      openNotification('success', t('social_oauth.instagram'))
      setOpenModal(false)
    }
  }, [VALIDATE_INSTAGRAM_BUSINESS_CONNECT_SUCCESS])

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