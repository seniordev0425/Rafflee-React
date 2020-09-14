import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const EnterpriseHelmet = () => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title>
        {t('helmets.entreprise.title')}
      </title>
      <meta name={t('helmets.entreprise.meta1.name')} content={t('helmets.entreprise.meta1.content')} />
      <meta name={t('helmets.entreprise.meta2.name')} content={t('helmets.entreprise.meta2.content')} />
    </Helmet>
  )
}

export default EnterpriseHelmet