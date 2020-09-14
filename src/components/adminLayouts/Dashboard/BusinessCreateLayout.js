import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row, Col, Container } from 'reactstrap'
import { Select, Button } from 'antd'

import FormInput from '../../common/FormInput'

import { companyRegister } from '../../../actions/userInfo'

import {
  composeValidators,
  required,
  isEmail,
} from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

const { Option } = Select

const BusinessCreateLayout = () => {
  const { t } = useTranslation()

  const COMPANY_REGISTER_PROCESS = useSelector(state => state.userInfo.COMPANY_REGISTER)
  const dispatch = useDispatch()

  const [entityType, setEntityType] = useState('company')

  const onSubmit = (values) => {
    var body = {
      username: values.username,
      email: values.email,
      password1: values.password1,
      password2: values.password2,
      entity_name: values.entity_name,
      is_company: entityType === 'company'
    }
    dispatch(companyRegister(body))
  }

  return (
    <React.Fragment>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Container>
              <Row>
                <Col xs="12" md="6">
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.entity_name')}</div>
                      <Field
                        name="entity_name"
                        component={FormInput}
                        className="custom-form-control"
                        type="text"
                        placeholder={t('business_create_page.entity_name')}
                        validate={required(t('business_create_page.entity_name_required'))}
                      />
                    </FormGroup>
                  </div>
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.username')}</div>
                      <Field
                        name="username"
                        component={FormInput}
                        className="custom-form-control"
                        type="text"
                        placeholder={t('business_create_page.username')}
                        validate={required(t('business_create_page.username_required'))}
                      />
                    </FormGroup>
                  </div>
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.email')}</div>
                      <Field
                        name="email"
                        component={FormInput}
                        className="custom-form-control"
                        type="email"
                        placeholder={t('business_create_page.email')}
                        validate={composeValidators(
                          required(t('business_create_page.enter_valid_email')),
                          isEmail(t('business_create_page.enter_valid_email'))
                        )}
                      />
                    </FormGroup>
                  </div>
                </Col>
                <Col xs="12" md="6">
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.password')}</div>
                      <Field
                        name="password1"
                        component={FormInput}
                        className="custom-form-control"
                        type="password"
                        placeholder={t('business_create_page.password')}
                        validate={required(t('business_create_page.password_required'))}
                      />
                    </FormGroup>
                  </div>
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.password_confirm')}</div>
                      <Field
                        name="password2"
                        component={FormInput}
                        className="custom-form-control"
                        type="password"
                        placeholder={t('business_create_page.password_confirm')}
                        validate={required(t('business_create_page.password_required'))}
                      />
                    </FormGroup>
                  </div>
                  <div className="mt-4 px-0 px-sm-5">
                    <FormGroup>
                      <div className="footer-link-bold mb-3">{t('business_create_page.entity_type')}</div>
                      <Select
                        defaultValue='company'
                        onChange={val => setEntityType(val)}
                        size="large"
                      >
                        <Option value="company">{t('business_create_page.company')}</Option>
                        <Option value="influencer">{t('business_create_page.influencer')}</Option>
                      </Select>
                    </FormGroup>
                  </div>
                  <div className="my-5 px-0 px-sm-5 d-flex justify-content-end">
                    <Button
                      htmlType='submit'
                      loading={COMPANY_REGISTER_PROCESS}
                      type="primary"
                      className="ant-blue-btn mt-2"
                      style={{ width: 200 }}
                    >
                      {!COMPANY_REGISTER_PROCESS && t('button_group.update')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Form>
        )}
      />
    </React.Fragment>
  )
}

export default BusinessCreateLayout