import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    Modal,
    ModalHeader,
    ModalBody,
    Row,
    Col,
    Spinner
} from 'reactstrap'
import { Select, Button } from 'antd'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import images from '../../utils/images'
import { FACEBOOK_APP_ID, INSTAGRAM_CLIENT_ID } from '../../utils/constants'
import {
    instagramBusinessConnect,
    instagramBusinessConnectValidation
} from '../../actions/social'
import { useTranslation } from 'react-i18next'
import { openNotification } from '../../utils/notification'

const { Option } = Select

function InstagramConnectModal(props) {
    const { t } = useTranslation()
    const { open, onToggle, onClose } = props

    const GET_INSTAGRAM_BUSINESS_PAGES_PROCESS = useSelector(state => state.userInfo.GET_INSTAGRAM_BUSINESS_PAGES)
    const VALIDATE_INSTAGRAM_BUSINESS_CONNECT = useSelector(state => state.userInfo.VALIDATE_INSTAGRAM_BUSINESS_CONNECT)
    const SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT = useSelector(state => state.userInfo.SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT)
    const instagramBusinessPages = useSelector(state => state.social.instagramBusinessPages)
    const dispatch = useDispatch()

    const [selectedPageId, setSelectedPageId] = useState('')

    const CustomButton = () => (
        <Row className="pointer mt-5">
            <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
                <img src={images.instagram_icon} alt="" />
            </Col>
            <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
                {GET_INSTAGRAM_BUSINESS_PAGES_PROCESS
                    ?
                    <Spinner />
                    :
                    t('instagram_connect_modal.instagram_business_connect')
                }
            </Col>
        </Row>
    )

    useEffect(() => {
        if (SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT', data: false })
            openNotification('success', t('social_oauth.instagram'))
            onClose()
        }
    }, [SUCCESS_VALIDATE_INSTAGRAM_BUSINESS_CONNECT])

    const instagramBasicConnect = () => {
        window.open(`https://www.instagram.com/oauth/authorize?client_id=${INSTAGRAM_CLIENT_ID}&redirect_uri=https://rafflee.io/instagram/connect/&scope=user_profile,user_media&response_type=code`, '_blank')
        onClose()
    }

    const getInstagramBusinessPages = (response) => {
        var body = {
            token: response.accessToken
        }
        dispatch(instagramBusinessConnect(body))
    }

    const validateInstagramBusinessConnect = () => {
        if (selectedPageId === '') {
            openNotification('warning', t('instagram_connect_modal.select_page'))
            return
        }

        var body = {
            id: selectedPageId
        }
        dispatch(instagramBusinessConnectValidation(body))
    }

    return (
        <Modal isOpen={open} toggle={onToggle} >
            <ModalHeader toggle={onToggle}>
                <div className="text-center font-size-15 color-blue">
                    {t('instagram_connect_modal.instagram_connect')}
                </div>
            </ModalHeader>
            <ModalBody className="d-flex justify-content-center">
                <div style={{ width: 320 }}>
                    <Row className="pointer mt-5" onClick={instagramBasicConnect}>
                        <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
                            <img src={images.instagram_icon} alt="" />
                        </Col>
                        <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
                            {t('instagram_connect_modal.instagram_basic_connect')}
                        </Col>
                    </Row>
                    <FacebookLogin
                        appId={FACEBOOK_APP_ID}
                        fields="instagram_basic,manage_pages"
                        callback={getInstagramBusinessPages}
                        render={renderProps => (
                            <div onClick={renderProps.onClick}><CustomButton /></div>
                        )}
                    />
                    {instagramBusinessPages.length > 0 &&
                        <div>
                            <Select
                                className="w-100 my-3"
                                placeholder={t('create_campaign_page.select_page')}
                                onChange={(id) => setSelectedPageId(id)}
                                size="large"
                            >
                                {instagramBusinessPages.map((page, id) => (
                                    <Option key={id} value={page.id}>
                                        {page.name}
                                    </Option>
                                ))}
                            </Select>
                            <div className="mb-4 d-flex justify-content-center">
                                <Button
                                    onClick={validateInstagramBusinessConnect}
                                    type="primary"
                                    className="ant-blue-btn"
                                    loading={VALIDATE_INSTAGRAM_BUSINESS_CONNECT}
                                >
                                    {!VALIDATE_INSTAGRAM_BUSINESS_CONNECT && t('button_group.update')}
                                </Button>
                            </div>
                        </div>
                    }
                </div>
            </ModalBody>
        </Modal>
    )
}

export default InstagramConnectModal