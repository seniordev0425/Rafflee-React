import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Spinner } from 'reactstrap'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { FACEBOOK_APP_ID } from '../../../utils/constants'
import { facebookConnect } from '../../../actions/userInfo'
import { useTranslation } from 'react-i18next'

function FaceBookConnectBtn(props) {
    const { t } = useTranslation()

    const { connected } = props

    const company = useSelector(state => state.userInfo.company)
    const FACEBOOK_CONNECT_PROCESS = useSelector(state => state.userInfo.FACEBOOK_CONNECT)
    const dispatch = useDispatch()


    const CustomButton = () => (
        <Row className={connected ? "not-allowed" : "pointer"}>
            <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                f
            </Col>
            <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                {FACEBOOK_CONNECT_PROCESS ? <Spinner/> : connected ? t('account_page.facebook_connected') : t('account_page.facebook_connect')}
            </Col>
        </Row>
    )

    const responseFacebook = (response) => {
        var body = {
            token: response.accessToken
        }
        dispatch(facebookConnect(body, company))
    }


    return (
        <FacebookLogin
            appId={FACEBOOK_APP_ID}
            fields="email,user_likes,user_posts,user_gender,publish_to_groups,groups_access_member_info"
            callback={responseFacebook}
            render={renderProps => (
                <div onClick={renderProps.onClick}><CustomButton /></div>
            )}
        />
    )
}
export default FaceBookConnectBtn;