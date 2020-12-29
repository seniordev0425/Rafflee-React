import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Drawer } from 'antd'
import { Row } from 'reactstrap'
import LoginSignupBaseModal from '../../modals/LoginSignupBaseModal'
import images from '../../../utils/images'
import { useTranslation } from 'react-i18next'

function HeaderBeforeLogin({ openLoginModal }) {
  const { t } = useTranslation()

  const [modal, setModal] = useState(openLoginModal)
  const [companyStatus, setCompanyStatus] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [visible, setVisible] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth <= 1000)
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
    // Switch login, sign up modals depends on 'isLogin' state
    setIsLogin(val)
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
          <div>
            <span className="mx-3 font-weight-bold header-btn" onClick={() => toggle(true)}>
              {t('header.log_in')}
            </span>
          </div>
          <div>
            <span className="mx-3 font-weight-bold header-btn" onClick={() => toggle(false)}>
              {t('header.sign_in')}
            </span>
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
              <div className="mb-2 font-size-10 font-weight-bold"><Link to="/about" style={{ color: '#767B83' }}>{t('header.about')}</Link></div>
              <div className="mb-2 font-size-10 font-weight-bold"><Link to="/deals" style={{ color: '#767B83' }}>{t('header.campaigns')}</Link></div>
              <div className="mb-2 font-size-10 color-blue font-weight-bold" style={{ color: '#767B83' }} onClick={() => toggle(false)}>{t('header.sign_in')}</div>
              <div className="mb-2 font-size-10 color-blue font-weight-bold" style={{ color: '#767B83' }} onClick={() => toggle(true)}>{t('header.log_in')}</div>
            </Drawer>
          </>
        )
      }
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