import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function ParticipationHistoryItem(props){

    return(

        <div>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">Ultimate Edition (Digital Code)<span className="green-dot"></span></div>
                            <div className="promotion-list-item-text">Go deeper into Gears fiction with five Gears of War comic books, which can be unlocked.</div>
                            <div style={{marginTop:"20px", height:"40px"}}>
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="bootstrap-blue-btn promotion-list-item-btn"
                                >
                                        SEE CAMPAIGN
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

export default ParticipationHistoryItem;