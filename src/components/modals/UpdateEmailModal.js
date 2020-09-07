import React from 'react'
import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom'
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
  isEmail
} from '../../utils/validation'


import { useTranslation } from 'react-i18next'

function UpdateEmailModal(props) {
  const { t } = useTranslation()

  const {
    open,
    onToggle,
    updateEmail
  } = props

  const UPDATE_EMAIL_PROCESS = useSelector(state => state.userInfo.UPDATE_EMAIL)

  const onSubmit = (values) => {
    updateEmail(values.email)
  }

  return (<Modal isOpen={open} toggle={onToggle}>
    <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
      <div className="modal-login-btn">{t('update_email_modal.enter_email')}</div>
    </ModalHeader>
    <ModalBody>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Field
                name="email"
                component={FormInput}
                className="custom-form-control"
                type="email"
                placeholder={t('update_email_modal.new_email')}
                validate={composeValidators(
                  required(t('account_page.enter_valid_email')),
                  isEmail(t('account_page.enter_valid_email'))
                )}
              />
            </FormGroup>

            <Button
              htmlType="submit"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={UPDATE_EMAIL_PROCESS}
            >
              {!UPDATE_EMAIL_PROCESS && t('update_email_modal.verify_email')}
            </Button>
          </Form>
        )}
      />
    </ModalBody>
  </Modal>)
}

UpdateEmailModal.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  updateEmail: PropTypes.func.isRequired,
}

export default withRouter(UpdateEmailModal)
