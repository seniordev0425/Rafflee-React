import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactCodeInput from 'react-verification-code-input'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import { resendSms, verifyPhoneNumber } from '../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function PhoneVerificationModal(props) {
  const { t } = useTranslation()

  const { open, onToggle, onSuccess, phone_number } = props

  const isVerifying = useSelector(state => state.userInfo.VERIFY_PHONE_NUMBER_REQUEST)
  const isVerified = useSelector(state => state.userInfo.VERIFY_PHONE_NUMBER_SUCCESS)

  const dispatch = useDispatch()

  const [verifyCode, setVerifyCode] = useState('')

  useEffect(() => {
    if (isVerified) {
      onSuccess()
      onToggle()
      dispatch({ type: 'VERIFY_PHONE_NUMBER_SUCCESS', flag: false })
    }
  }, [isVerified])

  const onSubmit = () => {
    var body = {
      number: `+${phone_number.phone_country}${phone_number.phone_number}`,
      code: verifyCode
    }
    dispatch(verifyPhoneNumber(body))
  }

  const resendCode = () => {
    var body = {
      prefix: `+${phone_number.phone_country}`,
      number: phone_number.phone_number
    }
    dispatch(resendSms(body))
  }

  const handleVerifyCode = (values) => {
    setVerifyCode(values)
  }

  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('phone_verify_modal.enter_code')}</div>
    </ModalHeader>
    <ModalBody>
      <ReactCodeInput
        className="m-auto"
        onChange={handleVerifyCode}
      />
      <div className="d-flex justify-content-center">
        <Button
          htmlType="submit"
          type="primary"
          className="ant-blue-btn mt-4"
          style={{ width: 100, height: 40 }}
          onClick={onSubmit}
          loading={isVerifying}
        >
          {!isVerifying && t('button_group.verify')}
        </Button>
      </div>
      <div className="blue-link-btn d-flex justify-content-center mt-4">
        <span onClick={resendCode}>
          {t('phone_verify_modal.resend_code')}
        </span>
      </div>
    </ModalBody>
  </Modal>)
}

PhoneVerificationModal.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default withRouter(PhoneVerificationModal)
