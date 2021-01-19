import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function TwitterActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.like')}</label>
        <Checkbox checked={params.twitter.like} onChange={(e) => setAction('twitter', 'like', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <Checkbox checked={params.twitter.follow} onChange={(e) => setAction('twitter', 'follow', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.comment')}</label>
        <Checkbox checked={params.twitter.comment} onChange={(e) => setAction('twitter', 'comment', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.tweet')}</label>
        <Checkbox checked={params.twitter.tweet} onChange={(e) => setAction('twitter', 'tweet', e.target.checked)} />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.retweet')}</label>
        <Checkbox checked={params.twitter.retweet} onChange={(e) => setAction('twitter', 'retweet', e.target.checked)} />
      </div>
    </div>
  )
}

export default TwitterActionMenu