import React from 'react'
import { Checkbox } from 'antd'

import { useTranslation } from 'react-i18next'

function WebsiteActionMenu(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>{t('create_campaign_page.create_website_action')}</label>
                <Checkbox
                    checked={params.url_website.website}
                    onChange={(e) => setAction('url_website', 'website', e.target.checked)}
                />
            </div>
        </div>
    )
}

export default WebsiteActionMenu