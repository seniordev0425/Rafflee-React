import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../../../../components/common/FormInput'
import { updatePassword } from '../../../../actions/userInfo'
import { required } from '../../../../utils/validation'

import { useTranslation } from 'react-i18next'

function PasswordSection() {
  const { t } = useTranslation()

  const UPDATE_PASSWORD_PROCESS = useSelector(state => state.userInfo.UPDATE_PASSWORD)
  const dispatch = useDispatch()

  const onSubmit = (values) => {
    var body = {
      old_password: values.old_password,
      new_password: values.new_password,
      repeat_new_password: values.repeat_new_password
    }
    dispatch(updatePassword(body))
  }

  return (
    <div className="reset-password-form min-height-container">
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <div className="footer-link-bold mb-3">{t('user_settings_page.current_password')}</div>
              <Field
                name="old_password"
                component={FormInput}
                className="custom-form-control"
                type="password"
                validate={required(t('signin_modal.password_required'))}
              />
            </FormGroup>
            <FormGroup>
              <div className="footer-link-bold mb-3">{t('user_settings_page.new_password')}</div>
              <Field
                name="new_password"
                component={FormInput}
                className="custom-form-control"
                type="password"
                validate={required(t('signin_modal.password_required'))}
              />
            </FormGroup>
            <FormGroup>
              <div className="footer-link-bold mb-3">{t('user_settings_page.confirm_new_password')}</div>
              <Field
                name="repeat_new_password"
                component={FormInput}
                className="custom-form-control"
                type="password"
                validate={required(t('signin_modal.confirm_password_required'))}
              />
            </FormGroup>
            <Button
              htmlType="submit"
              type="primary"
              className="ant-blue-btn mt-4"
              loading={UPDATE_PASSWORD_PROCESS}
            >
              {!UPDATE_PASSWORD_PROCESS && t('button_group.update')}
            </Button>
          </Form>
        )}
      />
    </div>
  )
}

export default PasswordSection