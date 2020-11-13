import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function FacebookActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.post')}</label>
        <Checkbox checked={params.facebook.post} onChange={(e) => setAction('facebook', 'post', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.like_share_url')}</label>
        <Checkbox checked={params.facebook.url} onChange={(e) => setAction('facebook', 'url', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.page')}</label>
        <Checkbox checked={params.facebook.page} onChange={(e) => setAction('facebook', 'page', e.target.checked)} />
      </div>
    </div>
  )
}

export default FacebookActionMenu