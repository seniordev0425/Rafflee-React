import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { twitterConnectStep1 } from '../../../actions/userInfo'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function TwitterConnectBtn(props) {
    const { t } = useTranslation()

    const { connected } = props

    const dispatch = useDispatch()
    const twitter_oauth_token = useSelector(state => state.userInfo.twitter_oauth_token)

    useEffect(() => {
        if (twitter_oauth_token) {
            dispatch({ type: 'INIT_STATE', state: 'twitter_oauth_token', data: '' })
            window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${twitter_oauth_token}`, '_blank')
        }
    }, [twitter_oauth_token])

    const twitterConnect = () => {
        if (connected) return
        dispatch(twitterConnectStep1())
    }

    return (
        <Row className={connected ? "not-allowed" : "pointer"} onClick={twitterConnect}>
            <Col xs="2" className="pl-0 pr-0 twitter-icon-container1">
                <img src={images.twitter_icon} alt="" />
            </Col>
            <Col xs="10" className="pl-0 pr-0 twitter-icon-container2">
                {connected ? t('account_page.twitter_connected') : t('account_page.twitter_connect')}
            </Col>
        </Row>
    )
}
export default TwitterConnectBtn;