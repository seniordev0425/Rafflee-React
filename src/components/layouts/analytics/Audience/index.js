import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import AudiencePieChart from './AudiencePieChart'
import AudienceHorizontalBarChart from './AudienceHorizontalBarChart'
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

  // Following Redux states are defined in reducer with comments
  const activeGender = useSelector(state => state.analytics.activeGender)
  const overralActionDemographics = useSelector(state => state.analytics.overralActionDemographics)
  const overralParitipationDemographics = useSelector(state => state.analytics.overralParitipationDemographics)
  const GET_ACTIVE_GENDER_PROCESS = useSelector(state => state.userInfo.GET_ACTIVE_GENDER)
  const GET_DEMOGRAPHICS = useSelector(state => state.userInfo.GET_DEMOGRAPHICS)
  const dispatch = useDispatch()

  useEffect(() => {
    // Update data according campaignID
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
            <AudiencePieChart activeGender={activeGender} />
          </div>
          <div className="default-border audience-bottom-div p-2 p-sm-4">
            <AudienceHorizontalBarChart campaignID={campaignID} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Audience;