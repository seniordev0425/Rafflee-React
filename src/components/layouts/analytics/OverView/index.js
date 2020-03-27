import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../../utils/images'
import ColorBar from '../../../common/ColorBar'
import OverViewSplineChart from './OverViewSplineChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons'

import { useTranslation } from 'react-i18next'

function OverView() {
    const { t } = useTranslation()
    return (
        <>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4 followers-container">
                    <div className="follower-div">
                        <div>
                            <img src={images.instagram_icon} width="30px" height="30px" />
                            <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.instagram_followers')}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <span className="font-weight-bold font-size-20">+3939</span>
                            <span className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+348)</span>
                        </div>
                        <ColorBar width={100} color="#0091ff" />
                    </div>
                    <div className="follower-div">
                        <div>
                            <img src={images.twitter_icon} width="30px" height="30px" />
                            <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.twitter_followers')}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <span className="font-weight-bold font-size-20">+124</span>
                            <span className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+38)</span>
                        </div>
                        <ColorBar width={100} color="#0091ff" />
                    </div>
                    <div className="follower-div">
                        <div>
                            <img src={images.youtube_icon} width="30px" height="30px" />
                            <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.youtube_followers')}</span>
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <span className="font-weight-bold font-size-20">+373</span>
                            <span className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+69)</span>
                        </div>
                        <ColorBar width={100} color="#0091ff" />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="p-4 mt-5">
                    <OverViewSplineChart />
                </Col>
            </Row>
            <Row className="my-5">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4">
                    <div className="default-border">
                        <Row className="justify-content-between p-2 p-sm-4">
                            <div className="float-left font-weight-bold font-size-11">{t('analytics_page.most_active_users')}</div>
                            <div className="float-right">
                                <FontAwesomeIcon icon={faSearch} />
                                <FontAwesomeIcon icon={faSlidersH} className="ml-3" />
                            </div>
                        </Row>
                        <Row className="justify-content-between p-2 p-sm-4 responsive-font-size-11" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
                            <div>Joe Fishman</div>
                            <div>Joe24@gmail.com</div>
                            <div className="view-profile-link">{t('analytics_page.view_profile')}</div>
                        </Row>
                        <Row className="justify-content-between p-2 p-sm-4 responsive-font-size-11">
                            <div>Joe Fishman</div>
                            <div>Joe24@gmail.com</div>
                            <div className="view-profile-link">{t('analytics_page.view_profile')}</div>
                        </Row>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default OverView;