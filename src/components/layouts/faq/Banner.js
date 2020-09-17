import React from 'react'
import { useTranslation } from 'react-i18next'

function Banner() {
  const { t } = useTranslation()

  return (
    <div className="faq-page-banner banner-text">
      <div className="shadow-text-blue font-weight-bold">
        {t('faq_page.faq')}
      </div>
      <div className="color-gray font-size-12 text-center mt-3" style={{ maxWidth: 600 }}>
        {t('faq_page.description1')}
      </div>
    </div>
  )
}

export default Banner