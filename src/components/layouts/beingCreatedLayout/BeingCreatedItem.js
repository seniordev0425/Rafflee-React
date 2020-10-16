import React from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button as AntdButton } from 'antd'
import { useHistory } from "react-router-dom";

import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function BeingCreatedItem(props) {
  const { t } = useTranslation()

  const { item } = props

  const history = useHistory()
  const dispatch = useDispatch()

  const goToCreateCampaignPage = () => {
    dispatch({ type: 'SET_BEING_CREATED_CAMPAIGN', data: item })
    history.push('/dashboard/create-campaign')
  }

  return (
    <div>
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
              <img src={item.campaign_image ? item.campaign_image : images.profile_img} alt="" />
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title d-flex justify-content-between align-items-center">
                {item.campaign_name}
              </div>
              <div className="promotion-list-item-text">{item.description}</div>

              <div className="mt-2 d-flex justify-content-end align-items-center">
                <AntdButton
                  type="primary"
                  className={"ant-blue-btn"}
                  style={{ width: 85, height: 30, padding: 0 }}
                  onClick={goToCreateCampaignPage}
                >
                  {t('button_group.update')}
                </AntdButton>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default BeingCreatedItem