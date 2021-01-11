import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Menu, Tooltip } from 'antd'
import AppLayout from '../components/layouts/AppLayout'
import UserAccountForm from '../components/layouts/account/UserAccountForm'
import CompanyAccountForm from '../components/layouts/account/CompanyAccountForm'
import UserSettings from '../components/layouts/account/UserSettings/UserSettings'
import images from '../utils/images'
import { useTranslation } from 'react-i18next'

const UserAccount = (props) => {
  const { t } = useTranslation()

  const { match } = props

  const company = useSelector(state => state.userInfo.company)
  const userProfile = useSelector(state => state.userInfo.userProfile)

  useEffect(() => {
    document.title = "Account"
  }, [])

  return (
    <AppLayout>
      <div className="menubar-container">
        <Row>
          <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
            <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
              <Menu.Item key="profile">
                <Link to="/user-account/profile">
                  <img
                    src={company
                      ?
                      match.params.menu === 'profile' ? images.company_icon : images.company_icon_black
                      :
                      match.params.menu === 'profile' ? images.user_icon : images.user_icon_black}
                    alt=""
                  />
                  <span className="ml-3"> {company ? t('menubar.company_profile') : t('menubar.user_profile')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="settings">
                <Link to="/user-account/settings">
                  <span className="ml-3"> {t('menubar.settings')}</span>
                </Link>
              </Menu.Item>
              {company === false &&
                <React.Fragment>
                  <Tooltip title={t('tooltips.user_points')}>
                    <span className="float-right mr-3 pointer">
                      {`${t('menubar.points')}: ${userProfile.points}`}
                    </span>
                  </Tooltip>
                </React.Fragment>
              }
            </Menu>
          </Col>
        </Row>
      </div>
      <div>
        {match.params.menu === 'profile' &&
          <Row className="mb-5">
            <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
              {company ? (<CompanyAccountForm />) : (<UserAccountForm />)}
            </Col>
          </Row>
        }
        {match.params.menu === 'settings' &&
          <UserSettings />
        }
      </div>
    </AppLayout>
  )
}

export default UserAccount
