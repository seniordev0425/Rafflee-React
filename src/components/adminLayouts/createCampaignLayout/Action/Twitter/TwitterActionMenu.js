import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function TwitterActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addTwitterCommentAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'comment',
      comment_id: '',
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      comment_text: '',
      comment_like: '',
      comment_retweet: '',
      comment_created_at: '',
      comment_name: '',
      comment_verified: false,
      comment_profile_img: ''
    }
    setParams('twitter', [...params.twitter, newAction])
  }

  const addTwitterLikeAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'like',
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      like_text: '',
      like_like: '',
      like_retweet: '',
      like_created_at: '',
      like_name: '',
      like_verified: false,
      like_profile_img: '',
    }
    setParams('twitter', [...params.twitter, newAction])
  }

  const addTwitterTweetAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'tweet',
      tweet_model: '',
      tweet_entries: '',
      tweet_mandatory: false,
    }
    setParams('twitter', [...params.twitter, newAction])
  }

  const addTwitterRetweetAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'retweet',
      retweet_id: '',
      retweet_entries: '',
      retweet_mandatory: false,
      retweet_text: '',
      retweet_like: '',
      retweet_retweet: '',
      retweet_created_at: '',
      retweet_name: '',
      retweet_verified: false,
      retweet_profile_img: '',
    }
    setParams('twitter', [...params.twitter, newAction])
  }

  const addTwitterFollowAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'follow',
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false,
      follow_profile_image_url: '',
      follow_followers_count: '',
      follow_screen_name: '',
      follow_verified: false,
    }
    setParams('twitter', [...params.twitter, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.like')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitterLikeAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.follow')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitterFollowAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.comment')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitterCommentAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.tweet')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitterTweetAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.retweet')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addTwitterRetweetAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default TwitterActionMenu