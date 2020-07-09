import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Input } from 'antd'
import { getCampaignParticipants } from '../../../actions/campaign'
import images from '../../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../common/Loading'

import { useTranslation } from 'react-i18next'

function ParticipantListLayout(props) {
    const { t } = useTranslation()

    const { goBack, id } = props

    const participants = useSelector(state => state.campaign.participants)
    const isFetchingParticipants = useSelector(state => state.userInfo.GET_CAMPAIGN_PARTICIPANTS_SUCCESS)

    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')

    useEffect(() => {
        dispatch(getCampaignParticipants(id))
    }, [])

    const renderParticipants = () => {
        return (
            participants.filter((item, index) => item.email.toLowerCase().includes(keyword) || item.username.toLowerCase().includes(keyword)).map((item, index) =>
                <Row key={index} className="pt-3 pb-3" style={!(index % 2) ? { background: "rgba(191, 232, 254, 0.25)" } : { background: "white" }}>
                    <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x responsive-font-size-11">
                        <Row>
                            <Col sm="5" xs="3" className="px-0" style={{ overflowWrap: 'anywhere' }}><div>{item.username}</div></Col>
                            <Col sm="7" xs="9" className="d-flex justify-content-between px-0">
                                <div>{item.email}</div>
                                <div className="view-profile-link">{t('my_campaign_page.view_profile')}</div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )
        )
    }

    if (isFetchingParticipants) {
        return <Loading />
    }

    return (
        <>
            <Row className="mt-4 mb-3">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
                    <div className="float-left blue-link-btn" onClick={() => goBack(null)}>{t('my_campaign_page.back_to_campaign_page')}</div>
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
                    <Row>
                        <Col sm="2" xs="3" className="promotion-list-item-img">
                            <img src={images.profile_img} alt="" />
                        </Col>
                        <Col sm="10" xs="9">
                            <div className="promotion-list-item-text">{t('my_campaign_page.campaign_analytics')}</div>
                            <div className="promotion-list-item-title">Ultimate Edition (Digital Code)</div>

                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x responsive-font-size-11">
                    <Row>
                        <Col sm="5" xs="3" className="px-0" style={{ overflowWrap: 'anywhere' }}><div>{t('my_campaign_page.generated_likes')}</div></Col>
                        <Col sm="7" xs="9" className="d-flex justify-content-between px-0">
                            <div>{t('my_campaign_page.earned_followers')}</div>
                            <div>{t('my_campaign_page.tweets_generated')}</div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
                    <div className="float-left responsive-font-size-11 font-weight-bold">{t('my_campaign_page.participants')} ({participants.length})</div>
                    <div className="float-right d-flex align-items-center">
                        <Input
                            onChange={e => setKeyword(e.target.value.toLowerCase())}
                            size="small"
                            placeholder="Name or email"
                            prefix={<FontAwesomeIcon icon={faSearch} />}
                            className="mycampaign-searchbox"
                        />
                        <FontAwesomeIcon icon={faSlidersH} className="ml-3" />
                    </div>
                </Col>
            </Row>
            {renderParticipants()}
            <Row className="pt-3 pb-3">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
                    <div className="policy-button float-right" style={{ fontSize: "1.1rem" }}>{t('my_campaign_page.buy_data')}</div>
                </Col>
            </Row>
        </>
    )
}

export default ParticipantListLayout