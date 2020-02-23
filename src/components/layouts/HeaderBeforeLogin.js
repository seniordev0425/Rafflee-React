import React, {useState} from 'react'
import {Button} from 'antd'
import {Row, Col} from 'reactstrap'
import LoginSignupBaseModal from '../modals/LoginSignupBaseModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


function HeaderBeforeLogin(){

    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    
    const showCompanyModal = () => setCompanyStatus(true)
    
    const toggle = (val) => {
        setIsLogin(val)
        setModal(!modal)
        setCompanyStatus(false)
    }
    const switch_login_signin = (val) => {
        setIsLogin(val)
    }
    return(
        <>
        <Row>
            <Col>
                <Button type="link" className="no-border-btn">Deals</Button>
            </Col>
            <Col>
                <Button className="white-btn" style={{width: 140}} onClick={()=>toggle(false)}>Sign In</Button>
            </Col>
            <Col>
                <Button type="primary" className="ant-blue-btn" style={{width: 140}} onClick={()=>toggle(true)}>Log In</Button>
            </Col>
            <Col>
                <FontAwesomeIcon icon={faQuestionCircle} style={{fontSize: "1.9rem",color: "#0091ff", cursor:"pointer"}}/>
            </Col>
        </Row>
            
           
            <LoginSignupBaseModal modal={modal} isLogin={isLogin ? true : false} switch_login_signin={switch_login_signin} toggle={toggle} companyStatus={companyStatus} showCompanyModal={showCompanyModal}/>
            
        </>
    )
}

export default HeaderBeforeLogin;