import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, Select } from 'antd'
import { Row, Col } from 'reactstrap'
import OverView from './OverView'
import Audience from './Audience'
import Engagement from './Engagement'
import Following from './Following'
import Clicks from './Clicks'
import images from '../../../utils/images'
import Loading from '../../common/Loading'
import { getCampaignsInformations } from '../../../actions/analytics'

import { useTranslation } from 'react-i18next'

function AnalyticsLayout() {
  const { t } = useTranslation()

  const companyProfile = useSelector(state => state.userInfo.companyProfile)
  const campaignsInformations = useSelector(state => state.analytics.campaignsInformations)
  const GET_CAMPAIGNS_INFORMATIONS_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGNS_INFORMATIONS)
  const dispatch = useDispatch()

  /////////////////////////////////////////// Enum (overview, audience, engagement, clicks, following)
  const [currentTab, setCurrentTab] = useState('overview')

  /////////////////////////////////////////// Enum (day, week, month, year)
  const [time, setTime] = useState('week')

  /////////////////////////////////////////// Enum (action, participation)
  const [demographics_type, setDemographicsType] = useState('action')

  /////////////////////////////////////////// audienceCampaignID('all' or campaignID)
  const [audienceCampaignID, setAudienceCampaignID] = useState('all')

  /////////////////////////////////////////// clicksCampaignID(campaignID)
  const [clicksCampaignID, setClicksCampaignID] = useState('')

  const { Option } = Select

  useEffect(() => {
    /////////////////////////////////////////// Load campaigns
    dispatch(getCampaignsInformations())
  }, [])

  useEffect(() => {
    if (campaignsInformations.length) {
      setClicksCampaignID(campaignsInformations[0].id)
    }
  }, [campaignsInformations])

  const renderBody = () => {
    switch (currentTab) {
      case 'overview':
        return <OverView time={time} />
      case 'audience':
        return <Audience demographics_type={demographics_type} campaignID={audienceCampaignID} />
      case 'engagement':
        return <Engagement />
      case 'clicks':
        return <Clicks time={time} campaignID={clicksCampaignID} />
      case 'following':
        return <Following />
      default:
        return <OverView time={time} />
    }
  }

  if (GET_CAMPAIGNS_INFORMATIONS_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentTab]}>
            <Menu.Item key="overview" className="analytics-menuitem" onClick={() => setCurrentTab("overview")}>
              <span className={currentTab === 'overview' ? "underline" : ""}> {t('menubar.overview')}</span>
            </Menu.Item>
            <Menu.Item key="audience" className="analytics-menuitem" onClick={() => setCurrentTab("audience")}>
              <span className={currentTab === 'audience' ? "ml-3 underline" : "ml-3"}> {t('menubar.audience')}</span>
            </Menu.Item>
            <Menu.Item key="engagement" className="analytics-menuitem" onClick={() => setCurrentTab("engagement")}>
              <span className={currentTab === 'engagement' ? "ml-3 underline" : "ml-3"}> {t('menubar.engagement')}</span>
            </Menu.Item>
            <Menu.Item key="clicks" className="analytics-menuitem" onClick={() => setCurrentTab("clicks")}>
              <span className={currentTab === 'clicks' ? "ml-3 underline" : "ml-3"}> {t('menubar.clicks')}</span>
            </Menu.Item>
            <Menu.Item key="following" className="analytics-menuitem" onClick={() => setCurrentTab("following")}>
              <span className={currentTab === 'following' ? "ml-3 underline" : "ml-3"}> {t('menubar.following')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <Row className="py-5">
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Row>
            <Col lg="6" xs="12" className="d-flex">
              <img src={companyProfile.logo || images.profile_img} width="100px" height="100px" className="mr-4 rounded-circle" alt="" />
              <div className="ml-5">
                <div className="font-weight-bold font-size-13">{companyProfile.company_name}</div>
                <div className="color-blue mt-5 font-size-11">{companyProfile.email}</div>
              </div>
            </Col>
            <Col lg="6" xs="12" className="d-flex justify-content-lg-end justify-content-between align-items-end mt-4">
              {currentTab === 'audience' &&
                <div className="mr-2">
                  <Select
                    size="large"
                    style={{ width: 140 }}
                    defaultValue={demographics_type}
                    onChange={val => setDemographicsType(val)}
                  >
                    <Option value="action">{t('analytics_page.action')}</Option>
                    <Option value="participation">{t('analytics_page.participation')}</Option>
                  </Select>
                </div>
              }
              {(currentTab === 'audience') &&
                <div className="mr-2">
                  <Select
                    size="large"
                    style={{ minWidth: 140 }}
                    value={audienceCampaignID}
                    onChange={val => setAudienceCampaignID(val)}
                  >
                    <Option value='all'>{t('analytics_page.all')}</Option>
                    {campaignsInformations.map((item, index) =>
                      <Option key={index} value={item.id}>{item.name}</Option>
                    )}
                  </Select>
                </div>
              }
              {(currentTab === 'clicks') &&
                <div className="mr-2">
                  <Select
                    size="large"
                    style={{ minWidth: 140 }}
                    value={clicksCampaignID}
                    onChange={val => setClicksCampaignID(val)}
                  >
                    {campaignsInformations.map((item, index) =>
                      <Option key={index} value={item.id}>{item.name}</Option>
                    )}
                  </Select>
                </div>
              }
              {(currentTab === 'overview' || currentTab === 'clicks') &&
                <div>
                  <Select
                    size="large"
                    style={{ width: 140 }}
                    defaultValue={time}
                    onChange={val => setTime(val)}
                  >
                    <Option value="day">{t('analytics_page.today')}</Option>
                    <Option value="week">{t('analytics_page.this_week')}</Option>
                    <Option value="month">{t('analytics_page.this_month')}</Option>
                    <Option value="year">{t('analytics_page.this_year')}</Option>
                  </Select>
                </div>
              }
            </Col>
          </Row>
        </Col>
      </Row>
      {renderBody()}
    </>
  )
}

export default AnalyticsLayout;