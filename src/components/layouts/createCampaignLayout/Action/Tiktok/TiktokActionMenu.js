import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function TiktokActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addTiktokFollowAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'follow',
      follow_entries: '',
      follow_mandatory: false,
      follow_url: ''
    }
    setParams('tiktok', [...params.tiktok, newAction])
  }

  const addTiktokLikeAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'like',
      like_entries: '',
      like_mandatory: false,
      like_url: ''
    }
    setParams('tiktok', [...params.tiktok, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_profile')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTiktokFollowAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_publication')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTiktokLikeAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default TiktokActionMenu