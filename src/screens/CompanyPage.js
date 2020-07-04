import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button, Tooltip, Checkbox } from 'antd'
import { withRouter } from 'react-router-dom'
import ReactPlayer from 'react-player'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import Loading from '../components/common/Loading'
import CircleFollowModal from '../components/modals/CircleFollowModal'
import CircleUnfollowModal from '../components/modals/CircleUnfollowModal'
import { getCompanyInformation } from '../actions/userInfo'
import images from '../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function CompanyPage(props) {
    const { t } = useTranslation()
    const { id } = props.match.params

    const token = useSelector(state => state.userInfo.token)
    const companyInformation = useSelector(state => state.userInfo.companyInformation)
    const GET_COMPANY_INFORMATION_PROCESS = useSelector(state => state.userInfo.GET_COMPANY_INFORMATION)
    const dispatch = useDispatch()

    const [openFollowModal, setFollowModal] = useState(false)
    const [openUnfollowModal, setUnfollowModal] = useState(false)

    const [twitterVisible, setTwitterVisible] = useState(true)
    const [instagramVisible, setInstagramVisible] = useState(true)

    useEffect(() => {
        document.title = "Company Page"
        dispatch(getCompanyInformation(id, { token: token }))
    }, [])

    const handleFollowModal = () => {
        setFollowModal(!openFollowModal)
    }

    const handleUnfollowModal = () => {
        setUnfollowModal(!openUnfollowModal)
    }

    const twitter_tooltip = (
        <div className="font-size-10">
            <span><span className="font-weight-bold">{((companyInformation.social_wall || {}).twitter || {}).followers}</span> {t('my_circle_page.followers')}</span>
            <span className="ml-3"><span className="font-weight-bold">{((companyInformation.social_wall || {}).twitter || {}).friends}</span> {t('my_circle_page.friends')}</span>
        </div>
    )

    const getSocialWalls = () => {
        let socialWalls = [];

        (((companyInformation.social_wall || {}).twitter || {}).tweets || []).forEach((item) =>
            socialWalls.push({ ...item, social_name: 'twitter' })
        );

        (((companyInformation.social_wall || {}).instagram || {}).publication || []).forEach((item) =>
            socialWalls.push({ ...item, social_name: 'instagram' })
        );

        socialWalls.sort((a, b) => {
            var keyA = Date.parse(a.created_at)
            var keyB = Date.parse(b.created_at)
            // Compare the 2 dates
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1
            return 0
        })
        return socialWalls
    }

    const renderCompanyWall = () => {
        let socialWalls = getSocialWalls()

        return (
            socialWalls.map((item, index) =>
                <div key={index}>
                    {item.social_name === 'twitter' && twitterVisible &&
                        <Row className="social-wall-container">
                            <Col xs="12" sm={{ size: 10, offset: 1 }}>
                                <Row>
                                    <Col lg="1" md="2" sm="2" xs="3" className="company-wall-img">
                                        <img src={((companyInformation.social_wall || {}).twitter || {}).profile_image_url} alt="" />
                                    </Col>
                                    <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                                        <div className="d-sm-flex">
                                            <div>
                                                <Tooltip title={twitter_tooltip}>
                                                    <img src={images.twitter_icon} width={22} height={20} className="pointer" alt="" />
                                                </Tooltip>
                                                <span className="font-size-10 font-weight-bold color-blue ml-3">{((companyInformation.social_wall || {}).twitter || {}).name}</span>
                                            </div>
                                        </div>
                                        <div className="mt-2 font-size-9">
                                            <div>{item.text}</div>
                                            <div className="color-gray">{moment(item.created_at).format("ddd, MMM Do YYYY")}</div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                    {item.social_name === 'instagram' && instagramVisible &&
                        <Row className="social-wall-container">
                            <Col xs="12" sm={{ size: 10, offset: 1 }}>
                                <Row>
                                    <Col lg="1" md="2" sm="2" xs="3" className="company-wall-img">
                                        <img src={images.profile_img} alt="" />
                                    </Col>
                                    <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                                        <Row>
                                            <Col sm="12" md="4" className="px-0">
                                                <div className="d-sm-flex">
                                                    <div>
                                                        <img src={images.instagram_icon} width={20} height={20} alt="" />
                                                        <span className="font-size-10 font-weight-bold color-blue ml-3">{((companyInformation.social_wall || {}).instagram || {}).name}</span>
                                                    </div>
                                                </div>
                                                <div className="mt-2 font-size-9">
                                                    <div>{item.text}</div>
                                                    <div className="color-gray">{moment(item.created_at).format("ddd, MMM Do YYYY")}</div>
                                                </div>
                                            </Col>
                                            <Col sm="12" md="8" className="px-0 mt-3 mt-md-0">
                                                <div className="d-flex justify-content-center">
                                                    <a href={item.permalink} target='blank'>
                                                        {item.media_type === 'IMAGE' &&
                                                            <img src={item.media_url} className="instagram-wall-img" />
                                                        }
                                                        {item.media_type === 'VIDEO' &&
                                                            <ReactPlayer
                                                                // controls
                                                                loop
                                                                playing
                                                                url={item.media_url}
                                                                width='100%'
                                                                height="100%"
                                                                style={{ borderRadius: 10 }}
                                                            />
                                                        }
                                                    </a>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    }
                </div>

            )
        )
    }

    if (GET_COMPANY_INFORMATION_PROCESS) return <Loading />

    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <div className="parent-header-container">
                <JoinHeader />
                <Header />
            </div>
            <div className="company-page-header">
                <Row>
                    <Col xs="12" sm={{ size: 10, offset: 1 }}>
                        <Row>
                            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                                <img src={companyInformation.company.logo_url ? companyInformation.company.logo_url : images.profile_img} className="rounded-circle" alt="" />
                            </Col>
                            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                                <div className="d-md-flex justify-content-md-between">
                                    <div className="d-md-flex align-items-md-center">
                                        <div className="font-size-12 font-weight-bold">
                                            {companyInformation.company.company_name}
                                            {companyInformation.company.certified &&
                                                <img src={images.verified_icon} width={20} height={20} className="ml-3 mt-n1" alt="" />
                                            }
                                        </div>
                                        <div className="ml-0 ml-md-3 color-gray font-size-10 d-md-flex">
                                            <div className="mr-md-3">
                                                {t('company_page.member_since')}
                                                {` ${moment(companyInformation.company.member_since).format("MMM Do YYYY")}`}
                                            </div>
                                            <div>
                                                {`${t('my_circle_page.followers')}: ${companyInformation.company.number_of_follower}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3 mt-md-0">
                                        {companyInformation.company.website_url &&
                                            <a href={companyInformation.company.website_url || '#'}><img src={images.globe_gray_icon} width={20} height={20} className="mr-5" alt="" /></a>
                                        }
                                        {companyInformation.company.instagram_page_url &&
                                            <a href={companyInformation.company.instagram_page_url || '#'}><img src={images.instagram_gray_icon} width={20} height={20} className="mr-5" alt="" /></a>
                                        }
                                        {companyInformation.company.facebook_page_url &&
                                            <a href={companyInformation.company.facebook_page_url || '#'}><img src={images.facebook_gray_icon} width={8} height={20} alt="" /></a>
                                        }
                                    </div>
                                </div>
                                <div className="font-size-12 mt-4">{companyInformation.company.description}</div>
                                {(token) &&
                                    <div style={{ marginTop: "20px" }}>
                                        <Row>
                                            <Col className="px-0">
                                                <Button
                                                    type="primary"
                                                    className="ant-blue-btn promotion-list-item-btn"
                                                    onClick={companyInformation.company.follow ? handleUnfollowModal : handleFollowModal}
                                                >
                                                    {companyInformation.company.follow ? t('button_group.unfollow_circle') : t('button_group.follow_circle')}
                                                </Button>
                                            </Col>
                                            <Col className="d-flex align-items-center mt-3 justify-content-start justify-content-md-end px-0">
                                                <div className="d-flex align-items-center">
                                                    {(((companyInformation.social_wall || {}).twitter || {}).tweets || []).length > 0 &&
                                                        <div className="d-flex align-items-center justify-content-center">
                                                            <Checkbox
                                                                className="big-checkbox"
                                                                checked={twitterVisible}
                                                                onChange={(e) => setTwitterVisible(e.target.checked)}
                                                            />
                                                            <img src={images.twitter_icon} width={23} height={20} className="ml-2" alt="" />
                                                        </div>
                                                    }
                                                    {(((companyInformation.social_wall || {}).instagram || {}).publication || []).length > 0 &&
                                                        <div className="d-flex align-items-center justify-content-center ml-4">
                                                            <Checkbox
                                                                className="big-checkbox"
                                                                checked={instagramVisible}
                                                                onChange={(e) => setInstagramVisible(e.target.checked)}
                                                            />
                                                            <img src={images.instagram_icon} width={20} height={20} className="ml-2" alt="" />
                                                        </div>
                                                    }
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <div className="min-height-container">
                {renderCompanyWall()}
            </div>
            <FooterLink />
            <Footer />
            <CircleFollowModal open={openFollowModal} onToggle={handleFollowModal} pk={companyInformation.company.pk} companyName={companyInformation.company.company_name} />
            <CircleUnfollowModal open={openUnfollowModal} onToggle={handleUnfollowModal} pk={companyInformation.company.pk} companyName={companyInformation.company.company_name} />
        </div>
    )
}

export default withRouter(CompanyPage)
