import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function FaceBookConnectBtn(){
    return(
            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                    <img src={images.fb_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                    CONNECT WITH FACEBOOK
                </Col>
            </Row>
    )
}
export default FaceBookConnectBtn;