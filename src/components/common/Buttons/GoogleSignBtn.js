import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function GoogleSignBtn(){
    return(

            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 google-icon-container1">
                    <img src={images.google_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 google-icon-container2">
                    SIGN UP WITH GOOGLE 
                </Col>
            </Row>

    )
}
export default GoogleSignBtn;