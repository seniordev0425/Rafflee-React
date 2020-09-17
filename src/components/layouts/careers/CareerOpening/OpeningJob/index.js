import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'

const OpeningJob = (props) => {
  const { t } = useTranslation()
  const { createdAt, title, categories } = props

  return (
    <div className="default-border py-2 py-md-4 px-2 px-md-5">
      <div className="color-gray font-size-11">
        {`${t('career_page.posted')} 2 days ago`}
      </div>
      <div className="color-purple font-size-14 font-weight-bold mt-3">
        {title}
      </div>
      <div className="d-block d-md-flex justify-content-between mt-3">
        <div className="color-gray font-size-11">
          Product - Remote | Client Services
        </div>
        <Link to="/careers/23487983274">
          <Button
            onClick={null}
            type="primary"
            className="ant-blue-btn"
            style={{ width: 160, height: 40, fontSize: '1rem', lineHeight: 1 }}
          >
            {t('button_group.see_more')}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default OpeningJob