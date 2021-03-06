import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function FaceBookSignBtn({ isLogin }) {
  const { t } = useTranslation()

  const isLoading = useSelector(state => state.userInfo.FACEBOOK_LOG_IN)
  
  return (
    <div className="pointer d-flex">
      <div className="fb-icon-container1" style={{ width: 60, height: 50 }}>
        f
      </div>
      <div className="fb-icon-container2" style={{ fontFamily: 'roboto', fontSize: '1rem', height: 50 }}>
        {isLoading
          ?
          <Spinner />
          :
          isLogin
            ?
            t('login_modal.signin_with_facebook')
            :
            t('login_modal.signup_with_facebook')
        }
      </div>
    </div>

  )
}
export default FaceBookSignBtn;