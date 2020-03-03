import React from 'react'
import {Row, Col} from 'reactstrap'
import { Link } from 'react-router-dom'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function PromotionListItem(props){

    const{item} = props
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
                            <Link to={"/campaign-detail/" + item.pk}>
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="bootstrap-blue-btn promotion-list-item-btn"
                                >
                                        SEE CAMPAIGN
                                </Button>
                            </Link>
                                <div className="promotion-list-item-star">
                                    <img src={images.trans_star}/>
                                </div>
                            </div>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>   

    )
}

export default PromotionListItem;