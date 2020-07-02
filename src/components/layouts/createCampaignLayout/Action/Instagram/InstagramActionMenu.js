import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function InstagramActionMenu(props) {
    const { t } = useTranslation()

    const { params, setAction } = props
    
    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>{t('create_campaign_page.instagram_profile')}</label>
                <Checkbox checked={params.instagram.profile} onChange={(e) => setAction('instagram', 'profile', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>{t('create_campaign_page.instagram_publication')}</label>
                <Checkbox checked={params.instagram.publication} onChange={(e) => setAction('instagram', 'publication', e.target.checked)}/>
            </div>
        </div>
    )
}

export default InstagramActionMenu