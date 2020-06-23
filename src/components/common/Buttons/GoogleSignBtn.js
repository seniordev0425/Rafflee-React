import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner, Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

function GoogleSignBtn() {
    const { t } = useTranslation()

    const isLoading = useSelector(state => state.userInfo.GOOGLE_LOG_IN)
    return (
        <Row className="pointer">
            <Col xs="2" className="pl-0 pr-0 google-icon-container1">
                <img src={images.google_icon} alt="" />
            </Col>
            <Col xs="10" className="pl-0 pr-0 google-icon-container2">
                {isLoading ? <Spinner /> : t('login_modal.signup_with_google')}
            </Col>
        </Row>

    )
}
export default GoogleSignBtn;