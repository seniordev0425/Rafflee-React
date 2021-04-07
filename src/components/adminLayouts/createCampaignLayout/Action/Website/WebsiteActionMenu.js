import React from 'react'
import uuid from 'react-uuid'
import { useTranslation } from 'react-i18next'
import images from '../../../../../utils/images'

function WebsiteActionMenu(props) {
  const { t } = useTranslation()

  const { params, setParams } = props

  const addWebsiteAction = () => {
    let newAction = {
      id: uuid(),
      pk: '',
      entries: '',
      mandatory: false,
      url: ''
    }
    setParams('url_website', [...params.url_website, newAction])
  }

  return (
    <div className="action-list-container">
      <div className="action-list-item">
        <label>{t('create_campaign_page.create_website_action')}</label>
        <img
          src={images.ic_plus_gray}
          style={{ width: 15, height: 15, cursor: 'pointer' }}
          onClick={addWebsiteAction}
          alt="plus"
        />
      </div>
    </div>
  )
}

export default WebsiteActionMenu