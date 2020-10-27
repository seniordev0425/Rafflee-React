import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import images from '../../../utils/images'

function Brands() {
  const { t } = useTranslation()

  return (
    <div style={{ paddingTop: 70, paddingBottom: 70 }}>
      <div className="color-purple text-center font-size-14">
        <span>
          {t('influencer_page.thousands_of_brands')}
        </span>
        <span className="font-weight-bold">
          {t('influencer_page.trust_us')}
        </span>
      </div>
    </div>
  )
}

export default Brands