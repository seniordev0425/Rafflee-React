import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import {
  Button
} from 'antd'
import { useTranslation } from 'react-i18next'
import { readRecruitmentApply } from '../../../../../../actions/admin/recruitment'

import { printPreview } from '../../../../../../utils/pdf'

const RequestDetailPanel = ({ selectedRequest, onChangeSection }) => {
  const { t } = useTranslation()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(readRecruitmentApply({ pk: selectedRequest.pk }))
  }, [])

  const openPdf = () => {
    printPreview(selectedRequest.resume)
  }


  return (
    <Row className="px-4">
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="d-block d-lg-flex justify-content-between">
          <div>
            <div className="color-blue font-size-12 font-weight-bold mt-4">
              {t('admin_recruitment_page.name')}
            </div>
            <div className="color-gray font-size-12 mt-2">
              {selectedRequest?.firstname + ' ' + selectedRequest?.lastname}
            </div>
          </div>
          <div>
            <div className="color-blue font-size-12 font-weight-bold mt-4">
              {t('admin_recruitment_page.phone_number')}
            </div>
            <div className="color-gray font-size-12 mt-2">
              {selectedRequest?.prefix_number + ' ' + selectedRequest?.phone_number}
            </div>
          </div>
        </div>
        <div>
          <div className="color-blue font-size-12 font-weight-bold mt-4">
            {t('admin_recruitment_page.summary')}
          </div>
          <div className="color-gray font-size-12 mt-2">
            {selectedRequest?.summary}
          </div>
        </div>
        <div>
          <div className="color-blue font-size-12 font-weight-bold mt-4">
            {t('admin_recruitment_page.cover_letter')}
          </div>
          <div className="color-gray font-size-12 mt-2">
            {selectedRequest?.cover_letter}
          </div>
        </div>
        <div>
          <div className="color-blue font-size-12 font-weight-bold mt-4">
            {t('admin_recruitment_page.resume')}
          </div>
          <div className="color-gray font-size-12 mt-2">
            <span className="pointer" onClick={openPdf}>
              {t('admin_recruitment_page.view_resume')}
            </span>
          </div>
        </div>
        <div className="mt-4">
          <Button
            type="primary"
            className="ant-blue-btn my-5"
            style={{ width: 150 }}
            onClick={() => onChangeSection('requestsPanel')}
          >
            {t('button_group.back')}
          </Button>
        </div>

      </Col>
    </Row>
  )
}

export default RequestDetailPanel