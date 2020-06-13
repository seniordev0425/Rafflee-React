import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { TWITCH_CLIENT_ID } from '../../../utils/constants'

function TwitchConnectBtn(props) {

    const { connected } = props
    const company = useSelector(state => state.userInfo.company)

    const getTwitchToken = () => {
        if (connected) return
        if (company) {
            window.open(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://rafflee.io/twitch/connect/&scope=openid+viewing_activity_read+channel_read+user_follows_edit`, '_blank')
        } else {
            window.open(`https://id.twitch.tv/oauth2/authorize?response_type=code&client_id=${TWITCH_CLIENT_ID}&redirect_uri=https://rafflee.io/twitch/connect/&scope=openid+viewing_activity_read+user_follows_edit`, '_blank')
        } 
    }

    return (
        <Row className={connected ? "not-allowed" : "pointer"} onClick={getTwitchToken}>
            <Col xs="2" className="pl-0 pr-0 twitch-icon-container1">
                <img src={images.twitch_icon} />
            </Col>
            <Col xs="10" className="pl-0 pr-0 twitch-icon-container2">
                {connected ? 'CONNECTED WITH TWITCH' : 'CONNECT WITH TWITCH'}
            </Col>
        </Row>

    )
}
export default TwitchConnectBtn;