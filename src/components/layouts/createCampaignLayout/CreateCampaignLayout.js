import React, { useState } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'
import SetupSection from './Setup/SetupSection'
import CampaignType from './CampaignType/CampaignType'
import ActionSection from './Action/ActionSection'
import PreviewSection from './Preview/PreviewSection'
import PaymentSection from './Payment/PaymentSection'
import ResumeSection from './Resume/ResumeSection'

import { useTranslation } from 'react-i18next'

function CreateCampaignLayout() {
  const { t } = useTranslation()

  // Enum (setup, campaign_type, action, preview, payment, resume)
  const [currentSection, setCurrentSection] = useState('setup')

  // This state includes all params to create campaign
  const [params, setParams] = useState({
    promotion_name: '',
    promotion_picture: '',
    promotion_description: '',
    promotion_long_description: '',
    public_promotion: 'public',
    categories: [],
    temp_categories: [],
    start_date: '',
    end_date: '',
    winnings: [{ name: '', number_of_people: '', description: '', image: '' }],
    campaign_type: 'giveaway',
    live_draw: false,
    limit_participants: false,
    limitation_participation: 0,
    facebook: {
      post: false,
      post_entries: '',
      post_mandatory: false,
      post_like: false,
      post_comment: false,
      post_share: false,
      post_page_id: '',
      post_publication_id: '',
      url: false,
      url_entries: '',
      url_mandatory: false,
      url_url: '',
      url_like: false,
      url_share: false,
      page: false,
      page_entries: '',
      page_mandatory: false,
      page_page_id: '',
      page_page_name: '',
      page_follow: false,
      page_share: false
    },
    twitter: {
      comment: false,
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      like: false,
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      retweet: false,
      retweet_id: '',
      retweet_entries: '',
      retweet_mandatory: false,
      follow: false,
      follow_type: 'screen_name',
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false
    },
    instagram: {
      publication: false,
      profile: false,
      publication_url: '',
      profile_url: '',
      publication_entries: '',
      publication_mandatory: false,
      profile_entries: '',
      profile_mandatory: false
    },
    twitch: {
      follow: false,
      follow_name: '',
      follow_entries: '',
      follow_mandatory: false
    },
    tiktok: {
      publication: false,
      profile: false,
      publication_url: '',
      profile_url: '@',
      publication_entries: '',
      publication_mandatory: false,
      profile_entries: '',
      profile_mandatory: false
    },
    poll: 'false',
    url_video: {
      video: false,
      url: '',
      url_mobile: '',
      video_name: '',
      entries: '',
      mandatory: false
    },
    url_website: {
      website: false,
      url: '',
      entries: '',
      mandatory: false
    }
  })

  // Update params
  const _setParams = (key, val) => {
    let temp_params = { ...params }
    temp_params[key] = val
    setParams(temp_params)
  }

  // Update params too. But this function is for only social action params
  const _setAction = (socialName, actionType, val) => {
    let temp_params = { ...params }
    temp_params[socialName][actionType] = val
    setParams(temp_params)
    console.log(params)
  }

  // Switch section
  const _setSection = (section) => {
    setCurrentSection(section)
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'setup':
        return <SetupSection params={params} setParams={_setParams} setSection={_setSection} />
      case 'campaign_type':
        return <CampaignType params={params} setParams={_setParams} setSection={_setSection} />
      case 'action':
        return <ActionSection params={params} setParams={_setParams} setSection={_setSection} setAction={_setAction} />
      case 'preview':
        return <PreviewSection params={params} setParams={_setParams} setSection={_setSection} />
      case 'payment':
        return <PaymentSection params={params} setParams={_setParams} setSection={_setSection} />
      case 'resume':
        return <ResumeSection params={params} setParams={_setParams} setSection={_setSection} />
      default:
        return <SetupSection />
    }
  }

  return (
    <>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="setup" className="analytics-menuitem" onClick={() => setCurrentSection("setup")}>
              <span className={currentSection === 'setup' ? "underline font-weight-bold" : ""}> {t('menubar.setup')}</span>
            </Menu.Item>
            <Menu.Item key="campaign_type" className="analytics-menuitem" onClick={() => setCurrentSection("campaign_type")}>
              <span className={currentSection === 'campaign_type' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.campaign_type')}</span>
            </Menu.Item>
            <Menu.Item key="action" className="analytics-menuitem" onClick={() => setCurrentSection("action")}>
              <span className={currentSection === 'action' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.action')}</span>
            </Menu.Item>
            <Menu.Item key="preview" className="analytics-menuitem" onClick={() => setCurrentSection("preview")}>
              <span className={currentSection === 'preview' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.preview')}</span>
            </Menu.Item>
            <Menu.Item key="payment" className="analytics-menuitem" onClick={() => setCurrentSection("payment")}>
              <span className={currentSection === 'payment' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.payment')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </>
  )
}

export default CreateCampaignLayout