import React from 'react'
import { Helmet } from 'react-helmet'
import { useTranslation } from 'react-i18next'

const HomeHelmet = () => {
  const { t } = useTranslation()

  return (
    <Helmet>
      <title lang="fr">
        Rafflee | Les meilleurs jeux-concours & giveaways
      </title>
      <title lang="en">
        Rafflee | Les meilleurs jeux-concours & giveaways
      </title>
      <meta name={t('helmets.home.meta1.name')} content={t('helmets.home.meta1.content')} />
      <meta name={t('helmets.home.meta2.name')} content={t('helmets.home.meta2.content')} />
    </Helmet>
  )
}

export default HomeHelmet