import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button as AntdButton } from 'antd'
import { useHistory } from "react-router-dom"

import { imageToBase64 } from '../../../utils/others'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function BeingCreatedItem(props) {
  const { t } = useTranslation()

  const { item, onDeleteCampaign, beingDeletedPK } = props

  const history = useHistory()
  const DELETE_BEING_CREATED_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.DELETE_BEING_CREATED_CAMPAIGN)
  const dispatch = useDispatch()

  const [isLoading, setIsLoading] = useState(false)


  const goToCreateCampaignPage = async () => {
    setIsLoading(true)
    let promotionData = item
    if (promotionData.campaign_image) {
      let base64data = await imageToBase64(promotionData.campaign_image)
      promotionData = { ...promotionData, campaign_image: base64data }
    }

    // let winnings = []
    // for (let winning of promotionData.winnings) {
    //   if (winning.image) {
    //     let base64data = await imageToBase64(winning.image)
    //     let block = base64data.split(";")
    //     let realData = block[1].split(",")[1]
    //     winnings.push({ ...winning, image: realData })
    //   } else {
    //     winnings.push(winning)
    //   }
    // }
    // promotionData = { ...promotionData, winnings: winnings }

    setIsLoading(false)
    dispatch({ type: 'SET_BEING_CREATED_CAMPAIGN', data: promotionData })
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
                <div className="d-flex">
                  <AntdButton
                    type="primary"
                    className={"ant-blue-btn"}
                    style={{ width: 150, height: 40, padding: 0 }}
                    loading={isLoading}
                    onClick={goToCreateCampaignPage}
                  >
                    {!isLoading && t('button_group.update')}
                  </AntdButton>
                  <AntdButton
                    type="danger"
                    className="ant-red-btn ml-2"
                    style={{ width: 150, height: 30, padding: 0 }}
                    loading={DELETE_BEING_CREATED_CAMPAIGN_PROCESS && beingDeletedPK === item.pk}
                    onClick={() => onDeleteCampaign(item.pk)}
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