import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

const LowerBanner = (props) => {
  const { t } = useTranslation()
  const { history } = props

  return (
    <div className="lower-banner lower-banner-text">
      <div className="color-blue font-weight-bold text-center">
        {t('lower_banner.title')}
      </div>
      <div className="color-gray font-size-11 text-center mt-2">
        {t('lower_banner.description1')}
      </div>
      <div className="color-gray font-size-11 text-center">
        {t('lower_banner.description2')}
      </div>
      <Link to="/about">
        <div className="mt-2 cursor-pointer">
          <span className="color-purple font-weight-bold font-size-14">
            {t('lower_banner.how_it_work')}
          </span>
          <img src={images.purple_right_arrow} className="ml-3" alt="" />
        </div>
      </Link>
    </div>
  )
}

export default withRouter(LowerBanner)