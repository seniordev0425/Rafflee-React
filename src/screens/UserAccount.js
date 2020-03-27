import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Menu } from 'antd'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import UserAccountForm from '../components/layouts/account/UserAccountForm'
import images from '../utils/images'
import CompanyAccountForm from '../components/layouts/account/CompanyAccountForm'

import { useTranslation } from 'react-i18next'


const UserAccount = (props) => {
    const { t } = useTranslation()

    const company = useSelector(state => state.userInfo.company)

    useEffect(() => {
        document.title = "UserAccount"
    }, []);

    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <div className="menubar-container">
                <Row>
                    <Col xs={{ size: 10, offset: 1 }}>
                        <Menu mode="horizontal" className="menubar" selectedKeys={['profile']}>
                            <Menu.Item key="profile">
                                <img src={company ? images.company_icon : images.user_icon} />
                                <span className="ml-3"> {company ? t('menubar.company_profile') : t('menubar.user_profile')}</span>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
            <div>
                <Row className="mb-5">
                    <Col xs={{ size: 10, offset: 1 }}>
                        {company ? (<CompanyAccountForm />) : (<UserAccountForm />)}
                    </Col>
                </Row>
            </div>
            <FooterLink />
            <Footer />
        </div>
    );
}

export default UserAccount;
