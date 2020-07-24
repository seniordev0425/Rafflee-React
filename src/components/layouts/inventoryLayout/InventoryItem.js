import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'

import { useTranslation } from 'react-i18next'

function InventoryItem(props) {
  const { t } = useTranslation()

  const { item } = props

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
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(InventoryItem)