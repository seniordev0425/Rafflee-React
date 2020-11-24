import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function FaceBookSignBtn() {
  const { t } = useTranslation()

  const isLoading = useSelector(state => state.userInfo.FACEBOOK_LOG_IN)
  return (
    <div className="pointer d-flex">
      <div className="fb-icon-container1" style={{ width: 85, height: 67 }}>
        f
      </div>
      <div className="fb-icon-container2" style={{ height: 67 }}>
        {isLoading ? <Spinner /> : t('login_modal.signup_with_facebook')}
      </div>
    </div>

  )
}
export default FaceBookSignBtn;