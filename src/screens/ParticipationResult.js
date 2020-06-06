import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'

import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import { participationResult } from '../actions/userInfo'
import images from '../utils/images'
import Loading from '../components/common/Loading'
import { useTranslation } from 'react-i18next'

function ParticipationResult(props) {
    const { t } = useTranslation()
    const { match } = props
    const participation_result = useSelector(state => state.userInfo.participationResult)
    const PARTICIPATION_RESULT_PROCESS = useSelector(state => state.userInfo.PARTICIPATION_RESULT)
    const PARTICIPATION_RESULT_SUCCESS = useSelector(state => state.userInfo.SUCCESS_PARTICIPATION_RESULT)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(participationResult(match.params.id))
    }, [])

    useEffect(() => {
        if (PARTICIPATION_RESULT_SUCCESS) {
            dispatch({type: 'INIT_STATE', state: 'SUCCESS_PARTICIPATION_RESULT', data: false})
        }
    }, [PARTICIPATION_RESULT_SUCCESS])

    if (PARTICIPATION_RESULT_PROCESS) return <Loading />
    
    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <Row style={{ borderTop: "2px solid #7e9aa817" }}>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row className="my-5">
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={participation_result.campaign_image ? participation_result.campaign_image : images.profile_img} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">{participation_result.campaign_name}</div>
                            <div className="d-flex justify-content-between">
                                <div style={{ width: "70%" }} className="promotion-list-item-text">{participation_result.campaign_description}</div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel mt-4 mb-5">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={participation_result.giveaway_image_url ? participation_result.giveaway_image_url : images.campaign} width="100%" height="100%" />
                            </div>
                        </Col>
                        <Col className="px-0 center">
                            <div className="mt-3 ml-3 mt-lg-5 ml-lg-5">{t('campaign_detail_page.giveway_name')}</div>
                            <div className="d-flex ml-3 ml-lg-5 mt-3">
                                <img src={images.award} width="30" height="40" />
                                <div className="ml-4  color-blue">
                                    {participation_result.giveaway_name}
                                </div>
                            </div>
                        </Col>
                        <Col className="px-0 dotted-left-border" >
                            <div className="top-half-circle"></div>
                            <div className="bottom-half-circle"></div>
                            <div className="mt-3 ml-3 mt-lg-5 ml-lg-5">{t('campaign_detail_page.giveway_description')}</div>
                            <div className="color-blue ml-3 ml-lg-5 mt-3">{participation_result.giveaway_description}</div>
                        </Col>
                    </Row>

                    <Row className="campaign-main-panel-mobile mt-3 mb-3">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={participation_result.giveaway_image_url ? participation_result.giveaway_image_url : images.campaign} width="100%" />
                            </div>
                        </Col>
                        <Col className="px-0 center d-flex justify-content-center">
                            <div>
                                <div className="mt-2 ml-2">{t('campaign_detail_page.giveway_name')}</div>
                                <div className="d-flex mt-2 ml-2">
                                    <img src={images.award} width="20" height="25" />
                                    <div className="ml-4 color-blue">
                                        {participation_result.giveaway_name}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel-mobile-footer px-3">
                        <div>
                            <div className="mt-2">{t('campaign_detail_page.giveway_description')}</div>
                            <div className="color-blue">{participation_result.giveaway_description}</div>
                        </div>
                    </Row>
                </Col>
            </Row>
            <FooterLink />
            <Footer />
        </div>
    )
}

export default ParticipationResult