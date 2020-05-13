import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { Button } from 'antd'
import { Row, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import images from '../../../utils/images'
import { logOut } from '../../../actions/userInfo'
import SelectLanguage from './SelectLanguage'
import { useTranslation } from 'react-i18next'

function HeaderAfterLogin(props) {
    const { t } = useTranslation()

    const { history } = props

    const company = useSelector(state => state.userInfo.company)
    const userProfile = useSelector(state => state.userInfo.userProfile)
    const companyProfile = useSelector(state => state.userInfo.companyProfile)

    const SUCCESS_LOG_OUT = useSelector(state => state.userInfo.SUCCESS_LOG_OUT)

    const dispatch = useDispatch()

    useEffect(() => {
        if (SUCCESS_LOG_OUT) {
            history.push('/')
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_LOG_OUT', data: false })
        }
    }, [SUCCESS_LOG_OUT])

    const log_Out = () => {
        dispatch(logOut())
    }

    const [hide, setHide] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);

    const dropDownToggle = () => setOpen(!dropdownOpen);

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
                    <Link to={company ? "/dashboard/my-campaign" : "/dashboard/participation-history"}>
                        <Button type="primary" className="ant-blue-btn mr-3" style={{ width: 140 }}>{t('header.dashboard')}</Button>
                    </Link>
                    <Link to="/user-account" className="d-flex align-items-center mx-3">
                        <img src={(companyProfile.logo || userProfile.profile_picture) ? (company ? companyProfile.logo : userProfile.profile_picture) : images.account_icon} width={27} height={27} className="rounded-circle" />
                    </Link>
                    <div onClick={log_Out} className="pointer mr-3">
                        <Button type="link" className="no-border-btn h-100">{t('header.log_out')}</Button>
                        <img src={images.logout_icon} className="logout-icon" />
                    </div>
                    <SelectLanguage />
                </Row>
            ) : (
                    <ButtonDropdown isOpen={dropdownOpen} toggle={() => void 0}>
                        <DropdownToggle caret onClick={dropDownToggle}>

                        </DropdownToggle>
                        <DropdownMenu style={{ left: -115 }}>
                            <DropdownItem><Link to="/deals">{t('header.campaigns')}</Link></DropdownItem>
                            <DropdownItem><Link to="/user-account">Account</Link></DropdownItem>
                            <DropdownItem><Link to={company ? "/dashboard/my-campaign" : "/dashboard/participation-history"}>{t('header.dashboard')}</Link></DropdownItem>
                            <DropdownItem onClick={log_Out}><Link to="/">{t('header.log_out')}</Link></DropdownItem>
                            <DropdownItem><SelectLanguage /></DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>
                )}
        </>
    )
}

export default withRouter(HeaderAfterLogin)