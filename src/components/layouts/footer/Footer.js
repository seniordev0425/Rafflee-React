import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function Footer(){

    return(

        <div className="footer-link" style={{marginTop: "15px"}}>
            <Row>
                <Col xs={{size: 10, offset: 1}}>
                    <Row>
                        <Col xs="12" sm="6">
                            English
                        </Col>
                        <Col xs ="12" sm="6" style={{textAlign:"right"}}>
                            <span>
                                ©2020 Rafflee, all rights reserved.
                            </span>
                            <span>
                                Privacy Policy
                            </span>
                            <span>
                                Terms & Conditions
                            </span>
                        </Col>
                    </Row>
                    
                </Col>
            </Row>
        </div>   

    )
}

export default Footer;