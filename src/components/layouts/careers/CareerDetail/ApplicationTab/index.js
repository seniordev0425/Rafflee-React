import React, { useCallback } from 'react'
import { Button } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import FormInput from '../../../../common/FormInput'
import { required } from '../../../../../utils/validation'

import { useTranslation } from 'react-i18next'

const ApplicationTab = () => {
  const { t } = useTranslation()

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const onSubmit = () => {

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
                name="phone"
                component={FormInput}
                className="custom-form-control"
                type="text"
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
                <span className="footer-link-bold">{t('career_page.upload_file')}</span>
              }
            </div>
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
              onClick={null}
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
              onClick={null}
              type="primary"
              className="ant-blue-btn mt-3 mt-md-0"
              style={{ width: 500, maxWidth: '90%', height: 40, fontSize: '1rem', lineHeight: 1 }}
            >
              {t('button_group.submit')}
            </Button>
          </div>
        </Form>
      )}
    />
  )
}

export default ApplicationTab