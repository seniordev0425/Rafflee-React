import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import {Button, Menu} from 'antd'
import { Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import images from '../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';



function HeaderAfterLogin(props){
    const {dispatch} = props
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.removeItem('myInfo')
        dispatch({type: "setToken", data: null})
        dispatch({type: "setCompany", data: null})
    }

    const [hide, setHide] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);

    const dropDownToggle = () => setOpen(!dropdownOpen);

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
                    <Button type="link" className="no-border-btn" style={{marginRight:30}}>Deals</Button>
                </Col>
                <Col>
                    <Link to="/user-account"><Button className="white-btn" style={{width: 140}}>Account</Button></Link>
                </Col>
                <Col>
                    <Link to="/dashboard"><Button type="primary" className="ant-blue-btn" style={{width: 140}}>Dashboard</Button></Link>
                </Col>
                <Col onClick={logOut} className="pointer">
                    <Button type="link" className="no-border-btn">Logout</Button>
                    <img src={images.logout_icon} className="logout-icon"/>
                    
                </Col>
            </Row>   
        ) : (
            <ButtonDropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                <DropdownToggle caret>
                    Button Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>Deals</DropdownItem>
                    <DropdownItem><Link to="/user-account">Account</Link></DropdownItem>
                    <DropdownItem><Link to="/dashboard">Dashboard</Link></DropdownItem>
                    <DropdownItem onClick={logOut}><Link to="/user-account">Logout</Link></DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        )}
          
        </>
    )
}
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default connect(mapStateToProps)(HeaderAfterLogin);