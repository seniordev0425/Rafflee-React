import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { Row } from 'reactstrap';
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

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (SUCCESS_LOG_OUT) {
            history.push('/')
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_LOG_OUT', data: false })
        }
    }, [SUCCESS_LOG_OUT])

    useEffect(() => {
        setHide(window.innerWidth <= 1000)
        window.addEventListener('resize', resize)
        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    const log_Out = () => {
        dispatch(logOut())
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
                    <Link to={company ? "/dashboard/my-campaign" : "/dashboard/participation-history"}>
                        <Button type="primary" className="ant-blue-btn mr-3" style={{ width: 140 }}>{t('header.dashboard')}</Button>
                    </Link>
                    <Link to="/user-account/profile" className="d-flex align-items-center mx-3">
                        <img src={company ? (companyProfile.logo || images.account_icon) : (userProfile.profile_picture || images.account_icon)} width={27} height={27} className="rounded-circle" />
                    </Link>
                    <div onClick={log_Out} className="pointer mr-3">
                        <Button type="link" className="no-border-btn h-100">{t('header.log_out')}</Button>
                        <img src={images.logout_icon} className="logout-icon" />
                    </div>
                    <SelectLanguage />
                </Row>
            ) : (
                    <>
                        <img src={images.menu_icon} width={40} height={40} onClick={showDrawer} />
                        <Drawer
                            placement="left"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                        >
                            <div className="mb-2 font-size-10"><Link to="/deals">{t('header.campaigns')}</Link></div>
                            <div className="mb-2 font-size-10"><Link to="/user-account/profile">{t('header.account')}</Link></div>
                            <div className="mb-2 font-size-10"><Link to={company ? "/dashboard/my-campaign" : "/dashboard/participation-history"}>{t('header.dashboard')}</Link></div>
                            <div className="mb-2 font-size-10" onClick={log_Out}><Link to="/">{t('header.log_out')}</Link></div>
                            <div><SelectLanguage /></div>
                        </Drawer>
                    </>
                )
            }
        </>
    )
}

export default withRouter(HeaderAfterLogin)