import React from 'react'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function FacebookActionMenu(props) {
    const { t } = useTranslation()

    const { params, setAction } = props
    
    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>{t('create_campaign_page.like')}</label>
                <Checkbox checked={params.facebook.like} onChange={(e) => setAction('facebook', 'like', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>{t('create_campaign_page.follow')}</label>
                <Checkbox checked={params.facebook.follow} onChange={(e) => setAction('facebook', 'follow', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>{t('create_campaign_page.comment')}</label>
                <Checkbox checked={params.facebook.comment} onChange={(e) => setAction('facebook', 'comment', e.target.checked)}/>
            </div>
            <div className="action-list-item">
                <label>{t('create_campaign_page.post')}</label>
                <Checkbox checked={params.facebook.post} onChange={(e) => setAction('facebook', 'post', e.target.checked)}/>
            </div>
        </div>
    )
}

export default FacebookActionMenu