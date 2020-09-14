import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const CampaignHelmet = () => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {t('helmets.campaign.title')}
      </title>
      <meta name={t('helmets.campaign.meta1.name')} content={t('helmets.campaign.meta1.content')} />
      <meta name={t('helmets.campaign.meta2.name')} content={t('helmets.campaign.meta2.content')} />
    </Helmet>
  )
}

export default CampaignHelmet