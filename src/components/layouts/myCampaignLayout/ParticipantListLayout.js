import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button} from 'reactstrap'
import images from '../../../utils/images'

function ParticipantListLayout(props){
    const {goBack} = props
    return(
        <>
            <Row className="mt-4 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left blue-link-btn" onClick={() => goBack(null)}>Back to Campaign Page</div>
                </Col>
            </Row>
            <Row className="mt-5 mb-5">
                <Col xs={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9">
                            <div className="promotion-list-item-text">Campaign Analytics</div>
                            <div className="promotion-list-item-title">Ultimate Edition (Digital Code)</div>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4 space-between">
                    <div style={{fontSize:"1.1rem"}}>Generated Likes</div>
                    <div style={{fontSize:"1.1rem"}}>Earned Followers</div>
                    <div style={{fontSize:"1.1rem"}}>Tweets Generated</div>
                </Col>
            </Row>
            <Row className="mt-3 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem", fontWeight:"bold"}}>Participants</div>
                    <div className="float-right"><img src={images.video_player}/></div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4 space-between">
                    <div style={{fontSize:"1.1rem"}}>Generated Likes</div>
                    <div style={{fontSize:"1.1rem"}}>Earned Followers</div>
                    <div className="view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4 space-between">
                    <div style={{fontSize:"1.1rem"}}>Generated Likes</div>
                    <div style={{fontSize:"1.1rem"}}>Earned Followers</div>
                    <div className="view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4 space-between">
                    <div style={{fontSize:"1.1rem"}}>Generated Likes</div>
                    <div style={{fontSize:"1.1rem"}}>Earned Followers</div>
                    <div className="view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="policy-button float-right" style={{fontSize:"1.1rem"}}>Buy Data</div>
                    
                </Col>
            </Row>
        </>
    )
}

export default ParticipantListLayout;