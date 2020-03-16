import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'
import { updateFavorite } from '../../../actions/userInfo'

function InventoryItem(props){
    const {item} = props
    const dispatch = useDispatch()

    const update = () => {
        var body = {
            promotion_id: item.pk
        }
        dispatch(updateFavorite(body, 'inventory'))
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
                            <div className="promotion-list-item-title">{item.campaign_name}</div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            <div style={{marginTop:"20px", height:"40px"}}>
                                <Button
                                    size="lg"
                                    color="#06CBC7"
                                    className="bootstrap-green-btn promotion-list-item-btn"
                                >
                                        ALREADY WON
                                </Button>
                                <div className="promotion-list-item-star" onClick={update}>
                                    <img src={item.favorite ? images.trans_star_favorite : images.trans_star}/>
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