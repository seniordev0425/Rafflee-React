import React, {useState} from 'react'
import * as _ from 'lodash'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../../../utils/images'
import { Button } from 'antd'

import { imageToBase64 } from '../../../../../utils/others'

import { useTranslation } from 'react-i18next'

function CampaignItem(props) {
  const { t } = useTranslation()

  const {
    item,
    loading,
    onChangeSection
  } = props

  const [isLoading, setIsLoading] = useState(false)

  const goToCampaignPage = async () => {
    setIsLoading(true)
    let promotionData = item
    if (promotionData.campaign_image) {
      let base64data = await imageToBase64(promotionData.campaign_image)
      promotionData = { ...promotionData, campaign_image: base64data }
    }

    let winnings = []
    for (let winning of promotionData.winnings) {
      if (!_.isEmpty(winning.image)) {
        let images = []
        for (let image of winning.image) {
          let base64data = await imageToBase64(image)
          images.push(base64data)
        }
        winnings.push({ ...winning, image: images })
      } else {
        winnings.push(winning)
      }
    }
    promotionData = { ...promotionData, winnings: winnings }

    setIsLoading(false)

    onChangeSection('campaignDetailPanel', promotionData)
  }

  return (
    <div style={{ opacity: loading ? 0.5 : 1 }}>
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
              <img src={item.campaign_image ? item.campaign_image : images.profile_img} alt="" />
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title">
                <Link to={`/company/${item.company_id}/`}>
                  <img
                    src={item.company_logo ? item.company_logo : images.profile_img}
                    style={{ width: 40, height: 40, borderRadius: '50%' }}
                    className="mr-3"
                    alt=""
                  />
                </Link>
                <Link to={"/campaign-detail/" + item.pk}>
                  {item.campaign_name}
                </Link>
              </div>
              <div className="promotion-list-item-text">{item.description}</div>
              <div style={{ marginTop: "20px", height: "40px" }} className="d-flex justify-content-between align-items-center">
                <Button
                  type="primary"
                  className="ant-blue-btn promotion-list-item-btn"
                  loading={isLoading}
                  onClick={goToCampaignPage}
                >
                  {!isLoading && t('button_group.see_campaign')}
                </Button>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default CampaignItem