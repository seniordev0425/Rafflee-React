import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import { useHistory } from "react-router-dom"
import { Form, FormGroup, Row, Col } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import FormInput from '../../../../common/FormInput'
import FormPhoneInput from '../../../../common/FormPhoneInput'
import { required } from '../../../../../utils/validation'

import { applyRecruitment } from '../../../../../actions/homepage'

import { useTranslation } from 'react-i18next'

const ApplicationTab = ({ recruitment }) => {
  const { t } = useTranslation()

  const history = useHistory()
  const APPLY_RECRUITMENT_PROCESS = useSelector(state => state.userInfo.APPLY_RECRUITMENT)
  const dispatch = useDispatch()

  const [resumeFile, setResumeFile] = useState(null)
  const [resumeFileName, setResumeFileName] = useState('')
  const [isResumeRequired, setIsResumeRequired] = useState(false)

  const onDrop = useCallback(acceptedFiles => {
    if (acceptedFiles && acceptedFiles[0]) {
      const reader = new FileReader()
      reader.onload = () => {
        setResumeFile(reader.result)
        setResumeFileName(acceptedFiles[0].name)
      }
      reader.readAsArrayBuffer(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'application/pdf' })

  const onSubmit = (values) => {
    if (!resumeFileName) {
      return
    }
    var formData = new FormData()
    formData.append('job_pk', recruitment.pk)
    formData.append('firstname', values.first_name)
    formData.append('lastname', values.last_name)
    formData.append('prefix_number', values.phonenumber?.phone_country)
    formData.append('phone_number', values.phonenumber?.phone_number)
    formData.append('summary', values.phonenumber?.summary)
    formData.append('cover_letter', values.phonenumber?.coverletter)
    formData.append('resume', resumeFile)
    dispatch(applyRecruitment(formData))
  }

  return (
    <FinalForm
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <Row className="justify-content-between">
            <Col xs="12" md="5" className="p-0">
              <FormGroup>
                <div className="footer-link-bold mb-2">{`*${t('career_page.first_name')}`}</div>
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
                <div className="footer-link-bold mb-2">{`*${t('career_page.last_name')}`}</div>
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
            <FormGroup>
              <div className="footer-link-bold mb-2">{t('career_page.phone')}</div>
              <Field
                name="phonenumber"
                component={FormPhoneInput}
                className="custom-form-control"
              />
            </FormGroup>
          </div>
          <div className="mt-4">
            <FormGroup>
              <div className="footer-link-bold mb-2">{t('career_page.summary')}</div>
              <Field
                name="summary"
                component={FormInput}
                className="company-contact-form-text-area"
                type="textarea"
              />
            </FormGroup>
          </div>
          <div>
            <div className="footer-link-bold mb-2">{t('career_page.resume')}</div>
            <div {...getRootProps({ className: 'dropzone' })}>
              <input {...getInputProps()} />
              {
                <React.Fragment>
                  <div className="footer-link-bold">{resumeFileName || t('career_page.upload_file')}</div>
                </React.Fragment>

              }
            </div>
            {isResumeRequired && resumeFileName === '' &&
              <div className="invalid-feedback d-block">Resume is required</div>
            }
          </div>
          <div className="mt-4">
            <FormGroup>
              <div className="footer-link-bold mb-2">{t('career_page.coverletter')}</div>
              <Field
                name="coverletter"
                component={FormInput}
                className="company-contact-form-text-area"
                type="textarea"
              />
            </FormGroup>
          </div>

          <div className="d-block d-md-flex justify-content-between mt-5">
            <Button
              onClick={() => history.goBack()}
              style={{
                width: 500,
                maxWidth: '90%',
                height: 40,
                fontSize: '1rem',
                lineHeight: 1,
                color: '#0091ff',
                borderColor: '#0091ff',
                borderRadius: 6
              }}
            >
              {t('button_group.back_to_job_opening')}
            </Button>
            <Button
              onClick={() => setIsResumeRequired(true)}
              type="primary"
              htmlType='submit'
              className="ant-blue-btn mt-3 mt-md-0"
              style={{ width: 500, maxWidth: '90%', height: 40, fontSize: '1rem', lineHeight: 1 }}
              loading={APPLY_RECRUITMENT_PROCESS}
            >
              {!APPLY_RECRUITMENT_PROCESS && t('button_group.submit')}
            </Button>
          </div>
        </Form>
      )}
    />
  )
}

export default ApplicationTab