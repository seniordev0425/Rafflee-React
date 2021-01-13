import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form as FinalForm, Field } from 'react-final-form'
import { Form } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../../../common/FormInput'

import DeleteAccountModal from '../../../modals/DeleteAccount'

import { accountDeleteEmail } from '../../../../actions/userInfo'

import { required } from '../../../../utils/validation'
import { useTranslation } from 'react-i18next'

function DeactivateSection() {
  const { t } = useTranslation()

  const ACCOUNT_DELETE_EMAIL_PROCESS = useSelector(state => state.userInfo.ACCOUNT_DELETE_EMAIL)
  const ACCOUNT_DELETE_EMAIL_SUCCESS = useSelector(state => state.userInfo.SUCCESS_ACCOUNT_DELETE_EMAIL)
  const dispatch = useDispatch()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [receivedToken, setReceivedToken] = useState(false)

  const onSubmit = () => {
    dispatch(accountDeleteEmail())
  }

  const onValidate = ({ token }) => {
    setOpenConfirmModal(true)
    setReceivedToken(token)
  }

  return (
    <div className="reset-password-form min-height-container">
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Button
              htmlType="submit"
              type="danger"
              className="ant-red-btn mt-4"
              loading={ACCOUNT_DELETE_EMAIL_PROCESS}
            >
              {!ACCOUNT_DELETE_EMAIL_PROCESS && t('button_group.delete_account')}
            </Button>
          </Form>
        )}
      />
      {ACCOUNT_DELETE_EMAIL_SUCCESS &&
        <FinalForm
          onSubmit={onValidate}
          render={({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="color-gray font-size-12 font-weight-bold my-4">
                {t('user_settings_page.enter_token')}
              </div>
              <Field
                name="token"
                component={FormInput}
                className="company-contact-form-text-area"
                type="textarea"
                validate={required(t('admin_recruitment_page.required_field'))}
              />
              <Button
                htmlType="submit"
                type="primary"
                className="ant-blue-btn mt-4"
              >
                {t('button_group.validate')}
              </Button>
            </Form>
          )}
        />
      }
      <DeleteAccountModal
        open={openConfirmModal}
        onToggle={() => setOpenConfirmModal(!openConfirmModal)}
        receivedToken={receivedToken}
      />
    </div>
  )
}

export default DeactivateSection