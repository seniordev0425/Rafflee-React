import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CampaignCard(props) {
    const { t } = useTranslation()

    const { description, campaign_name, pk, campaign_image, company_logo } = props
    return (
        <div className="item campaign-card-body">
            <div>
                <div className="campaign-card-img">
                    <img src={campaign_image ? campaign_image : images.profile_img} className="campaign-img" />
                    <div className="company-logo-container">
                        <img src={company_logo ? company_logo : images.profile_img} className="company-logo" />
                    </div>
                </div>
                <div className="mt-4 campaign-card-title">{campaign_name}</div>
                <div className="mt-4 campaign-card-text">{description}</div>
            </div>

            <div>
                <Link to={"/campaign-detail/" + pk}>
                    <Button size="lg" color="primary" className="bootstrap-blue-btn">
                        {t('button_group.see_campaign')}
                    </Button>
                </Link>
            </div>
            <div className="campaign-card-star" >
                <img src={images.star} />
            </div>
        </div>
    )
}

export default CampaignCard;