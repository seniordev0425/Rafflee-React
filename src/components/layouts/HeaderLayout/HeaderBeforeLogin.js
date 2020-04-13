import React, { useState, useEffect } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'
import LoginSignupBaseModal from '../../modals/LoginSignupBaseModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
import SelectLanguage from './SelectLanguage'
import { useTranslation } from 'react-i18next'


function HeaderBeforeLogin() {
    const { t } = useTranslation()

    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [dropdownOpen, setOpen] = useState(false)

    const dropDownToggle = () => setOpen(!dropdownOpen)

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

    useEffect(() => {
        setHide(window.innerWidth <= 1000)
        window.addEventListener('resize', resize)

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const resize = () => {
        setHide(window.innerWidth <= 1000)
    }

    return (
        <>
            {!hide ? (
                <Row>
                    <Link to="/deals"><Button type="link" className="no-border-btn mr-3 h-100">{t('header.campaigns')}</Button></Link>
                    <Button className="white-btn mr-3" style={{ width: 140 }} onClick={() => toggle(false)}>{t('header.sign_in')}</Button>
                    <Button type="primary" className="ant-blue-btn mr-3" style={{ width: 140 }} onClick={() => toggle(true)}>{t('header.log_in')}</Button>
                    <FontAwesomeIcon icon={faQuestionCircle} className="font-size-19 color-blue pointer mr-3 mt-1" />
                    <SelectLanguage />
                </Row>
            ) : (
                    <ButtonDropdown isOpen={dropdownOpen} toggle={() => void 0}>
                        <DropdownToggle caret onClick={dropDownToggle}>
                        </DropdownToggle>
                        <DropdownMenu style={{ left: -115 }}>
                            <DropdownItem><Link to="/deals">{t('header.campaigns')}</Link></DropdownItem>
                            <DropdownItem onClick={() => toggle(false)}>{t('header.sign_in')}</DropdownItem>
                            <DropdownItem onClick={() => toggle(false)}>{t('header.log_in')}</DropdownItem>
                            <DropdownItem><SelectLanguage /></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                )}
            <LoginSignupBaseModal modal={modal} isLogin={isLogin ? true : false} switch_login_signin={switch_login_signin} toggle={toggle} companyStatus={companyStatus} showCompanyModal={showCompanyModal} />

        </>
    )
}

export default HeaderBeforeLogin;