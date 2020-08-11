import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function TiktokActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_profile')}</label>
        <Checkbox checked={params.tiktok.profile} onChange={(e) => setAction('tiktok', 'profile', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_publication')}</label>
        <Checkbox checked={params.tiktok.publication} onChange={(e) => setAction('tiktok', 'publication', e.target.checked)} />
      </div>
    </div>
  )
}

export default TiktokActionMenu