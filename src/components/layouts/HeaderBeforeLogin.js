import React, {useState, useEffect} from 'react'
import {Button, Menu} from 'antd'
import {Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'
import LoginSignupBaseModal from '../modals/LoginSignupBaseModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'


function HeaderBeforeLogin(){

    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);

    const dropDownToggle = () => setOpen(!dropdownOpen);
    
    const showCompanyModal = () => setCompanyStatus(true)
    
    const toggle = (val) => {
        setIsLogin(val)
        setModal(!modal)
        setCompanyStatus(false)
    }
    const switch_login_signin = (val) => {
        setIsLogin(val)
    }
    
    const [hide, setHide] = useState(false)
    useEffect(() => {
        
        setHide(window.innerWidth <= 750)
        window.addEventListener('resize', resize)
        
        return ()=>{
            window.removeEventListener('resize', resize)
        }
           
    },[])
    const resize = () => {
        setHide(window.innerWidth <=750)
    }
    return(
        <>
        {!hide ? (
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
        ) : (
            <ButtonDropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                <DropdownToggle caret>
                    Button Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Deals</DropdownItem>
                    <DropdownItem onClick={()=>toggle(false)}>Sign In</DropdownItem>
                    <DropdownItem onClick={()=>toggle(false)}>Log In</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )}
            <LoginSignupBaseModal modal={modal} isLogin={isLogin ? true : false} switch_login_signin={switch_login_signin} toggle={toggle} companyStatus={companyStatus} showCompanyModal={showCompanyModal}/>
            
        </>
    )
}

export default HeaderBeforeLogin;