import React from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import images from '../../../utils/images'
import { updateFavorite } from '../../../actions/userInfo'
import { useTranslation } from 'react-i18next'

function MyFollowingItem(props) {
  const { t } = useTranslation()

  const { item } = props
  const dispatch = useDispatch()

  const update = () => {
    var body = {
      promotion_id: item.promotion_id
    }
    dispatch(updateFavorite(body, 'following'))
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
                <div>
                  <Link to={`/company/${item.company_id}/`}>
                    <img
                      src={item.company_image ? item.company_image : images.profile_img}
                      style={{ width: 40, height: 40, borderRadius: '50%' }}
                      className="mr-3"
                      alt=""
                    />
                  </Link>
                  <Link to={"/campaign-detail/" + item.promotion_id}>
                    {item.promotion}
                  </Link>
                </div>
                <Tooltip
                  title={Date.parse(item.end_date) > Date.now() ? `In progress. End date: ${moment(item.end_date).format('YYYY-MM-DD')}` : `Ended at ${moment(item.end_date).format('YYYY-MM-DD')}`}
                  placement="topRight"
                >
                  <span className={Date.parse(item.end_date) > Date.now() ? "green-dot pointer" : "red-dot pointer"}></span>
                </Tooltip>
              </div>
              <div className="promotion-list-item-text">{item.description}</div>
              <div style={{ marginTop: "20px", height: "40px" }} className="d-flex justify-content-between align-items-center">
                <Link to={"/campaign-detail/" + item.promotion_id}>
                  <Button
                    type="primary"
                    className="ant-blue-btn promotion-list-item-btn"
                  >
                    {t('button_group.see_campaign')}
                  </Button>
                </Link>
                <div className="promotion-list-item-star" onClick={update}>
                  <img src={images.trans_star_favorite} alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default MyFollowingItem