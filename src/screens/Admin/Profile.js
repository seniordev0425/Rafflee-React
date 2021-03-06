import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Menu } from 'antd'
import AdminAccountForm from '../../components/adminLayouts/Account/AdminAccountForm'
import AdminSettings from '../../components/adminLayouts/Account/AdminSettings/AdminSettings'
import images from '../../utils/images'
import { useTranslation } from 'react-i18next'

const Profile = (props) => {
  const { t } = useTranslation()

  const { match } = props

  const company = useSelector(state => state.userInfo.company)

  useEffect(() => {
    document.title = "Account"
  }, [])

  return (
    <React.Fragment>
      <div className="menubar-container">
        <Row>
          <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
            <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
              <Menu.Item key="profile">
                <Link to="/admin/account/profile">
                  <img src={match.params.menu === 'profile' ? images.user_icon : images.user_icon_black} alt="" />
                  <span className="ml-3"> {company ? t('menubar.company_profile') : t('menubar.user_profile')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="settings">
                <Link to="/admin/account/settings">
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
            <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
              <AdminAccountForm />
            </Col>
          </Row>
        }
        {match.params.menu === 'settings' &&
          <AdminSettings />
        }
      </div>
    </React.Fragment>
  )
}

export default Profile
