import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner, Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

function GoogleSignBtn() {
  const { t } = useTranslation()

  const isLoading = useSelector(state => state.userInfo.GOOGLE_LOG_IN)
  return (
    <div className="pointer" style={{ marginLeft: -5, marginRight: -5 }}>
      <img src={images.google_signin_button} width={'100%'} alt="" />
      {isLoading && <Spinner style={{ position: 'relative', left: '50%', top: -55 }} />}
    </div>

  )
}
export default GoogleSignBtn;