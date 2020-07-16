import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Radio, Button } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup } from 'reactstrap'
import FormInput from '../components/common/FormInput'
import AppLayout from '../components/layouts/AppLayout'
import { required } from '../utils/validation'
import { betaReport } from '../actions/homepage'
import { useTranslation } from 'react-i18next'

function Report() {
  const { t } = useTranslation()

  const BETA_REPORT_PROCESS = useSelector(state => state.userInfo.BETA_REPORT)
  const dispatch = useDispatch()

  const [mode, setMode] = useState('bug')

  const handleModeChange = (e) => {
    setMode(e.target.value)
  }

  const onSubmit = (values) => {
    var body = {
      context: values.context,
      type: mode,
      description: values.description
    }
    dispatch(betaReport(body))
  }

  return (
    <AppLayout>
      <div className="d-flex justify-content-center py-4">
        <div className="min-height-container">
          <div className="d-flex justify-content-center">
            <Radio.Group onChange={handleModeChange} value={mode} style={{ marginBottom: 8 }} buttonStyle='solid'>
              <Radio.Button value="bug" style={{ width: 100, textAlign: 'center', borderRadius: 0 }} className="mr-2">{t('report_page.bug')}</Radio.Button>
              <Radio.Button value="feedback" style={{ width: 100, textAlign: 'center', borderRadius: 0 }} className="ml-2">{t('report_page.feedback')}</Radio.Button>
            </Radio.Group>
          </div>
          <div className="mt-5" style={{ width: 350 }}>
            <FinalForm
              onSubmit={onSubmit}
              render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <div className="footer-link-bold mb-3">{t('report_page.context')}</div>
                    <Field
                      name="context"
                      component={FormInput}
                      className="company-contact-form-text-area"
                      type="textarea"
                      rows={2}
                      validate={required(t('report_page.context_required'))}
                    />
                  </FormGroup>
                  <FormGroup>
                    <div className="footer-link-bold mb-3">{t('report_page.description')}</div>
                    <Field
                      name="description"
                      component={FormInput}
                      className="company-contact-form-text-area"
                      type="textarea"
                      rows={5}
                      validate={required(t('report_page.description_required'))}
                    />
                  </FormGroup>
                  <Button
                    htmlType="submit"
                    type="primary"
                    className="ant-blue-btn mt-4"
                    loading={BETA_REPORT_PROCESS}
                  >
                    {!BETA_REPORT_PROCESS && t('button_group.confirm')}
                  </Button>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Report