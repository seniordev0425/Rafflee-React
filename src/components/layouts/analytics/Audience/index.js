import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Progress } from 'antd'
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

  const { campaignID, demographics_type } = props

  const activeGender = useSelector(state => state.analytics.activeGender)
  const overralActionDemographics = useSelector(state => state.analytics.overralActionDemographics)
  const overralParitipationDemographics = useSelector(state => state.analytics.overralParitipationDemographics)
  const GET_ACTIVE_GENDER_PROCESS = useSelector(state => state.userInfo.GET_ACTIVE_GENDER)
  const GET_DEMOGRAPHICS = useSelector(state => state.userInfo.GET_DEMOGRAPHICS)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActiveGender(campaignID))
    dispatch(getDemographics(campaignID, 'action'))
    dispatch(getDemographics(campaignID, 'participation'))
  }, [campaignID])

  if (GET_ACTIVE_GENDER_PROCESS || GET_DEMOGRAPHICS) {
    return <div className="min-height-container"><Loading /></div>
  }

  return (
    <div className="mx-0 mx-sm-3">
      <Row className="">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="p-2 p-sm-4 default-border">
            <div className="font-size-11 font-weight-bold mb-3">{t('analytics_page.demographics')}</div>
            <MapChart
              overralDemographics={demographics_type === 'action' ? overralActionDemographics : overralParitipationDemographics}
            />
          </div>

        </Col>
      </Row>
      <Row className="my-5">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x d-block justify-content-between d-md-flex">
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
    </div>
  )
}

export default Audience;