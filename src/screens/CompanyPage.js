import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import { withRouter } from 'react-router-dom'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import Loading from '../components/common/Loading'
import CircleFollowModal from '../components/modals/CircleFollowModal'
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

    useEffect(() => {
        document.title = "Company Page"
        dispatch(getCompanyInformation(id))
    }, []);

    const handleFollowModal = () => {
        setFollowModal(!openFollowModal)
    }

    if (GET_COMPANY_INFORMATION_PROCESS) return <Loading />

    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <div className="company-page-header">
                <Row>
                    <Col xs="12" sm={{ size: 10, offset: 1 }}>
                        <Row>
                            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                                <img src={companyInformation.logo_url ? companyInformation.logo_url : images.profile_img} className="rounded-circle" />
                            </Col>
                            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                                <div className="d-sm-flex justify-content-sm-between">
                                    <div className="d-sm-flex align-items-sm-center">
                                        <div className="font-size-12 font-weight-bold">
                                            {companyInformation.company_name}
                                            {companyInformation.certified &&
                                                <img src={images.verified_icon} width={20} height={20} className="ml-3 mt-n1" />
                                            }
                                        </div>
                                        <div className="ml-0 ml-sm-3 color-gray font-size-10">
                                            {t('company_page.member_since')}
                                            {` ${moment(companyInformation.member_since).year()}`}
                                        </div>
                                    </div>
                                    <div className="mt-3 mt-sm-0">
                                        <a href={companyInformation.website_url || '#'}><img src={images.globe_gray_icon} width={20} height={20} className="mr-5" /></a>
                                        <a href={companyInformation.instagram_page_url || '#'}><img src={images.instagram_gray_icon} width={20} height={20} className="mr-5" /></a>
                                        <a href={companyInformation.facebook_page_url || '#'}><img src={images.facebook_gray_icon} width={8} height={20} /></a>
                                    </div>
                                </div>
                                <div className="font-size-12 mt-4">{companyInformation.description}</div>
                                {token &&
                                    <div style={{ marginTop: "20px", height: "40px" }}>
                                        <Button
                                            size="lg"
                                            color="primary"
                                            className="bootstrap-blue-btn promotion-list-item-btn"
                                            onClick={handleFollowModal}
                                        >
                                            {t('button_group.follow_circle')}
                                        </Button>
                                    </div>
                                }

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
            <FooterLink />
            <Footer />
            <CircleFollowModal open={openFollowModal} onToggle={handleFollowModal} pk={companyInformation.pk} />
        </div>
    );
}

export default withRouter(CompanyPage);
