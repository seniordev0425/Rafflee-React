import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner, Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

function GoogleSignBtn({ isLogin }) {
  const { t } = useTranslation()

  const isLoading = useSelector(state => state.userInfo.GOOGLE_LOG_IN)
  
  return (
    <div className="pointer d-flex">
      <div className="google-icon-container1">
        <img src={images.google_signin_icon} width={30} height={30} alt="" />
      </div>
      <div
        style={{ fontFamily: 'roboto', fontSize: '1rem' }}
        className="google-icon-container2"
      >
        {isLoading
          ?
          <Spinner />
          :
          isLogin
            ?
            t('login_modal.signin_with_google')
            :
            t('login_modal.signup_with_google')
        }
      </div>
    </div>
  )
}
export default GoogleSignBtn;