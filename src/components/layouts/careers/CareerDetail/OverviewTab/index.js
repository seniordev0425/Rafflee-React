import React from 'react'
import { Button } from 'antd'

import { useTranslation } from 'react-i18next'

const OverviewTab = () => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="color-blue font-size-14 font-weight-bold">
        {t('career_page.description')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        We’re looking for a blockchain Business Development Associate who will help OneLedger bring innovative blockchain product and services offerings to firms across the globe
      </div>

      <div className="color-blue font-size-14 font-weight-bold mt-5">
        {t('career_page.about_you')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        You want to have high impact, drive innovation, and have a meaningful contribution to both our work environment and our client’s business too. You thrive in collaborative environments and are able to quickly switch gears between research, client work, and supporting your colleagues under minimal supervision.
      </div>


      <div className="color-blue font-size-14 font-weight-bold mt-5">
        {t('career_page.what_you_will_do')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        You want to have high impact, drive innovation, and have a meaningful contribution to both our work environment and our client’s business too. You thrive in collaborative environments and are able to quickly switch gears between research, client work, and supporting your colleagues under minimal supervision.
      </div>

      <div className="d-block d-md-flex justify-content-between mt-5">
        <Button
          onClick={null}
          style={{
            width: 500,
            maxWidth: '90%',
            height: 40,
            fontSize: '1rem',
            lineHeight: 1,
            color: '#0091ff',
            borderColor: '#0091ff',
            borderRadius: 6
          }}
        >
          {t('button_group.back_to_job_opening')}
        </Button>
        <Button
          onClick={null}
          type="primary"
          className="ant-blue-btn mt-3 mt-md-0"
          style={{ width: 500, maxWidth: '90%', height: 40, fontSize: '1rem', lineHeight: 1 }}
        >
          {t('button_group.submit')}
        </Button>
      </div>
    </div>
  )
}

export default OverviewTab