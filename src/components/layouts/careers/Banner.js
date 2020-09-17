import React from 'react'
import { useTranslation } from 'react-i18next'

function Banner() {
  const { t } = useTranslation()

  return (
    <div className="career-page-banner banner-text">
      <div className="shadow-text-blue font-weight-bold text-center">
        {t('career_page_banner.build_grow_together')}
      </div>
      <div className="color-gray font-size-12 text-center mt-3" style={{ maxWidth: 700 }}>
        {t('career_page_banner.description1')}
        <span className="font-weight-bold ml-3">
          {t('career_page_banner.description2')}
        </span>
      </div>
    </div>
  )
}

export default Banner