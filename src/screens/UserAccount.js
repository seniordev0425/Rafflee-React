import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Menu } from 'antd'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import UserAccountForm from '../components/layouts/account/UserAccountForm'
import CompanyAccountForm from '../components/layouts/account/CompanyAccountForm'
import UserSettings from '../components/layouts/account/UserSettings/UserSettings'
import images from '../utils/images'
import { useTranslation } from 'react-i18next'

const UserAccount = (props) => {
    const { t } = useTranslation()

    const { match } = props

    const company = useSelector(state => state.userInfo.company)

    useEffect(() => {
        document.title = "UserAccount"
    }, [])

    return (
        <div style={{ fontFamily: "sofiapro" }}>
            <JoinHeader />
            <Header />
            <div className="menubar-container">
                <Row>
                    <Col xs="12" sm={{ size: 10, offset: 1 }}>
                        <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
                            <Menu.Item key="profile">
                                <Link to="/user-account/profile">
                                    <img src={company ? images.company_icon : images.user_icon} />
                                    <span className="ml-3"> {company ? t('menubar.company_profile') : t('menubar.user_profile')}</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="settings">
                                <Link to="/user-account/settings">
                                    <span className="ml-3"> {t('menubar.settings')}</span>
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
            <div>
                {match.params.menu === 'profile' &&
                    <Row className="mb-5">
                        <Col xs="12" sm={{ size: 10, offset: 1 }}>
                            {company ? (<CompanyAccountForm />) : (<UserAccountForm />)}
                        </Col>
                    </Row>
                }
                {match.params.menu === 'settings' &&
                    <UserSettings />
                }
            </div>
            <FooterLink />
            <Footer />
        </div>
    )
}

export default UserAccount
