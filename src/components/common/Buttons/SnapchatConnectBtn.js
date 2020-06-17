import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'

function SnapchatConnectBtn(props) {
    const { connected } = props

    const dispatch = useDispatch()

    const snapchatConnect = () => {

    }

    return (
        <Row className={connected ? "not-allowed" : "pointer"} onClick={snapchatConnect}>
            <Col xs="2" className="pl-0 pr-0 snapchat-icon-container1">
                <img src={images.snapchat_icon} />
            </Col>
            <Col xs="10" className="pl-0 pr-0 snapchat-icon-container2">
                {connected ? 'CONNECTED WITH SNAPCHAT' : 'CONNECT WITH SNAPCHAT'}
            </Col>
        </Row>
    )
}
export default SnapchatConnectBtn