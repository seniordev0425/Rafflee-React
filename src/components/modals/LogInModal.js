import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup } from 'reactstrap'
import { Button } from 'antd'
import { deviceDetect, isMobile } from 'react-device-detect'
import FormInput from '../common/FormInput'
import FormCheckbox from '../common/FormCheckbox'
import ForgotPassword from './ForgotPassword'
import { logIn, verifyCaptcha } from '../../actions/userInfo'
import { required } from '../../utils/validation'
import { LANGUAGE_NAME } from '../../utils/constants'

import { useTranslation } from 'react-i18next'

import { useGoogleReCaptcha, GoogleReCaptcha } from 'react-google-recaptcha-v3'

function LogInModal(props) {
  const { t, i18n } = useTranslation()

  const { executeRecaptcha } = useGoogleReCaptcha()

  const { toggle } = props

  const LON_IN_PROCESS = useSelector(state => state.userInfo.LOG_IN)
  const VERIFY_CAPTCHA_PROCESS = useSelector(state => state.userInfo.VERIFY_CAPTCHA)
  const ip = useSelector(state => state.userInfo.ip)
  const dispatch = useDispatch()


  const [openForgotModal, setOpenForgotModal] = useState(false)

  const handleForgotModal = () => setOpenForgotModal(!openForgotModal)

  const onSubmit = async (values) => {
    const captcha_token = await executeRecaptcha('login_form')
    if (captcha_token.length < 20) return

    var body = {
      username: values.username,
      password: values.password,
      device_id: isMobile ? deviceDetect().model : 'Laptop',
      ip: ip,
      language: LANGUAGE_NAME[i18n.language]
    }
    dispatch(verifyCaptcha({ captcha_token }, logIn(body, values.rememberMe)))
  }

  return (
    <div>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
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
                name="password"
                component={FormInput}
                className="custom-form-control"
                type="password"
                placeholder={t('signin_modal.password')}
                validate={required(t('signin_modal.password_required'))}
              />
            </FormGroup>
            <FormGroup className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <Field
                  name="rememberMe"
                  component={FormCheckbox}
                  type="checkbox"
                />
                <span className="ml-1" style={{ color: '#7E9AA8' }}> {t('login_modal.remember_me')}</span>
              </div>
              <span
                className="policy-button"
                onClick={handleForgotModal}
                style={{ color: '#7E9AA8' }}
              >
                {t('login_modal.forgot_password')}
              </span>
            </FormGroup>
            <Button
              htmlType="submit"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={LON_IN_PROCESS || VERIFY_CAPTCHA_PROCESS}
            >
              {!LON_IN_PROCESS && !VERIFY_CAPTCHA_PROCESS && t('button_group.log_in')}
            </Button>
          </Form>
        )}
      />
      <ForgotPassword
        open={openForgotModal}
        onToggle={handleForgotModal}
        toggle={toggle}
      />

      <GoogleReCaptcha
        action={'login_form'}
      />
    </div>
  )
}

export default LogInModal