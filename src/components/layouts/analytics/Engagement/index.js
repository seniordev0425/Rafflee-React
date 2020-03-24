import React from 'react'
import { Row, Col } from 'reactstrap'
import ColorBar from '../../../common/ColorBar'
import EngagementBarChart from './EngagementBarChart';

import { useTranslation } from 'react-i18next'

function Engagement() {
    const { t } = useTranslation()

    return (
        <>
        <Row className="">
            <Col xs="12" sm={{size: 10, offset: 1}} className="px-4 followers-container">
                <div className="default-border audience-bottom-div p-4">
                    <div>
                        <span className="font-weight-bold font-size-11">{t('analytics_page.campaigns_engagement')}</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-between" style={{width: 155}}>
                        <div className="font-weight-bold font-size-20">+3939</div>
                        <div className="font-size-11 mt-3" style={{color: "#55C97B"}}>(+348)</div>
                    </div>
                    <ColorBar width={156} color="#0091ff"/>
                </div>
                <div className="default-border audience-bottom-div p-4">
                    <div>
                        <span className="font-weight-bold font-size-11">{t('analytics_page.brand_engagement')}</span>
                    </div>
                    <div className="mt-3 d-flex justify-content-between" style={{width: 155}}>
                        <div className="font-weight-bold font-size-20">+39</div>
                        <div className="font-size-11 mt-3" style={{color: "#55C97B"}}>(+258)</div>
                    </div>
                    <ColorBar width={156} color="#0091ff"/>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm={{size: 10, offset: 1}} className="p-4">
                <EngagementBarChart/>
            </Col>
        </Row>
        </>
    )
}

export default Engagement;