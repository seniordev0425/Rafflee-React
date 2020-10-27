import React from 'react'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { useHistory } from "react-router-dom"
import moment from 'moment'

const OpeningJob = (props) => {
  const { t } = useTranslation()
  const { recruitment, loading } = props

  const history = useHistory()

  return (
    <div
      className="default-border py-2 py-md-4 px-2 px-md-5"
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <div className="color-gray font-size-11">
        {`${t('career_page.posted')} ${moment(recruitment.emission_date).format('YYYY-MM-DD')}`}
      </div>
      <div className="color-purple font-size-14 font-weight-bold mt-3">
        {recruitment.title}
      </div>
      <div className="d-block d-md-flex justify-content-between mt-3">
        {recruitment.tag.map((tag, index) => (
          <div key={index} className="color-gray font-size-11">
            {tag}
          </div>
        ))}
        <Button
          onClick={() =>
            history.push({
              pathname:
                `/careers/${recruitment.pk}`,
              state: { recruitment: recruitment }
            })
          }
          type="primary"
          className="ant-blue-btn"
          style={{ width: 160, height: 40, fontSize: '1rem', lineHeight: 1 }}
        >
          {t('button_group.see_more')}
        </Button>
      </div>
    </div>
  )
}

export default OpeningJob