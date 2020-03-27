import React from 'react'
import { Row, Col } from 'reactstrap'
import { Progress } from 'antd'
import AudienceSplineChart from './AudienceSplineChart'
import MapChart from './MapChart'

import { useTranslation } from 'react-i18next'

function Audience() {
    const { t } = useTranslation()

    return (
        <>
            <Row className="">
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="px-4 ">
                    <div className="followers-container default-border">
                        <div className="audience-bottom-div p-2 p-sm-4">
                            <div className="font-size-11 font-weight-bold">{t('analytics_page.demographics')}</div>
                            <MapChart />
                        </div>
                        <div className="audience-bottom-div p-2 p-sm-4">
                            <div />
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
                                <Progress strokeWidth={10} percent={30} />
                            </div>
                        </div>
                        <div className="d-flex font-size-10 mt-3 mt-sm-0">
                            <div style={{ width: "25%" }}>{t('analytics_page.female')}</div>
                            <div style={{ width: "75%" }}>
                                <Progress strokeWidth={10} percent={74.5} />
                            </div>
                        </div>
                        <div className="d-flex font-size-10 mt-3 mt-sm-0">
                            <div style={{ width: "25%" }}>{t('analytics_page.unknown')}</div>
                            <div style={{ width: "75%" }}>
                                <Progress strokeWidth={10} percent={10.4} />
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