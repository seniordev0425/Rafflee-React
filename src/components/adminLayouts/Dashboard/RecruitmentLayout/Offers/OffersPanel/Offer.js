import React from 'react'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const Offer = (props) => {
  const { t } = useTranslation()

  const {
    recruitment,
    loading,
    onChangeSection
  } = props

  return (
    <div
      className="px-4"
      style={{ opacity: loading ? 0.5 : 1 }}
    >
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="color-purple font-size-14 font-weight-bold">
            {recruitment.title}
          </div>
          <div className="d-flex">
            {recruitment.tag.map((tag, index) => (
              <div key={index} className="color-gray font-size-11 mr-3">
                {`${tag} `}
              </div>
            ))}
          </div>
          <div className="d-block d-md-flex justify-content-between mt-3">
            <Button
              onClick={() => onChangeSection('offerDetail', recruitment)}
              type="primary"
              className="ant-blue-btn"
              style={{ width: 160, height: 40, fontSize: '1rem', lineHeight: 1 }}
            >
              {t('button_group.see_more')}
            </Button>
            <div className="color-gray font-size-11">
              {`${t('admin_recruitment_page.end_date')} ${moment(recruitment.end_date).format('YYYY-MM-DD')}`}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Offer