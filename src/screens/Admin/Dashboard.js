import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Menu } from 'antd'

import BusinessCreateLayout from '../../components/adminLayouts/Dashboard/BusinessCreateLayout'
import CampaignLayout from '../../components/adminLayouts/Dashboard/Campaign'
import MessagesLayout from '../../components/adminLayouts/Dashboard/MessagesLayout'

import { useTranslation } from 'react-i18next'


function Dashboard(props) {
  const { t } = useTranslation()

  const { match } = props

  useEffect(() => {
    document.title = "Dashboard"
  }, [])

  const renderBody = () => {
    switch (match.params.menu) {
      case 'business-create':
        return (
          <Row className="mt-5">
            <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
              <BusinessCreateLayout />
            </Col>
          </Row>
        )
      case 'campaigns':
        return <CampaignLayout />
      case 'messages':
        return <MessagesLayout />
      default:
        return <BusinessCreateLayout />
    }
  }

  return (
    <React.Fragment>
      <div className="menubar-container">
        <Row>
          <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
            <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
              <Menu.Item key="business-create">
                <Link to="/admin/dashboard/business-create">
                  <span> {t('menubar.business_create')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="campaigns">
                <Link to="/admin/dashboard/campaigns">
                  <span> {t('menubar.campaigns')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="recruitment">
                <Link to="/admin/dashboard/recruitment">
                  <span> {t('menubar.recruitment')}</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="messages">
                <Link to="/admin/dashboard/messages">
                  <span> {t('menubar.messages')}</span>
                </Link>
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
      <div>
        {renderBody()}
      </div>
    </React.Fragment>
  )
}

export default withRouter(Dashboard)
