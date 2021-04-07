import React, { useState, useEffect } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'
import moment from 'moment'
import SetupSection from './Setup/SetupSection'
import CampaignType from './CampaignType/CampaignType'
import ActionSection from './Action/ActionSection'
import PreviewSection from './Preview/PreviewSection'
import PaymentSection from './Payment/PaymentSection'
import ResumeSection from './Resume/ResumeSection'

import { facebookActionsMap } from './Action/Facebook/helper'
import { twitterActionsMap } from './Action/Twitter/helper'
import { instagramActionsMap } from './Action/Instagram/helper'
import { pollActionsMap } from './Action/Poll/helper'
import { tiktokActionsMap } from './Action/Tiktok/helper'
import { youtubeActionsMap } from './Action/Youtube/helper'
import { websiteActionsMap } from './Action/Website/helper'
import { twitchActionsMap } from './Action/Twitch/helper'

import { useTranslation } from 'react-i18next'

function CreateCampaignLayout(props) {
  const { t } = useTranslation()

  const {
    onChangeSection,
    selectedCampaign
  } = props

  // Enum (setup, campaign_type, action, preview, payment, resume)
  const [currentSection, setCurrentSection] = useState('setup')

  // This state includes all params to create campaign
  const [params, setParams] = useState({
    pk: '',
    promotion_name: '',
    promotion_picture: '',
    promotion_description: '',
    promotion_long_description: '',
    public_promotion: 'public',
    categories: [],
    countries: [],
    temp_categories: [],
    start_date: '',
    end_date: '',
    winnings: [{ name: '', number_of_people: '', description: '', image: [] }],
    campaign_type: 'giveaway',
    live_draw: false,
    limit_participants: false,
    limitation_participation: 0,
    facebook: [],
    twitter: [],
    youtube: [],
    instagram: [],
    twitch: [],
    tiktok: [],
    poll: [],
    url_website: []
  })

  // Update params with being created campaign data
  useEffect(() => {
    if (selectedCampaign) {
      setParams({
        pk: selectedCampaign.pk,
        promotion_name: selectedCampaign.campaign_name,
        promotion_picture: selectedCampaign.campaign_image,
        promotion_description: selectedCampaign.description,
        promotion_long_description: selectedCampaign.long_description,
        public_promotion: 'public',
        categories: selectedCampaign.categories ? selectedCampaign.categories : [],
        temp_categories: selectedCampaign.categories ? selectedCampaign.categories : [],
        countries: selectedCampaign.countries ? selectedCampaign.countries : [],
        start_date: selectedCampaign.release_date ? moment(selectedCampaign.release_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        end_date: selectedCampaign.end_date ? moment(selectedCampaign.end_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        winnings: selectedCampaign.winnings ? selectedCampaign.winnings : [{ name: '', number_of_people: '', description: '', image: [] }],
        campaign_type: selectedCampaign.type_of_distribution,
        live_draw: selectedCampaign.live_draw,
        limit_participants: false,
        limitation_participation: selectedCampaign.number_of_maximum_participants,
        facebook: selectedCampaign.action_participate.facebook.map(facebookActionsMap),
        youtube: selectedCampaign.action_participate.youtube.map(youtubeActionsMap),
        twitter: selectedCampaign.action_participate.twitter.map(twitterActionsMap),
        instagram: selectedCampaign.action_participate.instagram.map(instagramActionsMap),
        twitch: selectedCampaign.action_participate.twitch.map(twitchActionsMap),
        tiktok: selectedCampaign.action_participate.tiktok.map(tiktokActionsMap),
        poll: selectedCampaign.action_participate.poll.map(pollActionsMap),
        url_website: selectedCampaign.action_participate.website.map(websiteActionsMap),
      })
    }
  }, [selectedCampaign])

  // Update params 
  const _setParams = (key, val) => {
    let temp_params = { ...params }
    temp_params[key] = val
    setParams(temp_params)
  }

  // Update params too. But this function is for only social action params
  const _setAction = (socialName, actionId, newAction) => {
    let temp_params = { ...params }
    temp_params[socialName] = temp_params[socialName].map(action => action.id !== actionId
      ? action
      : newAction
    )
    setParams(temp_params)
  }

  // Switch section
  const _setSection = (section) => {
    setCurrentSection(section)
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'setup':
        return <SetupSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'campaign_type':
        return <CampaignType
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'action':
        return <ActionSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
          setAction={_setAction}
        />
      case 'preview':
        return <PreviewSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'payment':
        return <PaymentSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'resume':
        return <ResumeSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
        />
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
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </>
  )
}

export default CreateCampaignLayout