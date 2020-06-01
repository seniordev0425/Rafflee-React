import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function InstagramConnectBtn(){
    return(

            <Row className="not-allowed">
                <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
                    <img src={images.instagram_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
                    CONNECT WITH INSTAGRAM
                </Col>
            </Row>

    )
}
export default InstagramConnectBtn;