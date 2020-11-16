import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function YoutubeActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.like')}</label>
        <Checkbox checked={params.youtube.like} onChange={(e) => setAction('youtube', 'like', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <Checkbox checked={params.youtube.follow} onChange={(e) => setAction('youtube', 'follow', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.comment')}</label>
        <Checkbox checked={params.youtube.comment} onChange={(e) => setAction('youtube', 'comment', e.target.checked)} />
      </div>
    </div>
  )
}

export default YoutubeActionMenu