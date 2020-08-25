import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { deviceDetect, isMobile } from 'react-device-detect'
import PropTypes from 'prop-types'
import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'
import CompanyModal from './CompanyModal'
import { Row, Modal, ModalHeader, ModalBody } from 'reactstrap'
import GoogleSignBtn from '../common/Buttons/GoogleSignBtn'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import GoogleLogin from 'react-google-login'
import FaceBookSignBtn from '../common/Buttons/FaceBookSignBtn'
import { FACEBOOK_APP_ID } from '../../utils/constants'
import { GOOGLE_CLIENT_ID } from '../../utils/constants'
import { facebookLogin, googleLogin } from '../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function LoginSignupBaseModal(props) {
  const { t } = useTranslation()

  const {
    isLogin,
    switch_login_signin,
    modal,
    toggle,
    companyStatus,
    showCompanyModal
  } = props

  const ip = useSelector(state => state.userInfo.ip)
  const token = useSelector(state => state.userInfo.token)
  const dispatch = useDispatch()

  const responseFacebook = (response) => {
    var body = {
      device_id: isMobile ? deviceDetect().model : 'Laptop',
      ip: ip,
      access_token: response.accessToken
    }
    dispatch(facebookLogin(body))
  }

  const responseGoogle = (response) => {
    var body = {
      device_id: isMobile ? deviceDetect().model : 'Laptop',
      ip: ip,
      code: response.tokenId,
      device: 'web'
    }
    dispatch(googleLogin(body))
  }

  return (
    <>
      <Modal isOpen={modal && !token} toggle={toggle} style={{ top: 165, maxWidth: 400 }}>
        <ModalHeader toggle={toggle} style={{ borderBottom: 'none' }}></ModalHeader>
        <ModalBody className="modal-body-padding">
          {companyStatus === true ? (<CompanyModal />) : (
            <div style={{ fontFamily: "sofiapro" }}>
              <Row style={{ margin: 0 }}>
                <div
                  className="modal-login-btn"
                  style={isLogin ? { opacity: 1 } : { opacity: 0.25 }}
                  onClick={() => switch_login_signin(true)}
                >
                  {t('header.log_in')}
                </div>
                <div
                  className="modal-signin-btn"
                  style={isLogin ? { opacity: 0.25 } : { opacity: 1 }}
                  onClick={() => switch_login_signin(false)}
                >
                  {t('header.sign_in')}
                </div>
              </Row>
              <div style={{ marginTop: "2rem" }}>
                {isLogin ? (<LogInModal toggle={toggle} />) : (<SignUpModal toggle={toggle} showCompanyModal={showCompanyModal} />)}
              </div>
              <div className="or-divider-container">
                <h2>
                  <span className="or-divider-text">
                    {t('signin_modal.or')}
                  </span>
                </h2>
              </div>
              <div style={{ marginTop: "2rem" }}>
                <FacebookLogin
                  appId={FACEBOOK_APP_ID}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={renderProps => (
                    <div onClick={renderProps.onClick}><FaceBookSignBtn /></div>
                  )}
                  onFailure={() => null}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <GoogleLogin
                  clientId={GOOGLE_CLIENT_ID}
                  render={renderProps => (
                    <div onClick={renderProps.onClick} disabled={renderProps.disabled}><GoogleSignBtn /></div>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={() => void 0}
                  cookiePolicy={'single_host_origin'}
                />
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

LoginSignupBaseModal.propTypes = {
  isLogin: PropTypes.bool,
  modal: PropTypes.bool,
  toggle: PropTypes.func,
  companyStatus: PropTypes.bool,
  showCompanyModal: PropTypes.func
}

export default LoginSignupBaseModal