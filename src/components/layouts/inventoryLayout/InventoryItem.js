import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'

import { useTranslation } from 'react-i18next'

function InventoryItem(props) {
  const { t } = useTranslation()

  const { item, goToWinningDetail } = props

  return (
    <div>
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
              <img src={item.campaign_image ? item.campaign_image : images.profile_img} alt="" />
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title">
                {item.campaign_name}
              </div>
              <div className="promotion-list-item-text">{item.campaign_description}</div>
              <div style={{ marginTop: "20px", height: "40px" }} className="d-flex justify-content-between align-items-center">
                <Link to={"/campaign-detail/" + item.promotion_id}>
                  <Button
                    type="primary"
                    className="ant-blue-btn promotion-list-item-btn"
                  >
                    {t('button_group.see_campaign')}
                  </Button>
                </Link>
                <div>
                  <img
                    src={images.prize_icon}
                    width={40}
                    height={30}
                    onClick={() => goToWinningDetail(item.promotion_id, item.giveaway_name)}
                    className="pointer"
                    title={item.giveaway_name}
                    alt=""
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(InventoryItem)