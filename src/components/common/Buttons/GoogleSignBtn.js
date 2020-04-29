import React from 'react'
import { useSelector } from 'react-redux'
import { Spinner, Row, Col } from 'reactstrap'
import images from '../../../utils/images'

function GoogleSignBtn() {
    const isLoading = useSelector(state => state.userInfo.GOOGLE_LOG_IN)
    return (
        <Row className="pointer">
            <Col xs="2" className="pl-0 pr-0 google-icon-container1">
                <img src={images.google_icon} />
            </Col>
            <Col xs="10" className="pl-0 pr-0 google-icon-container2">
                {isLoading ? <Spinner /> : 'SIGN UP WITH GOOGLE'}
            </Col>
        </Row>

    )
}
export default GoogleSignBtn;