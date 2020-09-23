import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import { Button } from 'antd'
import { updateFavorite } from '../../../actions/homepage'

import { getTotalEntries } from '../../../utils/campaign'

import { useTranslation } from 'react-i18next'

function PromotionListItem(props) {
  const { t } = useTranslation()

  const { item, menuname } = props
  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)

  const dispatch = useDispatch()

  const update = () => {
    var body = {
      promotion_id: item.pk
    }
    // Update favorite status. Menuname can be 'hot', 'highlight', 'new', 'bestoffer' and 'all'
    dispatch(updateFavorite(body, menuname))
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
              <div className="d-flex justify-content-between align-items-center">
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
                {(token && !company) && (
                  <div className="promotion-list-item-star" onClick={update}>
                    <img src={item.favorite ? images.trans_star_favorite : images.trans_star} alt="" />
                  </div>
                )}
              </div>
              <div className="promotion-list-item-text">{item.description}</div>
              <div style={{ marginTop: "20px", height: "40px" }} className="d-flex justify-content-between align-items-center">
                <Link to={"/campaign-detail/" + item.pk}>
                  <Button
                    type="primary"
                    className="ant-blue-btn promotion-list-item-btn"
                  >
                    {t('button_group.see_campaign')}
                  </Button>
                </Link>
                {token && !company &&
                  <div className="color-gray font-size-10 ml-1">
                    {`${item.user_actions?.entries_user || 0}/${getTotalEntries(item)}  ${t('create_campaign_page.entries')}`}
                  </div>
                }
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default PromotionListItem