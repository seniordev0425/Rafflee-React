import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function MyCampaignItem(props){

    const {item, goToLivePage, goToParticipatePage} = props
    return(
        <div>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">{item.campaign_name}
                                <span className={Date.parse(item.end_date) > Date.now() ? "green-dot" : "red-dot"}></span>
                            </div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            <div className="mt-2">
                                <Button
                                    size="lg"
                                    color="link"
                                    className="blue-link-btn"
                                    onClick = {() => goToLivePage(item.pk)}
                                >
                                    Live Page
                                </Button>
                            </div>
                            <div className="mt-2">
                                <span className="footer-link-bold pointer"  onClick={() => goToParticipatePage(item.pk)}>
                                    View Participants ({item.number_of_participants})
                                </span>
                            </div>
                            
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>   

    )
}

export default MyCampaignItem;