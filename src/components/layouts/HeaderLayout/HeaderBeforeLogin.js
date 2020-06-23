import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { Row } from 'reactstrap'
import LoginSignupBaseModal from '../../modals/LoginSignupBaseModal'
import SelectLanguage from './SelectLanguage'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

function HeaderBeforeLogin() {
    const { t } = useTranslation()

    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setHide(window.innerWidth <= 1000)
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])


    const showCompanyModal = () => setCompanyStatus(true)

    const toggle = (val) => {
        setIsLogin(val)
        setModal(!modal)
        setCompanyStatus(false)
    }

    const switch_login_signin = (val) => {
        setIsLogin(val)
    }

    const [hide, setHide] = useState(false)

    const resize = () => {
        setHide(window.innerWidth <= 1000)
    }

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

    return (
        <>
            {!hide ? (
                <Row>
                    <Link to="/deals"><Button type="link" className="no-border-btn mr-3 h-100">{t('header.campaigns')}</Button></Link>
                    <Button className="white-btn mr-3" style={{ width: 140 }} onClick={() => toggle(false)}>{t('header.sign_in')}</Button>
                    <Button type="primary" className="ant-blue-btn" style={{ width: 140 }} onClick={() => toggle(true)}>{t('header.log_in')}</Button>
                    <img src={images.question_icon} className="mx-4" alt="" />
                    <SelectLanguage />
                </Row>
            ) : (
                <>
                    <img src={images.menu_icon} width={40} height={40} onClick={showDrawer} alt="" />
                    <Drawer
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                    >
                        <div className="mb-2 font-size-10"><Link to="/deals">{t('header.campaigns')}</Link></div>
                        <div className="mb-2 font-size-10 color-blue" onClick={() => toggle(false)}>{t('header.sign_in')}</div>
                        <div className="mb-2 font-size-10 color-blue" onClick={() => toggle(false)}>{t('header.log_in')}</div>
                        <div><SelectLanguage /></div>
                    </Drawer>
                </>
            )}
            <LoginSignupBaseModal
                modal={modal}
                isLogin={isLogin ? true : false}
                switch_login_signin={switch_login_signin}
                toggle={toggle}
                companyStatus={companyStatus}
                showCompanyModal={showCompanyModal}
            />
        </>
    )
}

export default HeaderBeforeLogin