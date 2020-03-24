import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import moment from 'moment'

import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import images from '../utils/images'
import CustomCollapsePanel from '../components/common/CustomCollapsePanel'
import Loading from '../components/common/Loading'
import { campaignParticipate, getCampaignData, updateFavorite } from '../actions/campaign'

import { useTranslation } from 'react-i18next'
import VideoPlayerModal from '../components/modals/VideoPlayerModal'
import ParticipateConfirmModal from '../components/modals/ParticipateConfirmModal'

function CampaignDetail(props){
    const { t } = useTranslation()

    const { match } = props

    const isLoading = useSelector(state=>state.userInfo.GET_CAMPAIGN_DATA_SUCCESS)
    const campaignData = useSelector(state=>state.campaign.campaignData)
    const token = useSelector(state=>state.userInfo.token)
    const company = useSelector(state=>state.userInfo.company)
    const dispatch = useDispatch()

    const [openVideo, setOpenVideo] = useState(false)
    const [openConfirm, setOpenConfirm] = useState(false)

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

    const handleOpenVideo = () => setOpenVideo(!openVideo)

    const openVideoModal = () => {
        setOpenVideo(true)
        // var body = {
        //     promotion_id: match.params.id
        // }
        // dispatch(campaignParticipate(body))
    }

    const handleOpenConfirm = () => setOpenConfirm(!openConfirm)

    const openConfirmModal = () => {
        setOpenConfirm(true)
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
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={campaignData.campaign_image ? `data:image/png;base64,${campaignData.campaign_image}` : images.profile_img}/>
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">{campaignData.campaign_name}</div>
                            <div className="d-flex justify-content-between mt-4">
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
                            <div className="w-100">
                                <img src={images.campaign} width="100%" height="100%"/>
                            </div>
                            
                        </Col>
                        <Col className="px-0 center">
                            <div className="mt-5 menubar ml-5">{t('campaign_detail_page.giveaways')}</div>
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
                                <div className="menubar" style={{lineHeight: "2.5rem"}}>
                                    {Date.parse(campaignData.end_date) > Date.now() ? t('campaign_detail_page.prize_ends_in') : t('campaign_detail_page.prize_ended')}
                                </div>
                                <img src={images.clock} width="25" height="25"/>
                                <span className="ml-3">{calcRemainingDates()} {t('campaign_detail_page.days')}</span>
                            </div>
                            <div className="div-item promotion-list-item-title">
                                <div className="menubar" style={{lineHeight: "2.5rem"}}>
                                    {t('campaign_detail_page.your_entries')}
                                </div>
                                <img src={images.entry} width="25" height="25"/>
                                <span className="ml-3">0 {t('campaign_detail_page.entries')}</span>
                            </div>
                            <div className="div-item promotion-list-item-title">
                                <div className="menubar" style={{lineHeight: "2.5rem"}}>
                                    {t('campaign_detail_page.maximum_participants')}
                                </div>
                                <img src={images.user} width="25" height="25"/>
                                <span className="ml-3">{campaignData.number_of_eligible_people} {t('campaign_detail_page.participants')}</span>
                            </div>
                        </Col>
                    </Row>

                    <Row className="mb-4 mt-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel 
                                type="twitter" 
                                actions=''
                                title="Tweet about the giveaway" 
                                openConfirmModal={openConfirmModal}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel 
                                type="facebook" 
                                actions=''
                                title="Visit Converse on Facebook" 
                                openConfirmModal={openConfirmModal}
                            />  
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel 
                                type="youtube" 
                                actions=''
                                title="Follow Converse on YouTube" 
                                openConfirmModal={openConfirmModal}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel 
                                type="other" 
                                title="What is your favorite animal?" 
                                openConfirmModal={openConfirmModal}
                            />
                        </Col>
                    </Row>

                </Col>
            </Row>
            <FooterLink/>
            <Footer/>

            <VideoPlayerModal open={openVideo} onToggle={handleOpenVideo}/>
            <ParticipateConfirmModal open={openConfirm} onToggle={handleOpenConfirm}/>
        </div>
    );
}

export default withRouter(CampaignDetail);
