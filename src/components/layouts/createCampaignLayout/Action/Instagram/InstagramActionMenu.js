import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function InstagramActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addInstagramFollowAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'follow',
      follow_entries: '',
      follow_mandatory: false,
      follow_url: ''
    }
    setParams('instagram', [...params.instagram, newAction])
  }

  const addInstagramLikeAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'like',
      like_entries: '',
      like_mandatory: false,
      like_url: ''
    }
    setParams('instagram', [...params.instagram, newAction])
  }

  const addInstagramCommentAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'comment',
      comment_entries: '',
      comment_mandatory: false,
      comment_url: '',
      comment_id: '',
      comment_caption: '',
      comment_like_count: '',
      comment_created_at: '',
      comment_media_type: '',
      comment_permalink: ''
    }
    setParams('instagram', [...params.instagram, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_profile')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addInstagramFollowAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_publication')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addInstagramLikeAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.instagram_comment')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addInstagramCommentAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default InstagramActionMenu