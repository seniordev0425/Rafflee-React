import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'

import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import images from '../utils/images'

import CustomCollapsePanel from '../components/common/CustomCollapsePanel'
import Loading from '../components/common/Loading'
import moment from 'moment'
import { openNotification } from '../utils/notification'
import { campaignParticipate, getCampaignData, updateFavorite } from '../actions/campaign'

function CampaignDetail(props){
    const { history, match } = props

    const isLoading = useSelector(state=>state.userInfo.GET_CAMPAIGN_DATA_SUCCESS)
    const campaignData = useSelector(state=>state.campaign.campaignData)
    const token = useSelector(state=>state.userInfo.token)
    const company = useSelector(state=>state.userInfo.company)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Campaign Detail"
        var body = {
            token: token
        }
        dispatch(getCampaignData(match.params.id, body))
    },[])

    const renderWinnings = () => {
        return(
            (campaignData.winnings || []).map((item, index) => 
                <div key={index} className="promotion-list-item-title mb-3">{item}</div>
            )
        )
    }

    const calcRemainingDates = () => {
        const currentDate = moment(Date.now())
        const endDate = moment(Date.parse(campaignData.end_date))
        
        const diff = endDate.diff(currentDate)
        const diffDuration = moment.duration(diff)

        return diffDuration.days() > 0 ? diffDuration.days() : 0
    }

    const participate = () => {
        var body = {
            promotion_id: match.params.id
        }
        dispatch(campaignParticipate(body))
    }

    const update = () => {
        var body = {
            promotion_id: match.params.id
        }
        dispatch(updateFavorite(body, 'campaign_detail'))
    }

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div style={{fontFamily:"sofiapro"}}>
            <JoinHeader/>
            <Header/>
            <Row style={{borderTop:"2px solid #7e9aa817"}}>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row className="my-5">
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={campaignData.campaign_image ? `data:image/png;base64,${campaignData.campaign_image}` : images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">{campaignData.campaign_name}</div>
                            <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
                                <div style={{width: "70%", fontSize:"1.1rem"}}>{campaignData.description}</div>
                                {(token && !company) && (
                                    <div className="promotion-list-item-star" onClick={update}>
                                        <img src={campaignData.favorite ? images.trans_star_favorite : images.trans_star}/>
                                    </div>
                                )}
                            </div>
                        </Col>
                    </Row>

                    <Row className="campaign-main-panel mt-4 mb-5">
                        <Col className="px-0 left">
                            <img src={images.campaign} />
                        </Col>
                        <Col className="px-0 center">
                            <div className="mt-5 menubar ml-5">GIVEAWAYS</div>
                            <div style={{display: "flex"}} className="ml-5">
                                <img src={images.award} width="30" height="40"/>
                                <div className="ml-4">
                                    {renderWinnings()}
                                </div>
                            </div>
                        </Col>
                        <Col className="px-0 dotted-left-border right" >
                            <div className="top-half-circle"></div>
                            <div className="bottom-half-circle"></div>
                            
                            <div className="div-item promotion-list-item-title">
                                <div className="menubar">
                                    {Date.parse(campaignData.end_date) > Date.now() ? "PRIZE ENDS IN" : "PRIZE ENDED"}
                                </div>
                                <img src={images.clock} width="30"/>
                                <span className="ml-3">{calcRemainingDates()} days</span>
                            </div>
                            <div className="div-item promotion-list-item-title">
                                <div className="menubar">
                                    YOUR ENTRIES
                                </div>
                                <img src={images.entry} width="30"/>
                                <span className="ml-3">0 Entries</span>
                            </div>
                            <div className="div-item promotion-list-item-title">
                                <div className="menubar">
                                    MAXIMUM PARTICIPANT
                                </div>
                                <img src={images.user} width="30"/>
                                <span className="ml-3">{campaignData.number_of_eligible_people} Participants</span>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-4 mt-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="twitter" title="Tweet about the giveaway" participate={participate}/>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="facebook" title="Visit Converse on Facebook" participate={participate}/>  
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="youtube" title="Follow Converse on YouTube" participate={participate}/>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="other" title="What is your favorite animal?" participate={participate}/>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <FooterLink/>
            <Footer/>
        </div>
    );
}

export default withRouter(CampaignDetail);
