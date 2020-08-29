import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router'
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Form, FormGroup } from 'reactstrap'
import FormInput from '../common/FormInput'
import { Switch, Button } from 'antd'
import { signUp } from '../../actions/userInfo'

import {
  composeValidators,
  required,
  isEmail,
} from '../../utils/validation'

import { useTranslation } from 'react-i18next'

function SignUpModal(props) {
  const { t } = useTranslation()

  const { showCompanyModal, toggle, history } = props

  const isLoading = useSelector(state => state.userInfo.SIGN_UP)
  const SIGN_UP_SUCCESS = useSelector(state => state.userInfo.SUCCESS_SIGN_UP)

  const dispatch = useDispatch()
  const [agree, setAgree] = useState(false)

  const [containSpecial, setContainSpecial] = useState(false)
  const [containLowercase, setContainLowercase] = useState(false)
  const [containCapital, setContainCapital] = useState(false)
  const [containNumber, setContainNumber] = useState(false)
  const [containEnoughLen, setContainEnoughLen] = useState(false)

  const [password, setPassword] = useState('')

  useEffect(() => {
    if (SIGN_UP_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_SIGN_UP', data: false })
      toggle()
    }
  }, [SIGN_UP_SUCCESS])

  const onSubmit = (values) => {
    if (!containCapital || !containSpecial || !containLowercase || !containCapital || !containNumber) return
    var body = {
      username: values.username,
      email: values.email,
      password1: values.password1,
      password2: values.password2
    }
    dispatch(signUp(body))
  }

  const validatePassword = (val) => {
    setPassword(val)

    let specialFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    let lowercaseFormat = /[a-z]/
    let uppercaseFormat = /[A-Z]/
    let numberFormat = /\d/
    setContainSpecial(specialFormat.test(val))
    setContainLowercase(lowercaseFormat.test(val))
    setContainCapital(uppercaseFormat.test(val))
    setContainNumber(numberFormat.test(val))
    setContainEnoughLen(val.length >= 8)
  }

  return (
    <div>
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
                placeholder="name@example.com"
                validate={composeValidators(
                  required(t('signin_modal.enter_valid_email')),
                  isEmail(t('signin_modal.enter_valid_email'))
                )}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name="username"
                component={FormInput}
                className="custom-form-control"
                type="text"
                placeholder={t('signin_modal.username')}
                validate={required(t('signin_modal.username_required'))}
              />
            </FormGroup>
            <FormGroup>
              <Field
                name="password1"
                component={FormInput}
                className="custom-form-control"
                type="password"
                placeholder={t('signin_modal.password')}
                validate={required(t('signin_modal.password_required'))}
              />
              <OnChange name="password1">
                {(value) => {
                  validatePassword(value)
                }}
              </OnChange>
            </FormGroup>
            <FormGroup>
              <Field
                name="password2"
                component={FormInput}
                className="custom-form-control"
                type="password"
                placeholder={t('signin_modal.confirm_password')}
                validate={required(t('signin_modal.confirm_password_required'))}
              />
              {password &&
                <>
                  <div className="mt-3" style={containSpecial ? { color: "green" } : { color: "#dc3545" }}>
                    {t('signin_modal.password_special_alert')}
                  </div>
                  <div className="mt-2" style={containLowercase ? { color: "green" } : { color: "#dc3545" }}>
                    {t('signin_modal.password_lowercase_alert')}
                  </div>
                  <div className="mt-2" style={containCapital ? { color: "green" } : { color: "#dc3545" }}>
                    {t('signin_modal.password_capital_alert')}
                  </div>
                  <div className="mt-2" style={containNumber ? { color: "green" } : { color: "#dc3545" }}>
                    {t('signin_modal.password_number_alert')}
                  </div>
                  <div className="mt-2" style={containEnoughLen ? { color: "green" } : { color: "#dc3545" }}>
                    {t('signin_modal.password_length_alert')}
                  </div>
                </>
              }
            </FormGroup>
            <FormGroup>
              <Switch onChange={() => setAgree(!agree)} />
              <span className="agree-container">{t('signin_modal.i_agree')}
                <span className="policy-button" onClick={() => history.push('/general-conditions')}>{t('signin_modal.terms_of_use')}</span> {t('signin_modal.and')}
                <span className="policy-button" onClick={() => history.push('/privacy-policy')}>{t('signin_modal.privacy_policy')}</span>
              </span>
            </FormGroup>
            <Button
              htmlType='submit'
              type="primary"
              className="ant-blue-btn mt-4"
              disabled={!agree}
              loading={isLoading}
            >
              {!isLoading && t('button_group.create_account')}
            </Button>
            <div className="company-question-button-container" onClick={showCompanyModal}>
              <span className="company-question-button">{t('signin_modal.are_you_company')}</span>
            </div>

          </Form>
        )}
      />
    </div>
  )
}

export default withRouter(SignUpModal)