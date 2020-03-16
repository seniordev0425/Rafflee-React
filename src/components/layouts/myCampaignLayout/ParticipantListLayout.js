import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { getCampaignParticipants } from '../../../actions/campaign'
import images from '../../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../common/Loading'


function ParticipantListLayout(props){
    const {goBack, id} = props

    const participants = useSelector(state=>state.campaign.participants)
    const isFetchingParticipants = useSelector(state=>state.userInfo.GET_CAMPAIGN_PARTICIPANTS_SUCCESS)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCampaignParticipants(id))
    },[])

    const renderParticipants = () => {
        return (
            (participants || []).map((item, index) => 
                <Row key={index} className="pt-3 pb-3" style={!(index % 2) ? {background:"rgba(191, 232, 254, 0.25)"} : {background: "white"}}>
                    <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4 space-between">
                        <div style={{fontSize:"1.1rem"}}>{item.username}</div>
                        <div style={{fontSize:"1.1rem"}}>{item.email}</div>
                        <div className="view-profile-link">View Profile</div>
                    </Col>
                </Row>
            )
        )
    }

    if (isFetchingParticipants) {
        return <Loading/>
    }

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
                    <div className="float-left" style={{fontSize:"1.1rem", fontWeight:"bold"}}>Participants ({participants.length})</div>
                    <div className="float-right">
                        <FontAwesomeIcon icon={faSearch}/>
                        <FontAwesomeIcon icon={faSlidersH} className="ml-3"/>
                    </div>
                </Col>
            </Row>
            {renderParticipants()}
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="policy-button float-right" style={{fontSize:"1.1rem"}}>Buy Data</div>
                    
                </Col>
            </Row>
        </>
    )
}

export default ParticipantListLayout;