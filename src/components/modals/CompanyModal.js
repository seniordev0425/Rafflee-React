import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../common/FormInput'
import FormPhoneInput from '../common/FormPhoneInput'
import { companyContact } from '../../actions/userInfo'
import {
  required,
  requiredPhoneObj
} from '../../utils/validation'

import { useTranslation } from 'react-i18next'

function CompanyModal({ showCompanyModal, onClickContactUs }) {
  const { t } = useTranslation()

  const isLoading = useSelector(state => state.userInfo.COMPANY_CONTACT)
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    var body = {
      email: values.email,
      phone_number: values.phonenumber.phone_number,
      company_name: values.company_name,
      message: values.message
    }
    dispatch(companyContact(body))
  }
  return (

    <div style={{ fontFamily: "sofiapro" }}>
      <Row style={{ margin: 0 }}>
        <div className="modal-company-btn">{t('company_modal.company_form')}</div>
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
                name="company_name"
                component={FormInput}
                className="custom-form-control"
                type="text"
                placeholder={t('company_modal.company_name')}
                validate={required(t('company_modal.company_name_required'))}
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
              loading={isLoading}
            >
              {!isLoading && t('button_group.send_message')}
            </Button>
            <div className="company-question-button-container" onClick={() => showCompanyModal(false)}>
              <span className="company-question-button">{t('signin_modal.are_you_user')}</span>
            </div>
            <div className="company-question-button-container" onClick={onClickContactUs}>
              {t('company_modal.need_help')} {t('company_modal.contact_us')} <span className="company-question-button">{t('company_modal.here')}</span>
            </div>
          </Form>
        )}
      />
    </div>
  )
}

export default CompanyModal