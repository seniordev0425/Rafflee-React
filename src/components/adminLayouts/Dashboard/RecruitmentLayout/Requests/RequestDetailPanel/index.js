import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import {
  Button
} from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

import Loading from '../../../../../../components/common/Loading'

const RequestDetailPanel = ({ selectedRequest, onChangeSection }) => {
  const { t } = useTranslation()

  return (
    <Row className="px-4">
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        
      </Col>
    </Row>
  )
}

export default RequestDetailPanel