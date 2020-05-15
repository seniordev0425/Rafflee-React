import React from 'react'
import { Row, Col} from 'reactstrap'

function FaceBookConnectBtn(){
    return(
            <Row className="pointer">
                <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                    f
                </Col>
                <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                    CONNECT WITH FACEBOOK
                </Col>
            </Row>
    )
}
export default FaceBookConnectBtn;