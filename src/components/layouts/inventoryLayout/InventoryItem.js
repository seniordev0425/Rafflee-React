import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function InventoryItem(props){

    return(

        <div>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">Buy 1 get 1 Free on Valentines Krispy Kreme donuts</div>
                            <div className="promotion-list-item-text">Buy one free on Valentine's donuts on the 5th of Feb.</div>
                            <div style={{marginTop:"20px", height:"40px"}}>
                                <Button
                                    size="lg"
                                    color="#06CBC7"
                                    className="bootstrap-green-btn promotion-list-item-btn"
                                >
                                        ALREADY WON
                                </Button>
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

export default InventoryItem;