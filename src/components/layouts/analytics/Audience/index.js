import React from 'react'
import { Row, Col } from 'reactstrap'
import { Progress } from 'antd'
import AudienceSplineChart from './AudienceSplineChart'
import MapChart from './MapChart'

function Audience() {
    return (
        <>
        <Row className="my-5">
            <Col xs="12" sm={{size: 10, offset: 1}} className="px-4 ">
                <div className="followers-container default-border">
                    <div className="audience-bottom-div p-4">
                        <div className="font-size-13 font-weight-bold">Demographics</div>
                        <MapChart/>
                    </div>
                    <div className="audience-bottom-div p-4">
                        <div/>
                    </div>
                </div>
                
            </Col>
        </Row>
        <Row className="my-5">
            <Col xs="12" sm={{size: 10, offset: 1}} className="px-4 followers-container">
                <div className="default-border audience-bottom-div p-4 d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-between">
                        <div className="font-size-13 font-weight-bold">Active Clients</div>
                        <div className="font-size-9 font-weight-bold">
                            <span style={{width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block"}}/>
                            <span className="ml-2 font-size-8">Users</span>
                        </div>
                    </div>
                    <div className="d-flex font-size-10">
                        <div style={{width: "20%"}}>Male</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={30}/>
                        </div>
                    </div>
                    <div className="d-flex font-size-10">
                        <div style={{width: "20%"}}>Female</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={74.5}/>
                        </div>
                    </div>
                    <div className="d-flex font-size-10">
                        <div style={{width: "20%"}}>Unknown</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={10.4}/>
                        </div>
                    </div>
                </div>
                <div className="default-border audience-bottom-div p-4">
                    <AudienceSplineChart/>
                </div>
            </Col>
        </Row>
        </>
    )
}

export default Audience;