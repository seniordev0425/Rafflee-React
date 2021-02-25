import React from 'react'
import PropTypes from 'prop-types'
import { isIOS } from 'react-device-detect'
import {
  Modal,
  ModalHeader,
  ModalBody
} from 'reactstrap'
import { Button } from 'antd'

import { useTranslation } from 'react-i18next'

import { PLAY_STORE_LINK, APP_STORE_LINK } from '../../utils/constants'

function StoreRedirectModal(props) {
  const { t } = useTranslation()

  const {
    open,
    onToggle,
  } = props

  const onClickDownload = () => {
    window.location.href = isIOS ? APP_STORE_LINK : PLAY_STORE_LINK
  }


  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn justify-content-center" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('store_redirect_modal.download_app')}</div>
    </ModalHeader>
    <ModalBody>
      <Button
        htmlType="submit"
        type="primary"
        className="ant-blue-btn mt-4"
        onClick={onClickDownload}
      >
        {t('button_group.download')}
      </Button>
    </ModalBody>
  </Modal>)
}

StoreRedirectModal.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired
}

export default StoreRedirectModal
