import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import images from '../../../utils/images'

function Banner() {
  const { t } = useTranslation()

  return (
    <div className="influencer-page-banner banner-text">
      <div className="shadow-text-blue font-weight-bold">
        {t('brands_page.brands')}
      </div>
      <div className="color-gray font-size-12 text-center mt-3" style={{ maxWidth: 600 }}>
        {t('brands_page.banner_description')}
      </div>
      <Link to="/">
        <div className="mt-2 cursor-pointer">
          <span className="color-purple font-weight-bold font-size-13">
            {t('brands_page.start_now')}
          </span>
          <img src={images.purple_right_arrow} className="ml-3" alt="" />
        </div>
      </Link>
    </div>
  )
}

export default Banner