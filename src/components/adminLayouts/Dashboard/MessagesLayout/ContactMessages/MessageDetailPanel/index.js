import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import { readHomepageMessage } from '../../../../../../actions/admin/message'

const MessageDetailPanel = ({ onChangeSection, selectedMessage }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readHomepageMessage({ pk: selectedMessage.pk }))
  }, [])

  return (
    <Row className="px-4">
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="d-block d-lg-flex justify-content-between">
          <div>
            <div className="color-blue font-size-12 font-weight-bold mt-4">
              {t('admin_message_page.email')}
            </div>
            <div className="color-gray font-size-12 mt-2">
              {selectedMessage?.email}
            </div>
          </div>
          <div>
            <div className="color-blue font-size-12 font-weight-bold mt-4">
              {t('admin_message_page.phone_number')}
            </div>
            <div className="color-gray font-size-12 mt-2">
              {selectedMessage?.phone_number}
            </div>
          </div>
        </div>
        <div>
          <div className="color-blue font-size-12 font-weight-bold mt-4">
            {t('admin_message_page.message')}
          </div>
          <div className="color-gray font-size-12 mt-2">
            {selectedMessage?.message}
          </div>
        </div>
        <div>
          <div className="color-blue font-size-12 font-weight-bold mt-4">
            {t('admin_message_page.created')}
          </div>
          <div className="color-gray font-size-12 mt-2">
            {moment(selectedMessage?.created).format('YYYY-MM-DD')}
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="primary"
            className="ant-blue-btn my-5"
            style={{ width: 150 }}
            onClick={() => onChangeSection('messagesPanel')}
          >
            {t('button_group.back')}
          </Button>
        </div>

      </Col>
    </Row>
  )
}

export default MessageDetailPanel