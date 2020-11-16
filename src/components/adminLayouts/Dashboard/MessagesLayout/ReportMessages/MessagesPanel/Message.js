import React from 'react'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const Message = (props) => {
  const { t } = useTranslation()

  const {
    message,
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
          <div
            style={{ opacity: message.read ? 0.3 : 1 }}
            className="color-blue font-size-14 font-weight-bold"
          >
            {message.context}
          </div>
          <div
            style={{ opacity: message.read ? 0.3 : 1 }}
            className="color-gray font-size-12"
          >
            {message.description}
          </div>
          <div className="d-block d-md-flex justify-content-between mt-3">
            <Button
              onClick={() => onChangeSection('messageDetailPanel', message)}
              type="primary"
              className="ant-blue-btn"
              style={{ width: 160, height: 40, fontSize: '1rem', lineHeight: 1 }}
            >
              {t('button_group.open')}
            </Button>
            <div className="color-gray font-size-11">
              {`${t('admin_message_page.created')} ${moment(message.created).format('YYYY-MM-DD')}`}
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Message