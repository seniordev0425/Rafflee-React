import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const AboutHelmet = () => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {t('helmets.about.title')}
      </title>
      <meta name={t('helmets.about.meta1.name')} content={t('helmets.about.meta1.content')} />
      <meta name={t('helmets.about.meta2.name')} content={t('helmets.about.meta2.content')} />
    </Helmet>
  )
}

export default AboutHelmet