import React, { useState } from 'react'

import CampaignsPanel from './CampaignsPanel'
import CampaignDetailPanel from '../../createCampaignLayout/CreateCampaignLayout'

const Messages = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [currentSection, setCurrentSection] = useState('campaignsPanel')
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  const renderBody = () => {
    switch (currentSection) {
      case 'campaignsPanel':
        return (
          <CampaignsPanel
            onChangeSection={(section, campaign) => {
              setCurrentSection(section)
              setSelectedCampaign(campaign)
            }}
            currentPage={currentPage}
            onChangeCurrentPage={(value) => setCurrentPage(value)}
          />
        )
      case 'campaignDetailPanel':
        return (
          <CampaignDetailPanel
            onChangeSection={(value) => setCurrentSection(value)}
            selectedCampaign={selectedCampaign}
          />
        )
      default:
        return <CampaignsPanel />
    }
  }

  return (
    <div>
      {renderBody()}
    </div>
  )
}

export default Messages