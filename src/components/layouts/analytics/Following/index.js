import React from 'react'
import { Row, Col } from 'reactstrap'
import { Progress } from 'antd'
import ColorBar from '../../../common/ColorBar'
import FollowingPieChart from './FollowingPieChart'

function Following() { 
    return(
        <>
        <Row className="my-5">
            <Col xs="12" sm={{size: 10, offset: 1}} className="px-4 followers-container">
                <div className="audience-bottom-div d-flex flex-column justify-content-between">
                    <div className="default-border p-4">
                        <div>
                            <span className="font-weight-bold font-size-11">Campaign Followers</span>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                            <div className="font-weight-bold font-size-20">+3939</div>
                            <div className="font-size-11 mt-3" style={{color: "#55C97B"}}>(+348)</div>
                        </div>
                        <ColorBar width={156} color="#0091ff"/>
                    </div>
                    <div className="default-border p-4">
                        <div>
                            <span className="font-weight-bold font-size-11">Circle Followers</span>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                            <div className="font-weight-bold font-size-20">+3939</div>
                            <div className="font-size-11 mt-3" style={{color: "#55C97B"}}>(+348)</div>
                        </div>
                        <ColorBar width={156} color="#7479EE"/>
                    </div>
                    <div className="default-border p-4">
                        <div>
                            <span className="font-weight-bold font-size-11">Lost Followers</span>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                            <div className="font-weight-bold font-size-20">+3939</div>
                            <div className="font-size-11 mt-3" style={{color: "#55C97B"}}>(+348)</div>
                        </div>
                        <ColorBar width={156} color="#0DCDE1"/>
                    </div>
                </div>
                <div className="audience-bottom-div default-border p-4">
                    <FollowingPieChart/>
                    <div className="d-flex justify-content-between mt-5">
                        <div>
                            <div className="font-weight-bold font-size-20 color-blue text-center">100</div>
                            <div className="font-size-10 text-center">Campaign</div>
                        </div>
                        <div>
                            <div className="font-weight-bold font-size-20 color-purple text-center">8456</div>
                            <div className="font-size-10 text-center">Cicle</div>
                        </div>
                        <div>
                            <div className="font-weight-bold font-size-20 color-green text-center">5878</div>
                            <div className="font-size-10 text-center">Lost</div>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        <Row>
            <Col xs="12" sm={{size: 10, offset: 1}} className="px-4">
                <div className="default-border p-4 mb-5 d-flex justify-content-between flex-column">
                    <div className="d-flex justify-content-between">
                        <div className="font-size-13 font-weight-bold">Following Base</div>
                        <div className="font-size-9 font-weight-bold">
                            <span style={{width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block"}}/>
                            <span className="ml-2 font-size-8">Users</span>
                        </div>
                    </div>
                    <div className="d-flex font-size-10 mt-4">
                        <div style={{width: "20%"}}>Male</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={30}/>
                        </div>
                    </div>
                    <div className="d-flex font-size-10 mt-4">
                        <div style={{width: "20%"}}>Female</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={74.5}/>
                        </div>
                    </div>
                    <div className="d-flex font-size-10 mt-4">
                        <div style={{width: "20%"}}>Unknown</div>
                        <div style={{width: "80%"}}>
                            <Progress strokeWidth={15} percent={10.4}/>
                        </div>
                    </div>
                </div>
            </Col>
        </Row>
        </>
    )
}

export default Following;