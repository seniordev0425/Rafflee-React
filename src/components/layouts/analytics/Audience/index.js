import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Progress } from 'antd'
import ReactCountryFlag from "react-country-flag"
import { getCode } from 'country-list'
import AudienceSplineChart from './AudienceSplineChart'
import MapChart from './MapChart'
import Loading from '../../../common/Loading'
import {
    getActiveGender,
    getDemographics
} from '../../../../actions/analytics'

import { useTranslation } from 'react-i18next'

function Audience(props) {
    const { t } = useTranslation()

    const { time, demographics_type } = props

    const activeGender = useSelector(state => state.analytics.activeGender)
    const overralActionDemographics = useSelector(state => state.analytics.overralActionDemographics)
    const overralParitipationDemographics = useSelector(state => state.analytics.overralParitipationDemographics)
    const GET_ACTIVE_GENDER_PROCESS = useSelector(state => state.userInfo.GET_ACTIVE_GENDER)
    const GET_DEMOGRAPHICS = useSelector(state => state.userInfo.GET_DEMOGRAPHICS)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getActiveGender('all'))
        dispatch(getDemographics('all', 'action'))
        dispatch(getDemographics('all', 'participation'))
    }, [])

    if (GET_ACTIVE_GENDER_PROCESS || GET_DEMOGRAPHICS) {
        return <div className="min-height-container"><Loading /></div>
    }

    return (
        <>
            <Row className="">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4 ">
                    <div className="followers-container default-border">
                        <div className="audience-bottom-div p-2 p-md-4">
                            <div className="font-size-11 font-weight-bold mb-3">{t('analytics_page.demographics')}</div>
                            <MapChart
                                overralActionDemographics={overralActionDemographics}
                                overralParitipationDemographics={overralParitipationDemographics}
                                demographics_type={demographics_type}
                            />
                        </div>
                        <div className="audience-bottom-div p-2 p-md-4">
                            <div className="d-flex flex-wrap font-size-9">
                                {(demographics_type === 'action' ? overralActionDemographics : overralParitipationDemographics).map((item, index) =>
                                    <div key={index} style={{ width: 150 }} className="mt-2 mt-md-5">
                                        <div>
                                            <ReactCountryFlag
                                                countryCode={getCode(item.country)}
                                                style={{
                                                    fontSize: '1.5em',
                                                }}
                                                svg
                                            />
                                            <span className="color-gray ml-2">{item.country}</span>
                                        </div>
                                            <div className="footer-link-bold mt-2">{`${item.number} users`}</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>
            <Row className="my-5">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4 followers-container">
                    <div className="default-border audience-bottom-div p-3 p-sm-4 d-flex justify-content-between flex-column">
                        <div className="d-flex justify-content-between">
                            <div className="font-size-11 font-weight-bold">{t('analytics_page.active_clients')}</div>
                            <div className="font-size-9 font-weight-bold">
                                <span style={{ width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block" }} />
                                <span className="ml-2 font-size-8">{t('analytics_page.users')}</span>
                            </div>
                        </div>
                        <div className="d-flex font-size-10 mt-3 mt-sm-0">
                            <div style={{ width: "25%" }}>{t('analytics_page.male')}</div>
                            <div style={{ width: "75%" }}>
                                <Progress strokeWidth={10} percent={activeGender.male_percentage} />
                            </div>
                        </div>
                        <div className="d-flex font-size-10 mt-3 mt-sm-0">
                            <div style={{ width: "25%" }}>{t('analytics_page.female')}</div>
                            <div style={{ width: "75%" }}>
                                <Progress strokeWidth={10} percent={activeGender.female_percentage} />
                            </div>
                        </div>
                        <div className="d-flex font-size-10 mt-3 mt-sm-0">
                            <div style={{ width: "25%" }}>{t('analytics_page.unknown')}</div>
                            <div style={{ width: "75%" }}>
                                <Progress strokeWidth={10} percent={activeGender.unknow_percentage} />
                            </div>
                        </div>
                    </div>
                    <div className="default-border audience-bottom-div p-2 p-sm-4">
                        <AudienceSplineChart />
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default Audience;