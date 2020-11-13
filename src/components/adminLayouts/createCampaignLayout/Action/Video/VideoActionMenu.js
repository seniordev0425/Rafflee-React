import React from 'react'
import { Checkbox } from 'antd'

import { useTranslation } from 'react-i18next'

function VideoActionMenu(props) {
  const { t } = useTranslation()

  const { params, setAction } = props

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.create_video_action')}</label>
        <Checkbox
          checked={params.url_video.video}
          onChange={(e) => setAction('url_video', 'video', e.target.checked)}
        />
      </div>
    </div>
  )
}

export default VideoActionMenu