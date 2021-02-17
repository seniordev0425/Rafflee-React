import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function FacebookActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addFacebookPostAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'post',
      post_entries: '',
      post_mandatory: false,
      post_like: false,
      post_comment: false,
      post_share: false,
      post_page_id: '',
      post_publication_id: '',
    }
    setParams('facebook', [...params.facebook, newAction])
  }

  const addFacebookUrlAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'url',
      url_entries: '',
      url_mandatory: false,
      url_url: '',
      url_like: false,
      url_share: false,
      url_comment: false,
    }
    setParams('facebook', [...params.facebook, newAction])
  }

  const addFacebookPageAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      type: 'page',
      page_entries: '',
      page_mandatory: false,
      page_page_id: '',
      page_page_name: '',
      page_follow: false,
      page_share: false,
      page_comment: false
    }
    setParams('facebook', [...params.facebook, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.post')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addFacebookPostAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.like_share_url')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addFacebookUrlAction}
          alt="plus"
        />
      </div>
      <div className="action-list-item">
        <label>{t('create_campaign_page.page')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addFacebookPageAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default FacebookActionMenu