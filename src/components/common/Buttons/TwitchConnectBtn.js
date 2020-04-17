import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function TwitchConnectBtn(){
    
    return(
            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 twitch-icon-container1">
                    <img src={images.twitch_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 twitch-icon-container2">
                    CONNECT WITH TWITCH
                </Col>
            </Row>

    )
}
export default TwitchConnectBtn;