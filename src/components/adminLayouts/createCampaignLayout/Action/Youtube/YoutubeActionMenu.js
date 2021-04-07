import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function YoutubeActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addYoutubeCommentAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'comment',
      comment_id: '',
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      comment_url_img: '',
      comment_video_title: '',
      comment_published_at: '',
      comment_channel_title: '',
    }
    setParams('youtube', [...params.youtube, newAction])
  }

  const addYoutubeLikeAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'like',
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      like_url_img: '',
      like_video_title: '',
      like_published_at: '',
      like_channel_title: '',
    }
    setParams('youtube', [...params.youtube, newAction])
  }

  const addYoutubeVideoAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'video',
      video_id: '',
      video_url_img: '',
      video_entries: '',
      video_published_at: '',
      video_mandatory: false
    }
    setParams('youtube', [...params.youtube, newAction])
  }

  const addYoutubeFollowAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'follow',
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false,
      follow_url_img: '',
      follow_channel_title: '',
    }
    setParams('youtube', [...params.youtube, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.like')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addYoutubeLikeAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addYoutubeFollowAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.comment')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addYoutubeCommentAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.video')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addYoutubeVideoAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default YoutubeActionMenu