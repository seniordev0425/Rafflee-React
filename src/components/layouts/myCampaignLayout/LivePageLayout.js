import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Button} from 'reactstrap'
import images from '../../../utils/images'
import Congratulation from '../../modals/Congratulation'

function LivePageLayout(props){

    const {goBack} = props

    const [open, setOpen] = useState(false)

    const onToggle = () => {
        setOpen(!open)
    }
    return(
        <>
            <Row className="mt-4 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left blue-link-btn" onClick={() => goBack(null)}>Back to Campaign Page</div>
                    <div className="float-right"><img src={images.video_player}/></div>
                </Col>
            </Row>
            <Row className="mt-5 mb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem", fontWeight:"bold"}}>Participants</div>
                    <div className="float-right"><img src={images.video_player}/></div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>
            <Row className="pt-3 pb-3">
                <Col xs={{size: 10, offset: 1}} className="pl-4 pr-4">
                    <div className="float-left" style={{fontSize:"1.1rem"}}>Joe Fishman</div>
                    <div className="float-right view-profile-link">View Profile</div>
                </Col>
            </Row>

            <Row className="mt-5 mb-5">
                <Col style={{display:"flex", justifyContent:"center"}}>
                    <Button className="btn blue-btn float-right" color="primary" style={{width:200}} onClick={onToggle}>DRAW</Button>
                </Col>
            </Row>

            <Congratulation open={open} onToggle={onToggle}/>
        </>
    )
}

export default LivePageLayout;