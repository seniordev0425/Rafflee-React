import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function TwitterConnectBtn(){
    return(

            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 twitter-icon-container1">
                    <img src={images.twitter_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 twitter-icon-container2">
                    CONNECT WITH TWITTER
                </Col>
            </Row>

    )
}
export default TwitterConnectBtn;