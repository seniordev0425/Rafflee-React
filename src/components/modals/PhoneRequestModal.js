import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import FormPhoneInput from '../common/FormPhoneInput'
import { Modal, ModalHeader, ModalBody, Form } from 'reactstrap'
import { Button } from 'antd'

import PhoneVerificationModal from './PhoneVerificationModal'

import { sendSms } from '../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function PhoneRequestModal(props) {
  const { t } = useTranslation()

  const { open, onToggle } = props

  const isSendingSms = useSelector(state => state.userInfo.SEND_SMS)
  const SEND_SMS_SUCCESS = useSelector(state => state.userInfo.SUCCESS_SEND_SMS)

  const dispatch = useDispatch()

  const [number, setNumber] = useState({phone_number: '', phone_country: '+33'})
  const [openVerificationModal, setOpenVerificationModal] = useState(false)

  useEffect(() => {
    if (SEND_SMS_SUCCESS) {
      setOpenVerificationModal(true)
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_SEND_SMS', data: false })
    }
  }, [SEND_SMS_SUCCESS])

  const onSubmit = (values) => {
    if (values.phonenumber) {
      var body = {
        prefix: `+${values.phonenumber.phone_country}`,
        number: values.phonenumber.phone_number
      }
      dispatch(sendSms(body, 'SEND_SMS'))
    }
  }


  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('phone_verify_modal.enter_number')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-between">
              <div style={{ width: "70%" }}>
                <Field
                  name="phonenumber"
                  defaultValue={number}
                  component={FormPhoneInput}
                  className="custom-form-control"
                />
                <OnChange name="phonenumber">
                  {(value) => {
                    setNumber(value)
                  }}
                </OnChange>
              </div>
              <div className="d-flex justify-content-end align-items-center w-25">
                <Button
                  htmlType="submit"
                  type='primary'
                  className="ant-blue-btn"
                  loading={isSendingSms}
                >
                  {!isSendingSms && t('button_group.verify')}
                </Button>
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <span
                className="policy-button font-size-12"
                onClick={onToggle}
                style={{ color: '#7E9AA8' }}
              >
                {t('button_group.skip')}
              </span>
            </div>
          </Form>
        )}
      />
    </ModalBody>

    <PhoneVerificationModal
      open={openVerificationModal}
      onToggle={() => setOpenVerificationModal(false)}
      onSuccess={onToggle}
      phone_number={number}
    />
  </Modal>)
}

PhoneRequestModal.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default withRouter(PhoneRequestModal)
