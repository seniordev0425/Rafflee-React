import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { twitterConnectStep1 } from '../../../actions/userInfo'
import images from '../../../utils/images'

function TwitterConnectBtn() {

    const dispatch = useDispatch()
    const twitter_oauth_token = useSelector(state => state.userInfo.twitter_oauth_token)

    useEffect(() => {
        if (twitter_oauth_token) {
            dispatch({ type: 'INIT_STATE', state: 'twitter_oauth_token', data: '' })
            window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${twitter_oauth_token}`, '_blank')
        }
    }, [twitter_oauth_token])

    const twitterConnect = () => {
        dispatch(twitterConnectStep1())
    }

    return (

        <Row className="pointer" onClick={twitterConnect}>
            <Col xs="2" className="pl-0 pr-0 twitter-icon-container1">
                <img src={images.twitter_icon} />
            </Col>
            <Col xs="10" className="pl-0 pr-0 twitter-icon-container2">
                CONNECT WITH TWITTER
                </Col>
        </Row>

    )
}
export default TwitterConnectBtn;