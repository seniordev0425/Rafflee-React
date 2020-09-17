import React from 'react'
import { useTranslation } from 'react-i18next'

function Banner() {
  const { t } = useTranslation()

  return (
    <div className="about-page-banner banner-text">
      <div className="shadow-text-blue font-weight-bold">
        {t('about_page_banner.platform_for')}
      </div>
      <div className="shadow-text-blue font-weight-bold">
        {t('about_page_banner.competition&giveaways')}
      </div>
      <div className="color-gray font-size-12 text-center mt-3" style={{ maxWidth: 600 }}>
        {t('about_page_banner.description1')}
        <span className="color-gray font-size-12 font-weight-bold ml-3">
          {t('about_page_banner.description2')}
        </span>
      </div>
    </div>
  )
}

export default Banner