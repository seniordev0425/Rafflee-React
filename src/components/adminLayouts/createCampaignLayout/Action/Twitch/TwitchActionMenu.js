import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function TwitchActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <Checkbox checked={params.twitch.follow} onChange={(e) => setAction('twitch', 'follow', e.target.checked)} />
      </div>
    </div>
  )
}

export default TwitchActionMenu