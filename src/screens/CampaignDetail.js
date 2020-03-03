import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'
import { Checkbox, Tooltip } from 'antd'

import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import images from '../utils/images'

import CustomCollapsePanel from '../components/common/CustomCollapsePanel'

function CampaignDetail(props){
    const { history, match } = props

    useEffect(() => {
        document.title = "Campaign Detail"
    })

    return (
        <div style={{fontFamily:"sofiapro"}}>
            <JoinHeader/>
            <Header/>

            <Row style={{borderTop:"2px solid #7e9aa817"}}>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row className="my-5">
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">Pewdiepie - keyboard Giveaway</div>
                            <div style={{marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
                                <div style={{width: "70%", fontSize:"1.1rem"}}>Get a chance to win t-shirts autographed by me and a pick of stickers.</div>
                                <div className="promotion-list-item-star">
                                    <img src={images.trans_star}/>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>

                    <Row className="mt-4 mb-5" style={{height: "32vw", marginLeft: 15, marginRight: 15, padding: 0, border: "2px solid #8ACDFF"}}>

                        <Col className="px-0">
                        </Col>
                        <Col className="px-0">
                        </Col>
                        <Col className="px-0 dotted-left-border" >
                            <div className="top-half-circle"></div>
                            <div className="bottom-half-circle"></div>
                        </Col>
                    </Row>

                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="twitter"/>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="facebook"/>  
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="youtube"/>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col style={{paddingLeft: 40}}>
                            <CustomCollapsePanel type="other"/>
                        </Col>
                    </Row>

                </Col>
            </Row>

            <FooterLink/>
            <Footer/>
            

        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company
    }
}
export default compose(withRouter, connect(mapStateToProps))(CampaignDetail);
