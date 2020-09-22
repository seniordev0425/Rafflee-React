import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row } from 'reactstrap'
import { Checkbox, Button } from 'antd'
import { useTranslation } from 'react-i18next'
import FormPhoneInput from '../common/FormPhoneInput'
import FormInput from '../common/FormInput'

import {
  required,
  requiredPhoneObj
} from '../../utils/validation'

function ContactUsModal(props) {
  const { t } = useTranslation()
  const { open, onToggle } = props

  const onSubmit = () => {

  }

  return (
    <Modal isOpen={open} toggle={onToggle} style={{ maxWidth: 400 }}>
      <ModalHeader toggle={onToggle} style={{ borderBottom: 'none' }}></ModalHeader>
      <ModalBody className="modal-body-padding">
        <Row style={{ margin: 0 }}>
          <div className="modal-company-btn">{t('contact_modal.contact_form')}</div>
        </Row>
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
                  placeholder={t('company_modal.email')}
                  validate={required(t('company_modal.email_required'))}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  name="phonenumber"
                  component={FormPhoneInput}
                  className="custom-form-control"
                  validate={requiredPhoneObj(t('company_modal.phone_number_required'))}
                />
              </FormGroup>
              <FormGroup>
                <Field
                  name="message"
                  component={FormInput}
                  className="company-contact-form-text-area"
                  type="textarea"
                  row={10}
                  placeholder={t('company_modal.your_message')}
                  validate={required(t('company_modal.your_message_required'))}
                />
              </FormGroup>
              <Button
                htmlType='submit'
                type="primary"
                className="ant-blue-btn mt-4"
              >
                {t('button_group.send_message')}
              </Button>
              <div className="company-question-button-container">
                {t('company_modal.need_help')} {t('company_modal.contact_us')} <span className="company-question-button">{t('company_modal.here')}</span>
              </div>
            </Form>
          )}
        />
      </ModalBody>
    </Modal>
  )
}

export default ContactUsModal