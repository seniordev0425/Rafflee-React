import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function MyBillsItem(props){

    const {item} = props

    return(

        <div>
            <Row>
                <Col xs="12" sm={{size: 10, offset: 1}}>
                    <Row>
                        <Col sm="2" xs="3" lg="1" className="promotion-list-item-img">
                            <img src={images.profile_img}/>
                        </Col>
                        <Col sm="10" xs="9" lg="11">
                            <div className="promotion-list-item-title">
                                {item.promotion}
                                <span className="footer-link-bold float-right">Total:</span>
                            </div>
                            <div className="footer-link-bold mt-2">
                                Emission Date: {item.emission_date}
                                <span className="float-right">{item.price}</span>
                                
                            </div>
                            <div className="mt-4">
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="bootstrap-blue-btn promotion-list-item-btn"
                                >
                                DOWNLOAD PDF
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>   

    )
}

export default MyBillsItem;