import React from 'react'
import { Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import { Button } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { updateFavorite } from '../../../actions/userInfo'

import { useTranslation } from 'react-i18next'

function MyFollowingItem(props){
    const { t } = useTranslation()

    const { item } = props
    const dispatch = useDispatch()

    const update = () => {
        var body = {
            promotion_id: item.id
        }
        dispatch(updateFavorite(body, 'following'))
    }

    return(

        <div>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">{item.promotion}
                                <span className={Date.parse(item.end_date) > Date.now() ? "green-dot" : "red-dot"}></span>
                            </div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            <div style={{marginTop:"20px", height:"40px"}}>
                                <Link to={"/campaign-detail/" + item.id}>
                                    <Button
                                        size="lg"
                                        color="primary"
                                        className="bootstrap-blue-btn promotion-list-item-btn"
                                    >
                                        {t('button_group.see_campaign')}
                                    </Button>
                                </Link>
                                <div className="promotion-list-item-star" onClick={update}>
                                    <img src={images.trans_star_favorite}/>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>   

    )
}

export default MyFollowingItem;