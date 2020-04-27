import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function GoogleSignBtn(){
    const GET_GOOGLE_AUTH_URL = useSelector(state => state.userInfo.GET_GOOGLE_AUTH_URL)
    const googleConnect = () => {

    }

    return(

            <Row className="pointer" onClick={googleConnect}>
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