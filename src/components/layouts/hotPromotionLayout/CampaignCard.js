import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CampaignCard(props) {
  const { t } = useTranslation()

  const { 
    description, 
    campaign_name, 
    pk, 
    campaign_image, 
    company_logo, 
    company_id 
  } = props

  return (
    <div className="item campaign-card-body">
      <div>
        <div className="campaign-card-img">
          <img src={campaign_image ? campaign_image : images.profile_img} className="campaign-img" alt="" />
          <div className="company-logo-container">
            <Link to={`/company/${company_id}/`}>
              <img src={company_logo ? company_logo : images.profile_img} className="company-logo" alt="" />
            </Link>
          </div>
        </div>
        <div className="mt-4 campaign-card-title">{campaign_name}</div>
        <div className="mt-4 campaign-card-text">{description}</div>
      </div>
      <div>
        <Link to={"/campaign-detail/" + pk}>
          <Button type="primary" className="ant-blue-btn">
            {t('button_group.see_campaign')}
          </Button>
        </Link>
      </div>
      <div className="campaign-card-star" >
        <img src={images.star} alt="" />
      </div>
    </div>
  )
}

export default CampaignCard