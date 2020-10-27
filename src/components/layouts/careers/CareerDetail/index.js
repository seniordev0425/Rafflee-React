import React, { useState } from 'react'
import ApplicationTab from './ApplicationTab'
import OverviewTab from './OverviewTab'

import { useTranslation } from 'react-i18next'

const CareerDetail = ({ recruitment }) => {
  const { t } = useTranslation()

  const [currentTab, setCurrentTab] = useState('overview')

  return (
    <div className="px-3">
      <div className="d-block d-md-flex justify-content-between">
        <div className="color-purple font-size-16 font-weight-bold">
          {recruitment.title}
        </div>
        <div className="d-flex">
          <div
            className={currentTab === 'overview' ? "career-tab-active" : "career-tab"}
            onClick={() => setCurrentTab('overview')}
          >
            {t('career_page.overview')}
          </div>
          <div
            className={currentTab === 'application' ? "career-tab-active ml-2" : "career-tab ml-2"}
            onClick={() => setCurrentTab('application')}
          >
            {t('career_page.application')}
          </div>
        </div>
      </div>
      <div className="mt-5">
        {currentTab === 'overview'
          ?
          <OverviewTab
            recruitment={recruitment}
            onSubmit={() => setCurrentTab('application')}
          />
          :
          <ApplicationTab />
        }
      </div>
    </div>
  )
}

export default CareerDetail