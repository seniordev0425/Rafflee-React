import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button as AntdButton } from 'antd'
import { useHistory } from "react-router-dom"
import * as _ from 'lodash'

import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function BeingCreatedItem(props) {
  const { t } = useTranslation()

  const {
    item,
    onDeleteCampaign,
    onPressUpdate,
    beingDeletedPK,
    beingUpdatedPK
  } = props

  const history = useHistory()
  const DELETE_BEING_CREATED_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.DELETE_BEING_CREATED_CAMPAIGN)
  const GET_CAMPAIGN_BEING_CREATED_IMAGES_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_BEING_CREATED_IMAGES)

  const beingCreatedCampaignImageData = useSelector(state => state.campaign.beingCreatedCampaignImageData)

  const dispatch = useDispatch()

  useEffect(() => {
    if (beingCreatedCampaignImageData) {
      let promotionData = item
      promotionData = {
        ...promotionData,
        campaign_image: beingCreatedCampaignImageData.beingCreatedCampaignImage,
        winnings: beingCreatedCampaignImageData.beingCreatedCampaignWinnings,
      }
      dispatch({ type: 'SET_BEING_CREATED_CAMPAIGN', data: promotionData })
      history.push('/dashboard/create-campaign')
    }
  }, [beingCreatedCampaignImageData])

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
                <div className="d-flex">
                  <AntdButton
                    type="primary"
                    className={"ant-blue-btn"}
                    style={{ width: 150, height: 40, padding: 0 }}
                    loading={GET_CAMPAIGN_BEING_CREATED_IMAGES_PROCESS && beingUpdatedPK === item.pk}
                    onClick={() => {
                      if (!DELETE_BEING_CREATED_CAMPAIGN_PROCESS) onPressUpdate(item.pk)
                    }}
                  >
                    {!(GET_CAMPAIGN_BEING_CREATED_IMAGES_PROCESS && beingUpdatedPK === item.pk) && t('button_group.update')}
                  </AntdButton>
                  <AntdButton
                    type="danger"
                    className="ant-red-btn ml-2"
                    style={{ width: 150, height: 30, padding: 0 }}
                    loading={DELETE_BEING_CREATED_CAMPAIGN_PROCESS && beingDeletedPK === item.pk}
                    onClick={() => {
                      if (!GET_CAMPAIGN_BEING_CREATED_IMAGES_PROCESS) onDeleteCampaign(item.pk)
                    }}
                  >
                    {(!DELETE_BEING_CREATED_CAMPAIGN_PROCESS || beingDeletedPK !== item.pk) && t('button_group.delete')}
                  </AntdButton>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default BeingCreatedItem