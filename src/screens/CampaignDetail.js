import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'
import moment from 'moment'

import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import images from '../utils/images'
import CustomCollapsePanel from '../components/common/CustomCollapsePanel'
import CustomCollapsePanelForPoll from '../components/common/CustomCollapsePanelForPoll'
import Loading from '../components/common/Loading'
import {
    campaignParticipate,
    getCampaignData,
    updateFavorite,
    campaignParticipateTwitterLike,
    campaignParticipateTwitterRetweet
} from '../actions/campaign'
import { getUserProfile } from '../actions/userInfo'

import { useTranslation } from 'react-i18next'
import VideoPlayerModal from '../components/modals/VideoPlayerModal'
import ParticipateConfirmModal from '../components/modals/ParticipateConfirmModal'
import TwitterLikeValidationModal from '../components/modals/ActionValidationModals/TwitterLikeValidationModal'
import TwitterRetweetValidationModal from '../components/modals/ActionValidationModals/TwitterRetweetValidationModal'

let actionParams = []

function CampaignDetail(props) {
    const { t } = useTranslation()

    const { match } = props

    const GET_CAMPAIGN_DATA_SUCCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_DATA_SUCCESS)
    const GET_USER_PROFILE_SUCCESS = useSelector(state => state.userInfo.GET_USER_PROFILE_SUCCESS)
    const CAMPAIGN_PARTICIPATE_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE)
    const CAMPAIGN_PARTICIPATE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CAMPAIGN_PARTICIPATE)

    const OPEN_TWITTER_LIKE_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_LIKE_VALIDATION_MODAL)
    const OPEN_TWITTER_RETWEET_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_RETWEET_VALIDATION_MODAL)

    const campaignData = useSelector(state => state.campaign.campaignData)
    const token = useSelector(state => state.userInfo.token)
    const company = useSelector(state => state.userInfo.company)
    const dispatch = useDispatch()

    const [action, setAction] = useState({})
    const [openVideo, setOpenVideo] = useState(false)
    const [isVideoEnded, setIsVideoEnded] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)
    const [answers, setAnswers] = useState([])

    const [openTwitterLikeModal, setOpenTwitterLikeModal] = useState(false)
    const [openTwitterRetweetModal, setOpenTwitterRetweetModal] = useState(false)

    useEffect(() => {
        document.title = "Campaign Detail"
        var body = {
            token: token
        }
        dispatch(getCampaignData(match.params.id, body))
        if (token && !company) {
            dispatch(getUserProfile())
        }
        actionParams = []
    }, [token])

    useEffect(() => {
        setAction(campaignData.action_participate[0])
    }, [campaignData])

    useEffect(() => {
        if (CAMPAIGN_PARTICIPATE_SUCCESS) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CAMPAIGN_PARTICIPATE', data: false })
            setOpenConfirm(true)
        }
    }, [CAMPAIGN_PARTICIPATE_SUCCESS])

    useEffect(() => {
        if (OPEN_TWITTER_LIKE_VALIDATION_MODAL) {
            dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_LIKE_VALIDATION_MODAL', data: false })
            setOpenTwitterLikeModal(true)
        }
        if (OPEN_TWITTER_RETWEET_VALIDATION_MODAL) {
            dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_RETWEET_VALIDATION_MODAL', data: false })
            setOpenTwitterRetweetModal(true)
        }
    }, [
        OPEN_TWITTER_LIKE_VALIDATION_MODAL,
        OPEN_TWITTER_RETWEET_VALIDATION_MODAL
    ])

    const renderWinnings = () => {
        return (
            (campaignData.winnings || []).map((item, index) =>
                <div key={index} className="mb-lg-3 color-blue">{item}</div>
            )
        )
    }

    const calcRemainingDates = () => {
        const currentDate = moment(Date.now())
        const endDate = moment(Date.parse(campaignData.end_date))

        const diff = endDate.diff(currentDate)
        const diffDuration = moment.duration(diff)

        return diffDuration.days() > 0 ? diffDuration.days() : 0
    }

    const handleOpenVideo = () => setOpenVideo(!openVideo)

    const openVideoModal = () => {
        setOpenVideo(true)
    }

    const videoEnded = () => {
        setIsVideoEnded(true)
        actionParams = actionParams.filter((item) => item['social_name'] !== 'video')
        actionParams.push({ social_name: 'video', action_type: true })
    }

    const handleOpenConfirm = () => setOpenConfirm(!openConfirm)

    const tryToOpenValidationModal = (socialName, actionType) => {
        if (socialName === 'twitter' && actionType === 'like') {
            dispatch(campaignParticipateTwitterLike({ promotion_id: campaignData.pk }))
        }
        else if (socialName === 'twitter' && actionType === 'retweet') {
            dispatch(campaignParticipateTwitterRetweet({ promotion_id: campaignData.pk }))
        }
    }

    const onParticipate = (socialName, actionType, checked, pollData) => {
        if (socialName === 'video') {
            if (!isVideoEnded) openVideoModal()
            else {
                actionParams = actionParams.filter((item) => item['social_name'] !== socialName)
                actionParams.push({ social_name: socialName, action_type: checked })
            }
        }
        else {
            actionParams = actionParams.filter((item) => item['social_name'] !== socialName)
            if (checked) actionParams.push({ social_name: socialName, action_type: actionType })
        }
    }

    const handleAnswers = (val) => {
        setAnswers(val)
    }

    const update = () => {
        var body = {
            promotion_id: match.params.id
        }
        dispatch(updateFavorite(body, 'campaign_detail'))
    }

    const participate = () => {
        if (answers) actionParams.push({ social_name: 'poll', action_type: answers })
        var body = {
            promotion_id: campaignData.pk,
            social_actions: JSON.stringify(actionParams)
        }
        dispatch(campaignParticipate(body))
    }

    if (GET_CAMPAIGN_DATA_SUCCESS || GET_USER_PROFILE_SUCCESS) {
        return <Loading />
    }

    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <Row style={{ borderTop: "2px solid #7e9aa817" }}>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row className="my-5">
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <Link to={`/company/${campaignData.company_id}/`}>
                                <div>
                                    <img src={campaignData.company_logo ? campaignData.company_logo : images.profile_img} />
                                    <div className="mt-3 color-blue font-weight-bold">{campaignData.company_name}</div>
                                </div>
                            </Link>
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">{campaignData.campaign_name}</div>
                            <div className="d-flex justify-content-between">
                                <div style={{ width: "70%" }} className="promotion-list-item-text">{campaignData.description}</div>
                                {(token && !company) && (
                                    <div className="promotion-list-item-star" onClick={update}>
                                        <img src={campaignData.favorite ? images.trans_star_favorite : images.trans_star} />
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel mt-4 mb-5">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={campaignData.campaign_image ? campaignData.campaign_image : images.campaign} width="100%" height="100%" />
                            </div>
                        </Col>
                        <Col className="px-0 center">
                            <div className="mt-3 ml-3 mt-lg-5 ml-lg-5">{t('campaign_detail_page.giveaways')}</div>
                            <div className="d-flex ml-3 ml-lg-5 mt-3">
                                <img src={images.award} width="30" height="40" />
                                <div className="ml-4">
                                    {renderWinnings()}
                                </div>
                            </div>
                        </Col>
                        <Col className="px-0 dotted-left-border right" >
                            <div className="top-half-circle"></div>
                            <div className="bottom-half-circle"></div>

                            <div className="div-item ">
                                <div className="" style={{ lineHeight: "2.5rem" }}>
                                    {Date.parse(campaignData.end_date) > Date.now() ? t('campaign_detail_page.prize_ends_in') : t('campaign_detail_page.prize_ended')}
                                </div>
                                <img src={images.clock} width="25" height="25" />
                                <span className="ml-3 color-blue">{calcRemainingDates()} {t('campaign_detail_page.days')}</span>
                            </div>
                            <div className="div-item ">
                                <div className="" style={{ lineHeight: "2.5rem" }}>
                                    {t('campaign_detail_page.your_entries')}
                                </div>
                                <img src={images.entry} width="25" height="25" />
                                <span className="ml-3 color-blue">0 {t('campaign_detail_page.entries')}</span>
                            </div>
                            <div className="div-item ">
                                <div className="" style={{ lineHeight: "2.5rem" }}>
                                    {t('campaign_detail_page.maximum_participants')}
                                </div>
                                <img src={images.user} width="25" height="25" />
                                <span className="ml-3 color-blue">{campaignData.number_of_eligible_people} {t('campaign_detail_page.participants')}</span>
                            </div>
                        </Col>
                    </Row>

                    <Row className="campaign-main-panel-mobile mt-3 mb-3">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={campaignData.campaign_image ? campaignData.campaign_image : images.campaign} width="100%" />
                            </div>
                        </Col>
                        <Col className="px-0 center d-flex justify-content-center">
                            <div>
                                <div className="mt-2 ml-2">{t('campaign_detail_page.giveaways')}</div>
                                <div className="d-flex mt-2 ml-2">
                                    <img src={images.award} width="20" height="25" />
                                    <div className="ml-4">
                                        {renderWinnings()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel-mobile-footer px-3">
                        <Col className="px-0" style={{ borderRight: "1px solid #8ACDFF" }}>
                            <div className="d-flex justify-content-center"><img src={images.clock} width="25" height="25" /></div>
                            <div className="color-blue mt-2 text-center">{calcRemainingDates()} {t('campaign_detail_page.days')}</div>
                        </Col>
                        <Col className="px-0" style={{ borderRight: "1px solid #8ACDFF" }}>
                            <div className="d-flex justify-content-center"><img src={images.entry} width="25" height="25" /></div>
                            <div className="color-blue mt-2 text-center">0 {t('campaign_detail_page.entries')}</div>
                        </Col>
                        <Col className="px-0">
                            <div className="d-flex justify-content-center"><img src={images.user} width="25" height="25" /></div>
                            <div className="color-blue mt-2 text-center">{campaignData.number_of_eligible_people} {t('campaign_detail_page.participants')}</div>
                        </Col>
                    </Row>
                    {(action.social_action && (action.social_action[0].facebook_like || action.social_action[0].facebook_follow || action.social_action[0].facebook_comment)) && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="facebook"
                                    actions={
                                        {
                                            like: action.social_action[0].facebook_like,
                                            follow: action.social_action[0].facebook_follow,
                                            comment: action.social_action[0].facebook_comment,
                                        }
                                    }
                                    onParticipate={onParticipate}
                                />
                            </Col>
                        </Row>
                    )}
                    {(action.social_action && (action.social_action[1].youtube_like || action.social_action[1].youtube_follow)) && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="youtube"
                                    actions={
                                        {
                                            like: action.social_action[1].youtube_like,
                                            follow: action.social_action[1].youtube_follow,
                                        }
                                    }
                                    onParticipate={onParticipate}
                                />
                            </Col>
                        </Row>
                    )}
                    {(action.social_action && (action.social_action[2].instagram_like || action.social_action[2].instagram_follow || action.social_action[2].instagram_comment)) && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="instagram"
                                    actions={
                                        {
                                            like: action.social_action[2].instagram_like,
                                            follow: action.social_action[2].instagram_follow,
                                            comment: action.social_action[2].instagram_comment,
                                        }
                                    }
                                    onParticipate={onParticipate}
                                />
                            </Col>
                        </Row>
                    )}
                    {(action.social_action && (action.social_action[3].twitter_like || action.social_action[3].twitter_follow || action.social_action[3].twitter_comment || action.social_action[3].twitter_retweet)) && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="twitter"
                                    actions={
                                        {
                                            like: action.social_action[3].twitter_like,
                                            follow: action.social_action[3].twitter_follow,
                                            comment: action.social_action[3].twitter_comment,
                                            retweet: action.social_action[3].twitter_retweet,
                                        }
                                    }
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                            </Col>
                        </Row>
                    )}
                    {(action.social_action && (action.social_action[4].twitch_like || action.social_action[4].twitch_follow || action.social_action[4].twitch_comment)) && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="twitch"
                                    actions={
                                        {
                                            like: action.social_action[4].twitch_like,
                                            follow: action.social_action[4].twitch_follow,
                                            comment: action.social_action[4].twitch_comment,
                                        }
                                    }
                                    onParticipate={onParticipate}
                                />
                            </Col>
                        </Row>
                    )}
                    {action.url_video && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanel
                                    type="video"
                                    actions={{ video: true }}
                                    onParticipate={onParticipate}
                                    isVideoEnded={isVideoEnded}
                                />
                            </Col>
                        </Row>
                    )}
                    {action.poll && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <CustomCollapsePanelForPoll
                                    type="other"
                                    multiple_choice={action.poll.multiple_choices}
                                    responses={action.poll.responses}
                                    question={action.poll.question}
                                    handleAnswers={handleAnswers}
                                />
                            </Col>
                        </Row>
                    )}
                    <Row className="justify-content-center mb-4">
                        <Button
                            size="lg"
                            color="primary"
                            className="bootstrap-blue-btn promotion-list-item-btn"
                            onClick={participate}
                            disabled={CAMPAIGN_PARTICIPATE_PROCESS}
                        >
                            {t('button_group.participate')}
                        </Button>
                    </Row>
                </Col>
            </Row>
            <FooterLink />
            <Footer />

            <ParticipateConfirmModal open={openConfirm} onToggle={handleOpenConfirm} promotion_id={campaignData.pk} />
            <VideoPlayerModal open={openVideo} onToggle={handleOpenVideo} videoEnded={videoEnded} />

            <TwitterLikeValidationModal
                open={openTwitterLikeModal}
                onToggle={() => setOpenTwitterLikeModal(!openTwitterLikeModal)}
                promotion_id={campaignData.pk}
            />
            <TwitterRetweetValidationModal
                open={openTwitterRetweetModal}
                onToggle={() => setOpenTwitterRetweetModal(!openTwitterRetweetModal)}
                promotion_id={campaignData.pk}
            />
        </div>
    );
}

export default withRouter(CampaignDetail);
