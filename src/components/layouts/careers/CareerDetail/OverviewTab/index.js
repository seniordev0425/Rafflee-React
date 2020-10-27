import React from 'react'
import { useHistory } from "react-router-dom"
import { Button } from 'antd'

import { useTranslation } from 'react-i18next'

const OverviewTab = ({ recruitment, onSubmit }) => {
  const { t } = useTranslation()

  const history = useHistory()

  return (
    <div>
      <div className="color-blue font-size-14 font-weight-bold">
        {t('career_page.description')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        {recruitment.description}
      </div>

      <div className="color-blue font-size-14 font-weight-bold mt-5">
        {t('career_page.about_you')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        {recruitment.about_you}
      </div>


      <div className="color-blue font-size-14 font-weight-bold mt-5">
        {t('career_page.what_you_will_do')}
      </div>
      <div className="color-gray font-size-11 mt-4">
        {recruitment.goals}
      </div>

      <div className="d-block d-md-flex justify-content-between mt-5">
        <Button
          onClick={() => history.goBack()}
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
          onClick={onSubmit}
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