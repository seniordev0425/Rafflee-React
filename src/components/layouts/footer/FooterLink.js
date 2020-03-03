import React from 'react'
import {Row, Col} from 'reactstrap'
import images from '../../../utils/images'
import {Button} from 'reactstrap'

function FooterLink(){

    return(

        <div className="footer-link-container">
            <Row>
                <Col xs={{size: 10, offset: 1}}>
                    <Row>
                        <Col>
                            <div className="footer-link-bold">
                                Quick Links
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>

                        </Col>
                        <Col>
                            <div className="footer-link-bold">
                                Products
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>

                        </Col>
                        <Col>
                            <div className="footer-link-bold">
                                Resources
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>

                        </Col>
                        <Col>
                            <div className="footer-link-bold">
                                Contact Us
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                youremail@mail.com
                            </div>
                            <div className="footer-link-bold" style={{marginTop:"20px"}}>
                                Follow Us
                            </div>
                            <div className="footer-link" style={{marginTop:"20px"}}>
                                Lorem Ipsum
                            </div>

                        </Col>

                    </Row>
                </Col>
            </Row>
        </div>   

    )
}

export default FooterLink;