import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import Loading from '../../../common/Loading'
import ClickDataChart from './ClickDataChart'
import ClickTotalDataChart from './ClickTotalDataChart'
import { getClicksData } from '../../../../actions/analytics'
import { useTranslation } from 'react-i18next'

function Clicks(props) {
    const { t } = useTranslation()

    const { time, campaignID } = props

    const clicksData = useSelector(state => state.analytics.clicksData)
    const GET_CLICKS_DATA_PROCESS = useSelector(state => state.userInfo.GET_CLICKS_DATA)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getClicksData(campaignID, time))
    }, [time, campaignID])

    if (GET_CLICKS_DATA_PROCESS) return <div className="min-height-container"><Loading /></div>

    return (
        <>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col xs="12" md="6" lg="3" className="mb-3 mb-lg-0">
                            <div className="p-3 d-flex justify-content-between align-items-center default-border">
                                <span className="font-weight-bold font-size-11">{t('analytics_page.benefit_by_click')}</span>
                                <span>30%</span>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="3" className="mb-3 mb-lg-0">
                            <div className="p-3 d-flex justify-content-between align-items-center default-border">
                                <span className="font-weight-bold font-size-11">{t('analytics_page.benefit_by_action')}</span>
                                <span>30%</span>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="3" className="mb-3 mb-lg-0">
                            <div className="p-3 d-flex justify-content-between align-items-center default-border">
                                <span className="font-weight-bold font-size-11">{t('analytics_page.benefit_by_participation')}</span>
                                <span>30%</span>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="3" className="mb-3 mb-lg-0">
                            <div className="p-3 d-flex justify-content-between align-items-center default-border">
                                <span className="font-weight-bold font-size-11">{t('analytics_page.benefit_by_total')}</span>
                                <span>30%</span>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mt-4">
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col xs="12" md="6" className="mb-3 mb-md-0">
                            <div className="p-4 default-border">
                                <ClickDataChart />
                                <div className="d-flex justify-content-between mt-5">
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-blue text-center">100</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.views')}</div>
                                    </div>
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-purple text-center">8456</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.actions')}</div>
                                    </div>
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-green text-center">5878</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.participations')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" className="mb-3 mb-md-0">
                            <div className="p-4 default-border">
                                <ClickTotalDataChart />
                                <div className="d-flex justify-content-between mt-5">
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-blue text-center">100</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.views')}</div>
                                    </div>
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-purple text-center">8456</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.actions')}</div>
                                    </div>
                                    <div>
                                        <div className="font-weight-bold font-size-20 color-green text-center">5878</div>
                                        <div className="font-size-10 text-center">{t('analytics_page.participations')}</div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Clicks