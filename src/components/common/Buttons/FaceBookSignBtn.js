import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Spinner } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function FaceBookSignBtn(){
    const { t } = useTranslation()

    const isLoading = useSelector(state=>state.userInfo.FACEBOOK_LOG_IN)
    return(
            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                    f
                </Col>
                <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                    {isLoading ? <Spinner/> : t('login_modal.signup_with_facebook')}
                </Col>
            </Row>

    )
}
export default FaceBookSignBtn;