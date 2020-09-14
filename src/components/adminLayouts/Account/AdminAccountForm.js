import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Spin } from 'antd'
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import ImageUploader from 'react-images-upload'
import debounce from 'lodash/debounce'

import ImageCropModal from '../../modals/ImageCropModal'
import UpdateEmailModal from '../../modals/UpdateEmailModal'

import FormInput from '../../common/FormInput'

import { UPLOAD_MAX_SIZE } from '../../../utils/constants'
import {
  composeValidators,
  required,
  isEmail,
} from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

const AdminAccountForm = () => {
  const { t } = useTranslation()

  const adminProfile = useSelector(state => state.userInfo.adminProfile)
  const usernameCheckedStatus = useSelector(state => state.userInfo.usernameCheckedStatus)

  const CHECK_USER_NAME_PROCESS = useSelector(state => state.userInfo.CHECK_USER_NAME)
  const UPDATE_ADMIN_PROFILE = useSelector(state => state.userInfo.UPDATE_ADMIN_PROFILE)
  const UPDATE_EMAIL_PROCESS = useSelector(state => state.userInfo.UPDATE_EMAIL)
  const UPDATE_EMAIL_SUCCESS = useSelector(state => state.userInfo.SUCCESS_UPDATE_EMAIL)

  const [imgBase64Data, setImgBase64Data] = useState('')

  const [openImageCropModal, setOpenImageCropModal] = useState(false)
  const [openUpdateEmailModal, setOpenUpdateEmailModal] = useState(false)

  const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)
  const handleUpdateEmailModal = () => setOpenUpdateEmailModal(!openUpdateEmailModal)


  ///////////////////////////////////////////// Callback function that is called whenever profile picture changes
  const onDrop = (picture) => {
    if (picture && picture[0]) {
      var file_read = new FileReader()
      file_read.addEventListener('load', (e) => {
        setImgBase64Data(e.target.result)
      })
      file_read.readAsDataURL(picture[0])
    }
  }

  const debounceCheck = debounce(username => {
    var body = {
      username: username
    }
    // dispatch(checkUserName(body))
  }, 1000)

  ///////////////////////////////////////////// Check username exists or not
  const checkNickname = (username) => {
    debounceCheck(username)
  }

  ///////////////////////////////////////////// Update email address
  const updateEmailAddress = (newEmail) => {
    // dispatch(updateEmail({ email: newEmail }, true))
  }

  const onSubmit = () => {

  }

  return (
    <React.Fragment>
      <FinalForm
        onSubmit={onSubmit}
        render={({ handleSubmit, pristine, values }) => (
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs="12" sm="6">
                <div className="mt-4 half-width">
                  <FormGroup>
                    {(imgBase64Data || adminProfile.profile_picture) &&
                      <>
                        <img className="profile-img" src={imgBase64Data ? imgBase64Data : adminProfile.profile_picture} alt="" />
                        {imgBase64Data &&
                          <div>
                            <Button
                              onClick={handleImageCropModal}
                              type="primary"
                              className="ant-blue-btn mt-2"
                              style={{ width: 180, height: 30, fontSize: '1rem', lineHeight: 1 }}
                            >
                              {t('button_group.edit')}
                            </Button>
                          </div>
                        }
                      </>
                    }
                    <ImageUploader
                      buttonText={t('button_group.upload_profile_picture')}
                      buttonStyles={{ borderRadius: 6 }}
                      onChange={onDrop}
                      className="upload-image-container"
                      fileContainerStyle={{ boxShadow: "none", alignItems: 'flex-start' }}
                      singleImage={true}
                      withIcon={false}
                      withLabel={false}
                      maxFileSize={UPLOAD_MAX_SIZE}
                      fileSizeError='file size is too big. Max 1MB'
                    />
                  </FormGroup>
                </div>
                <div className="mt-4 half-width">
                  <FormGroup>
                    <div className="footer-link-bold mb-3">
                      {t('account_page.username')}
                      {CHECK_USER_NAME_PROCESS &&
                        <Spin size="small" className="ml-3" />
                      }
                    </div>
                    <Field
                      defaultValue={adminProfile.username}
                      name="username"
                      component={FormInput}
                      className="custom-form-control"
                      type="text"
                      placeholder={t('account_page.username')}
                    />
                    <OnChange name="username">
                      {checkNickname}
                    </OnChange>
                    {!usernameCheckedStatus &&
                      <div className="text-left invalid-feedback" style={{ display: 'block' }}>{t('account_page.username_exists')}</div>
                    }
                  </FormGroup>
                </div>
              </Col>
              <Col xs="12" sm="6">
                <div className="mt-4 w-100" >
                  <FormGroup>
                    <div className="footer-link-bold mb-3 d-flex align-items-center">
                      {t('account_page.admin_email')}
                      {adminProfile.email_verified
                        ?
                        <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                        :
                        <span className="font-size-9 color-blue ml-3">( {t('account_page.verify_your_email')} )</span>
                      }
                    </div>
                    <div className="d-xl-flex d-block justify-content-between">
                      <div className="w-xl-50 w-100">
                        <Field
                          name="email"
                          defaultValue={adminProfile.email}
                          component={FormInput}
                          className="custom-form-control"
                          type="email"
                          placeholder="name@example.com"
                          validate={composeValidators(
                            required(t('account_page.enter_valid_email')),
                            isEmail(t('account_page.enter_valid_email'))
                          )}
                          disabled
                        />
                      </div>
                      <div className="w-xl-50 w-100 mt-xl-0 mt-3">
                        <div className="d-flex justify-content-end">
                          {adminProfile.email_verified
                            ?
                            <Button
                              type="primary"
                              className="ant-blue-btn"
                              style={{ width: 200 }}
                              onClick={handleUpdateEmailModal}
                            >
                              {t('button_group.update')}
                            </Button>
                            :
                            <Button
                              type="primary"
                              className="ant-blue-btn"
                              style={{ width: 200 }}
                              // onClick={() => updateEmailAddress(companyProfile.email)}
                              loading={UPDATE_EMAIL_PROCESS}
                            >
                              {!UPDATE_EMAIL_PROCESS && t('button_group.resend_verification_email')}
                            </Button>
                          }
                        </div>
                      </div>
                    </div>
                  </FormGroup>
                </div>

                <div className="upload-btn">
                  <Button
                    disabled={!usernameCheckedStatus}
                    htmlType='submit'
                    type="primary"
                    className="ant-blue-btn mt-2"
                    style={{ width: 200 }}
                    loading={UPDATE_ADMIN_PROFILE}
                  >
                    {!UPDATE_ADMIN_PROFILE && t('button_group.update')}
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        )}
      />
      <ImageCropModal
        open={openImageCropModal}
        onToggle={handleImageCropModal}
        setBase64Data={(value) => setImgBase64Data(value)}
        src={imgBase64Data}
      />
      <UpdateEmailModal
        open={openUpdateEmailModal}
        onToggle={handleUpdateEmailModal}
        updateEmail={updateEmailAddress}
      />
    </React.Fragment>
  )
}

export default AdminAccountForm