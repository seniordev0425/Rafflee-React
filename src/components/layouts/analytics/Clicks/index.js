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
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="p-4">
                    <ClickSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="p-4">
                    <ClickTotalSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
                </Col>
            </Row>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }} className="p-4">
                    <ProductBenefitSplineChart clicksData={clicksData} time={time} campaignID={campaignID} />
                </Col>
            </Row>
        </>
    )
}

export default Clicks