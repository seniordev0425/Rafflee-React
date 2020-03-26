import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'

function FaceBookSignBtn(){

    const isLoading = useSelector(state=>state.userInfo.FACEBOOK_LOG_IN)
    return(

            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                    f
                </Col>
                <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                    SIGN UP WITH FACEBOOK
                </Col>
            </Row>

    )
}
export default FaceBookSignBtn;