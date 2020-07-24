import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { Menu } from 'antd'
import AppLayout from '../components/layouts/AppLayout'

import MyCampaignLayout from '../components/layouts/myCampaignLayout/MyCampaignLayout'
import MyBillsLayout from '../components/layouts/myBillsLayout/MyBillsLayout'
import AnalyticsLayout from '../components/layouts/analytics'
import CreateCampaignLayout from '../components/layouts/createCampaignLayout/CreateCampaignLayout'
import InventoryLayout from '../components/layouts/inventoryLayout/InventoryLayout'
import ParticipationHistoryLayout from '../components/layouts/participationHistoryLayout/ParticipationHistoryLayout'
import MyFollowingLayout from '../components/layouts/myFollowingLayout/MyFollowingLayout'
import InProgressLayout from '../components/layouts/inProgressLayout/InProgressLayout'

import images from '../utils/images'

import { useTranslation } from 'react-i18next'

function Dashboard(props) {
  const { t } = useTranslation()

  const { match } = props
  const userInventory = useSelector(state => state.userInfo.userInventory)
  const userParticipationHistory = useSelector(state => state.userInfo.userParticipationHistory)
  const userInProgress = useSelector(state => state.userInfo.userInProgress)
  const myFollowing = useSelector(state => state.userInfo.myFollowing)

  useEffect(() => {
    document.title = "Dashboard"
  })

  const renderBody = () => {
    switch (match.params.menu) {
      case 'my-campaign':
        return <MyCampaignLayout />;
      case 'my-bills':
        return <MyBillsLayout />;
      case 'analytics':
        return <AnalyticsLayout />
      case 'create-campaign':
        return <CreateCampaignLayout />;
      case 'inventory':
        return <InventoryLayout />
      case 'participation-history':
        return <ParticipationHistoryLayout />
      case 'in-progress':
        return <InProgressLayout />
      case 'following':
        return <MyFollowingLayout />
      default:
        return <MyCampaignLayout />;
    }
  }

  return (
    <AppLayout>
      <div className="menubar-container">
        <Row>
          <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
            {props.company ? (
              <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
                <Menu.Item key="my-campaign">
                  <Link to="/dashboard/my-campaign">
                    <img src={match.params.menu === 'my-campaign' ? images.my_campaign_blue : images.my_campaign} alt="" />
                    <span className="ml-3"> {t('menubar.my_campaign')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="my-bills">
                  <Link to="/dashboard/my-bills">
                    <img src={match.params.menu === 'my-bills' ? images.my_bills_blue : images.my_bills} alt="" />
                    <span className="ml-3"> {t('menubar.my_bills')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="analytics">
                  <Link to="/dashboard/analytics">
                    <img src={match.params.menu === 'analytics' ? images.my_analytics_blue : images.my_analytics} alt="" />
                    <span className="ml-3"> {t('menubar.analytics')}</span>
                  </Link>
                </Menu.Item>
                <Menu.Item key="create-campaign" className="float-right">
                  <Link to="/dashboard/create-campaign">
                    <span className="ml-3"> {t('menubar.create_campaign')}</span>
                  </Link>
                </Menu.Item>
              </Menu>
            ) : (
                <Menu mode="horizontal" className="menubar" selectedKeys={[match.params.menu]}>
                  <Menu.Item key="inventory">
                    <Link to="/dashboard/inventory">
                      <img src={match.params.menu === 'inventory' ? images.inventory_icon_blue : images.inventory_icon} alt="" />
                      <span className="ml-3"> {t('menubar.inventory')} {`(${(userInventory || []).length})`}</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="participation-history">
                    <Link to="/dashboard/participation-history">
                      <img src={match.params.menu === 'participation-history' ? images.ph_icon_blue : images.ph_icon} alt="" />
                      <span className="ml-3"> {t('menubar.rafflee_history')} {`(${(userParticipationHistory || []).length})`}</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="in-progress">
                    <Link to="/dashboard/in-progress">
                      <img src={match.params.menu === 'in-progress' ? images.my_circle_icon_blue : images.my_circle_icon} alt="" />
                      <span className="ml-3"> {t('menubar.in_progress')} {`(${(userInProgress || []).length})`}</span>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="following">
                    <Link to="/dashboard/following">
                      <img src={match.params.menu === 'following' ? images.following_icon_blue : images.following_icon} alt="" />
                      <span className="ml-3"> {t('menubar.following')} {`(${(myFollowing || []).length})`}</span>
                    </Link>
                  </Menu.Item>
                </Menu>
              )}
          </Col>
        </Row>
      </div>
      <div>
        {renderBody()}
      </div>
    </AppLayout>
  )
}

function mapStateToProps(state) {
  return {
    token: state.userInfo.token,
    company: state.userInfo.company
  }
}
export default compose(withRouter, connect(mapStateToProps))(Dashboard)
