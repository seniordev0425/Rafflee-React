import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

function SteamConnectBtn(){
    return(

            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 steam-icon-container1">
                    <img src={images.steam_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 steam-icon-container2">
                    CONNECT WITH STEAM
                </Col>
            </Row>

    )
}
export default SteamConnectBtn;