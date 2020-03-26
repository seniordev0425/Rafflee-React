import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'

function Footer(){
    return(
        <div className="footer-link py-3">
            <Row>
                <Col xs={{size: 10, offset: 1}}>
                    <Row className="justify-content-center">
                        <span>
                            ©2020 Rafflee, all rights reserved.
                        </span>
                        <Link to="/privacy-policy" className="ml-2">
                            <span className="underline" style={{color: "#222A41"}}>Privacy Policy</span>
                            
                        </Link>
                        
                        <Link to="/general-conditions" className="ml-2">
                            <span className="underline" style={{color: "#222A41"}}>Terms & Conditions</span>
                        </Link>
                    </Row>
                    
                </Col>
            </Row>
        </div>   

    )
}

export default Footer;