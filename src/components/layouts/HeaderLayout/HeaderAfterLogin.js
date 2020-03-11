import React, { useState, useEffect } from 'react'
import { connect, useDispatch } from "react-redux";
import { compose } from 'redux'
import { withRouter, Link } from 'react-router-dom'
import { Button, Menu } from 'antd'
import { Row, Col, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import images from '../../../utils/images'
import { logOut } from '../../../actions/userInfo'



function HeaderAfterLogin(props){
    
    const {history} = props
    const dispatch = useDispatch()

    const log_Out = () => {
        dispatch(logOut())
        history.push('/')
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
        setHide(window.innerWidth <=850)
    }
    return(
        <>
        {!hide ? (
            <Row>
                <Col>
                    <Link to="/deals"><Button type="link" className="no-border-btn" style={{marginRight:30}}>Deals</Button></Link>
                </Col>
                <Col>
                    <Link to="/user-account"><Button className="white-btn" style={{width: 140}}>Account</Button></Link>
                </Col>
                <Col>
                    <Link to={props.company ? "/dashboard/my-campaign" : "/dashboard/inventory"}>
                        <Button type="primary" className="ant-blue-btn" style={{width: 140}}>Dashboard
                        </Button>
                    </Link>
                </Col>
                <Col onClick={log_Out} className="pointer">
                    <Button type="link" className="no-border-btn">Logout</Button>
                    <img src={images.logout_icon} className="logout-icon"/>
                    
                </Col>
            </Row>   
        ) : (
            <ButtonDropdown isOpen={dropdownOpen} toggle={dropDownToggle}>
                <DropdownToggle caret>
                    
                </DropdownToggle>
                <DropdownMenu style={{left:-115}}>
                    <DropdownItem><Link to="/deals">Deals</Link></DropdownItem>
                    <DropdownItem><Link to="/user-account">Account</Link></DropdownItem>
                    <DropdownItem><Link to={props.company ? "/dashboard/my-campaign" : "/dashboard/inventory"}>Dashboard</Link></DropdownItem>
                    <DropdownItem onClick={log_Out}><Link to="/">Logout</Link></DropdownItem>
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
export default compose(withRouter, connect(mapStateToProps))(HeaderAfterLogin);