import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import PreviewCustomCollapsePanel from '../../../common/PreviewCustomCollapsePanel'
import PreviewCustomCollapsePanelForPoll from '../../../common/PreviewCustomCollapsePanelForPoll'
import images from '../../../../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function PreviewSection(props) {
    const { t } = useTranslation()

    const { params, setSection } = props

    const companyProfile = useSelector(state => state.userInfo.companyProfile)

    const renderWinnings = () => {
        return (
            (params.winnings || []).map((item, index) =>
                <div key={index} className="mb-lg-3 color-blue">{item.name}</div>
            )
        )
    }

    const calcRemainingDates = () => {
        const currentDate = moment(Date.now())
        const endDate = moment(Date.parse(params.end_date))

        const diff = endDate.diff(currentDate)
        const diffDuration = moment.duration(diff)

        return diffDuration.days() > 0 ? diffDuration.days() : 0
    }

    const calcMaximumParticipants = () => {
        if (params.campaign_type === 'giveaway') return 0
        let max_participants = 0
        params.winnings.map(item => max_participants += parseInt(item.number_of_people || '0'))
        return max_participants
    }

    const getTwitterEntries = () => {
        let rlt = ''
        if (params.twitter.like) {
            rlt += `${t('create_campaign_page.like')} ${t('create_campaign_page.entries')}: ${params.twitter.like_entries}   `
        }
        if (params.twitter.follow) {
            rlt += `${t('create_campaign_page.follow')} ${t('create_campaign_page.entries')}: ${params.twitter.follow_entries}   `
        }
        if (params.twitter.comment) {
            rlt += `${t('create_campaign_page.comment')} ${t('create_campaign_page.entries')}: ${params.twitter.comment_entries}   `
        }
        if (params.twitter.retweet) {
            rlt += `${t('create_campaign_page.retweet')} ${t('create_campaign_page.entries')}: ${params.twitter.retweet_entries}`
        }
        return rlt
    }

    const getTwitchEntries = () => {
        let rlt = ''
        if (params.twitch.follow) {
            rlt += `${t('create_campaign_page.follow')} ${t('create_campaign_page.entries')}: ${params.twitch.follow_entries}`
        }
        return rlt
    }

    const getInstagramEntries = () => {
        let rlt = ''
        if (params.instagram.profile_url) {
            rlt += `${t('create_campaign_page.follow')} ${t('create_campaign_page.entries')}: ${params.instagram.profile_entries}   `
        }
        if (params.instagram.publication_url) {
            rlt += `${t('create_campaign_page.like')} ${t('create_campaign_page.entries')}: ${params.instagram.publication_entries}`
        }
        return rlt
    }

    const getVideoEntries = () => {
        let rlt = ''
        if (params.url_video.video) {
            rlt += `${t('create_campaign_page.entries')}: ${params.url_video.entries}`
        }
        return rlt
    }

    const getWebsiteEntries = () => {
        let rlt = ''
        if (params.url_website.website) {
            rlt += `${t('create_campaign_page.entries')}: ${params.url_website.entries}`
        }
        return rlt
    }

    const getPollEntries = () => {
        let rlt = ''
        if (params.poll !== 'false') {
            rlt += `${t('create_campaign_page.entries')}: ${params.poll.entries}`
        }
        return rlt
    }

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <div className="mt-5 mb-3 mx-3">
                    <Row className="my-5">
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img p-0">
                            <div>
                                <img src={companyProfile.logo ? companyProfile.logo : images.profile_img} alt="" />
                                <div className="mt-3 color-blue font-weight-bold">{companyProfile.company_name}</div>
                            </div>
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">{params.promotion_name}</div>
                            <div style={{ width: "70%" }} className="promotion-list-item-text">{params.promotion_long_description}</div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel mt-4 mb-5 mx-0">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={params.promotion_picture ? params.promotion_picture : images.campaign} width="100%" height="100%" alt="" />
                            </div>
                        </Col>
                        <Col className="px-0 center">
                            <div className="mt-3 ml-3 mt-lg-5 ml-lg-5">{t('campaign_detail_page.giveaways')}</div>
                            <div className="d-flex ml-3 ml-lg-5 mt-3">
                                <img src={images.award} width="30" height="40" alt="" />
                                <div className="ml-4">
                                    {renderWinnings()}
                                </div>
                            </div>
                        </Col>
                        <Col className="px-0 dotted-left-border right" >
                            <div className="top-half-circle"></div>
                            <div className="bottom-half-circle"></div>
                            <div className="div-item">
                                <div className="" style={{ lineHeight: "2.5rem" }}>
                                    {t('campaign_detail_page.prize_ends_in')}
                                </div>
                                <img src={images.clock} width="25" height="25" alt="" />
                                {params.end_date &&
                                    <span className="ml-3 color-blue">{calcRemainingDates()} {t('campaign_detail_page.days')}</span>
                                }
                            </div>
                            <div className="div-item">
                                <div className="" style={{ lineHeight: "2.5rem" }}>
                                    {t('campaign_detail_page.your_entries')}
                                </div>
                                <img src={images.entry} width="25" height="25" alt="" />
                                <span className="ml-3 color-blue">0 {t('campaign_detail_page.entries')}</span>
                            </div>
                            <div className="div-item">
                                <div style={{ lineHeight: "2.5rem" }}>
                                    {t('campaign_detail_page.maximum_participants')}
                                </div>
                                <img src={images.user} width="25" height="25" alt="" />
                                <span className="ml-3 color-blue">{calcMaximumParticipants()} {t('campaign_detail_page.participants')}</span>
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel-mobile mt-3 mb-3 mx-0">
                        <Col className="px-0 left">
                            <div className="w-100">
                                <img src={params.promotion_picture ? params.promotion_picture : images.campaign} width="100%" alt="" />
                            </div>
                        </Col>
                        <Col className="px-0 center d-flex justify-content-center">
                            <div>
                                <div className="mt-2 ml-2">{t('campaign_detail_page.giveaways')}</div>
                                <div className="d-flex mt-2 ml-2">
                                    <img src={images.award} width="20" height="25" alt="" />
                                    <div className="ml-4">
                                        {renderWinnings()}
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row className="campaign-main-panel-mobile-footer px-3 mx-0">
                        <Col className="px-0" style={{ borderRight: "1px solid #8ACDFF" }}>
                            <div className="d-flex justify-content-center"><img src={images.clock} width="25" height="25" alt="" /></div>
                            {params.end_date &&
                                <div className="color-blue mt-2 text-center">{calcRemainingDates()} {t('campaign_detail_page.days')}</div>
                            }
                        </Col>
                        <Col className="px-0" style={{ borderRight: "1px solid #8ACDFF" }}>
                            <div className="d-flex justify-content-center"><img src={images.entry} width="25" height="25" alt="" /></div>
                            <div className="color-blue mt-2 text-center">0 {t('campaign_detail_page.entries')}</div>
                        </Col>
                        <Col className="px-0">
                            <div className="d-flex justify-content-center"><img src={images.user} width="25" height="25" alt="" /></div>
                            <div className="color-blue mt-2 text-center">{calcMaximumParticipants()} {t('campaign_detail_page.participants')}</div>
                        </Col>
                    </Row>
                    {(params.twitter.like || params.twitter.follow || params.twitter.comment || params.twitter.retweet) &&
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanel
                                    type="twitter"
                                    actions={
                                        {
                                            like: params.twitter.like,
                                            follow: params.twitter.follow,
                                            comment: params.twitter.comment,
                                            retweet: params.twitter.retweet,
                                        }
                                    }
                                    mandatories={
                                        {
                                            like: params.twitter.like_mandatory,
                                            follow: params.twitter.follow_mandatory,
                                            comment: params.twitter.comment_mandatory,
                                            retweet: params.twitter.retweet_mandatory,
                                        }
                                    }
                                    entries={getTwitterEntries()}
                                    onParticipate={() => void 0}
                                    tryToOpenValidationModal={() => void 0}
                                />
                            </Col>
                        </Row>
                    }
                    {(params.instagram.profile || params.instagram.publication) &&
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanel
                                    type="instagram"
                                    actions={
                                        {
                                            profile_url: params.instagram.profile_url,
                                            publication_url: params.instagram.publication_url,
                                        }
                                    }
                                    mandatories={
                                        {
                                            profile: params.instagram.profile_mandatory,
                                            publication: params.instagram.publication_mandatory
                                        }
                                    }
                                    entries={getInstagramEntries()}
                                    onParticipate={() => void 0}
                                    tryToOpenValidationModal={() => void 0}
                                />
                            </Col>
                        </Row>
                    }
                    {(params.twitch.follow) &&
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanel
                                    type="twitch"
                                    actions={
                                        {
                                            follow: params.twitch.follow,
                                        }
                                    }
                                    mandatories={
                                        {
                                            follow: params.twitch.follow_mandatory,
                                        }
                                    }
                                    entries={getTwitchEntries()}
                                    onParticipate={() => void 0}
                                    tryToOpenValidationModal={() => void 0}
                                />
                            </Col>
                        </Row>
                    }
                    {params.url_video.video && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanel
                                    type="video"
                                    actions={{ video: true }}
                                    mandatories={{ video: params.url_video.mandatory }}
                                    entries={getVideoEntries()}
                                    onParticipate={() => void 0}
                                    isVideoEnded={false}
                                />
                            </Col>
                        </Row>
                    )}
                    {params.url_website.website && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanel
                                    type="website"
                                    actions={{ website: true }}
                                    mandatories={{ website: params.url_website.mandatory }}
                                    entries={getWebsiteEntries()}
                                    url={params.url_website.url}
                                    participateWebsite={() => void 0}
                                />
                            </Col>
                        </Row>
                    )}
                    {params.poll !== 'false' && (
                        <Row className="mb-4 mt-4">
                            <Col style={{ paddingLeft: 40 }}>
                                <PreviewCustomCollapsePanelForPoll
                                    type="other"
                                    multiple_choice={params.poll.mutiples_choices}
                                    responses={params.poll.response}
                                    question={params.poll.question}
                                    participatePoll={() => void 0}
                                    mandatory={params.poll.mandatory}
                                    entries={getPollEntries()}
                                />
                            </Col>
                        </Row>
                    )}
                </div>
                <Row>
                    <Col>
                        <Button
                            type="primary"
                            className="ant-blue-btn my-5"
                            style={{ width: 150 }}
                            onClick={() => setSection('payment')}
                        >
                            {t('button_group.next')}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default PreviewSection