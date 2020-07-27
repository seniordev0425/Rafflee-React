import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Form as FinalForm, Field } from 'react-final-form'
import { 
  Form, 
  FormGroup, 
  Modal, 
  ModalHeader, 
  ModalBody 
} from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../common/FormInput'
import {
  composeValidators,
  required,
  isEmail,
} from '../../utils/validation'
import { resetPasswordRequest } from '../../actions/userInfo'
import { useTranslation } from 'react-i18next'

function ForgotPassword(props) {
  const { t } = useTranslation()

  const { open, onToggle } = props
  const isLoading = useSelector(state => state.userInfo.RESET_PASSWORD_REQUEST)
  const RESET_PASSWORD_REQUEST_SUCCESS = useSelector(state => state.userInfo.RESET_PASSWORD_REQUEST_SUCCESS)
  const dispatch = useDispatch()

  useEffect(() => {
    if (RESET_PASSWORD_REQUEST_SUCCESS) {
      dispatch({ type: 'RESET_PASSWORD_REQUEST_SUCCESS', flag: false })
      onToggle()
    }
  }, [RESET_PASSWORD_REQUEST_SUCCESS])

  const onSubmit = (values) => {
    dispatch(resetPasswordRequest({ email: values.email }))
  }

  return <Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('forgot_password_modal.forgot_password')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, values }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="email"
                component={FormInput}
                className="custom-form-control"
                type="email"
                placeholder="name@example.com"
                validate={composeValidators(
                  required(t('signin_modal.enter_valid_email')),
                  isEmail(t('signin_modal.enter_valid_email'))
                )}
              />
            </FormGroup>
            <Button
              htmlType="submit"
              size="lg"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={isLoading}
            >
              {!isLoading && t('button_group.reset_password')}
            </Button>
          </Form>
        )}
      />
    </ModalBody>
  </Modal>
}

ForgotPassword.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default ForgotPassword
