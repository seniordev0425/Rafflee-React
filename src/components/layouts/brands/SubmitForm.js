import React from 'react'
import { Button, Select } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import FormInput from '../../common/FormInput'
import { required } from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

const { Option } = Select

const SubmitForm = () => {
  const { t } = useTranslation()

  const onSubmit = () => {

  }

  return (
    <div>
      <div className="color-blue font-weight-bold font-size-14 text-center">
        {t('influencer_page.get_in_touch')}
      </div>
      <div className="color-gray font-size-11 text-center my-4">
        {t('influencer_page.we_reach_out_to_you')}
      </div>
      <div className="pt-5">
        <FinalForm
          onSubmit={onSubmit}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Row className="justify-content-between">
                <Col xs="12" md="5" className="p-0">
                  <FormGroup>
                    <div className="footer-link-bold mb-2">{t('career_page.first_name')}</div>
                    <Field
                      name="first_name"
                      component={FormInput}
                      className="custom-form-control"
                      type="text"
                      validate={required(t('career_page.first_name_required'))}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="5" className="p-0">
                  <FormGroup>
                    <div className="footer-link-bold mb-2">{t('career_page.last_name')}</div>
                    <Field
                      name="last_name"
                      component={FormInput}
                      className="custom-form-control"
                      type="text"
                      validate={required(t('career_page.last_name_required'))}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <div className="mt-4">
              <div className="footer-link-bold mb-2">{t('influencer_page.subject')}</div>
                <Select
                  defaultValue={'male'}
                  size="large"
                >
                  <Option value="male">{t('influencer_page.business_operation')}</Option>
                  <Option value="female">{t('influencer_page.business_operation')}</Option>
                </Select>
              </div>
              <div className="mt-4">
                <FormGroup>
                  <div className="footer-link-bold mb-2">{t('career_page.message')}</div>
                  <Field
                    name="message"
                    component={FormInput}
                    className="company-contact-form-text-area"
                    type="textarea"
                    validate={required(t('career_page.message_required'))}
                  />
                </FormGroup>
              </div>

              <div className="d-flex justify-content-center mt-5">
                <Button
                  onClick={null}
                  type="primary"
                  className="ant-blue-btn"
                  style={{ width: 500, maxWidth: '90%', height: 40, fontSize: '1rem', lineHeight: 1 }}
                >
                  {t('influencer_page.start_your_project')}
                </Button>
              </div>
            </Form>
          )}
        />
      </div>
    </div>
  )
}

export default SubmitForm