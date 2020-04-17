import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'
import { updateFavorite } from '../../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function InventoryItem(props) {
    const { t } = useTranslation()

    const { item } = props
    const dispatch = useDispatch()

    const update = () => {
        var body = {
            promotion_id: item.pk
        }
        dispatch(updateFavorite(body, 'inventory'))
    }

    return (
        <div>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={item.campaign_image ? item.campaign_image : images.profile_img} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">
                                <Link to={`/company/${item.company_id}/`}>
                                    <img
                                        src={item.company_logo ? item.company_logo : images.profile_img}
                                        style={{ width: 40, height: 40, borderRadius: '50%', boxShadow: ' 0px 5px 5px #bec2c5d9' }}
                                        className="mr-3"
                                    />
                                </Link>
                                {item.campaign_name}
                            </div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            <div style={{ marginTop: "20px", height: "40px" }}>
                                <Button
                                    size="lg"
                                    color="#06CBC7"
                                    className="bootstrap-green-btn promotion-list-item-btn"
                                >
                                    {t('button_group.already_won')}
                                </Button>
                                <div className="promotion-list-item-star" onClick={update}>
                                    <img src={item.favorite ? images.trans_star_favorite : images.trans_star} />
                                </div>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default InventoryItem;