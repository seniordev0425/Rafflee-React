import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import ClickSplineChart from './ClickSplineChart'
import ClickTotalSplineChart from './ClickTotalSplineChart'
import ProductBenefitSplineChart from './ProductBenefitSplineChart'
import Loading from '../../../common/Loading'
import { getClicksData } from '../../../../actions/analytics'

function Clicks(props) {

  const { time, campaignID } = props

  // Following Redux states are defined in reducer with comments
  const clicksData = useSelector(state => state.analytics.clicksData)
  const GET_CLICKS_DATA_PROCESS = useSelector(state => state.userInfo.GET_CLICKS_DATA)
  const dispatch = useDispatch()

  useEffect(() => {
    // Update clicks data according campaignID and time props
    dispatch(getClicksData(campaignID, time))
  }, [time, campaignID])

  if (GET_CLICKS_DATA_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <div className="mx-0 mx-sm-3">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <ClickSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <ClickTotalSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
        </Col>
      </Row>
      <Row className="my-4">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <ProductBenefitSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
        </Col>
      </Row>
    </div>
  )
}

export default Clicks