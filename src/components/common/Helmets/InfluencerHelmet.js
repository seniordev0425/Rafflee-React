import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const InfluencerHelmet = () => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {t('helmets.influencer.title')}
      </title>
      <meta name={t('helmets.influencer.meta1.name')} content={t('helmets.influencer.meta1.content')} />
      <meta name={t('helmets.influencer.meta2.name')} content={t('helmets.influencer.meta2.content')} />
    </Helmet>
  )
}

export default InfluencerHelmet