import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { withRouter, Link } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { Row } from 'reactstrap';
import images from '../../../utils/images'
import { logOut } from '../../../actions/userInfo'
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

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (SUCCESS_LOG_OUT) { // Redirect user to home page after logout
      history.push('/')
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_LOG_OUT', data: false })
    }
  }, [SUCCESS_LOG_OUT])

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1000)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])

  const log_Out = () => {
    dispatch(logOut())
  }

  const resize = () => {
    // if screen width is less than 1000 then this device is mobile or tablet
    setIsMobile(window.innerWidth <= 1000)
  }

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      {!isMobile ? (
        <Row className="align-items-center">
          {window.location.pathname === '/' &&
            <Link to="/about">
              <span className="mr-3 font-weight-bold header-btn">
                {t('header.about')}
              </span>
            </Link>
          }
          <Link to="/deals">
            <span className="mx-3 font-weight-bold header-btn">
              {t('header.campaigns')}
            </span>
          </Link>

          <Link to="/my-circle">
            <span className="mx-3 font-weight-bold header-btn">
              {t('menubar.my_circle')}
            </span>
          </Link>
          <div style={{ border: '1px solid #767b8340', height: 30 }} className="mx-3">

          </div>
          <Link to="/user-account/profile" className="d-flex align-items-center mx-3">
            <img
              src={company ? (companyProfile.logo || images.account_icon) : (userProfile.profile_picture || images.account_icon)}
              width={27}
              height={27}
              className="rounded-circle"
              alt=""
            />
          </Link>

          <Link to="/user-account/profile">
            <span className="mx-3 font-weight-bold header-btn header-span-fixed-length">
              {company ? companyProfile.username : userProfile.username}
            </span>
          </Link>


          <Link to={company ? "/dashboard/my-campaign" : "/dashboard/inventory"}>
            <span className="mx-3 font-weight-bold header-btn">
              {t('header.inventory')}
            </span>
          </Link>

          <div onClick={log_Out} className="pointer mx-3">
            <span className="mr-3 font-weight-bold header-btn">
              {t('header.log_out')}
            </span>
            <img src={images.logout_icon} className="logout-icon" alt="" />
          </div>
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
              <div className="mb-2 font-size-10 font-weight-bold">
                <Link to="/about" style={{ color: '#767B83' }}>{t('header.about')}</Link>
              </div>

              <div className="mb-2 font-size-10 font-weight-bold">
                <Link to="/deals" style={{ color: '#767B83' }}>{t('header.campaigns')}</Link>
              </div>

              <div className="mb-2 font-size-10 font-weight-bold">
                <Link to="/my-circle" style={{ color: '#767B83' }}>{t('menubar.my_circle')}</Link>
              </div>

              <div className="mb-2 font-size-10 font-weight-bold">
                <Link to={company ? "/dashboard/my-campaign" : "/dashboard/inventory"} style={{ color: '#767B83' }}>{t('header.inventory')}</Link>
              </div>

              <div className="mb-2 font-size-10 font-weight-bold">
                <Link to="/user-account/profile" style={{ color: '#767B83' }}>{t('header.account')}</Link>
              </div>

              <div className="mb-2 font-size-10 font-weight-bold" onClick={log_Out}>
                <Link to="/" style={{ color: '#767B83' }}>{t('header.log_out')}</Link>
              </div>
            </Drawer>
          </>
        )
      }
    </>
  )
}

export default withRouter(HeaderAfterLogin)