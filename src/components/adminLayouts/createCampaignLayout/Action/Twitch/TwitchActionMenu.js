import React from 'react'
import { useTranslation } from 'react-i18next'
import uuid from 'react-uuid'
import images from '../../../../../utils/images'

function TwitchActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addTwitchFollowAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'follow',
      follow_entries: '',
      follow_mandatory: false,
      follow_name: ''
    }
    setParams('twitch', [...params.twitch, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitchFollowAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default TwitchActionMenu