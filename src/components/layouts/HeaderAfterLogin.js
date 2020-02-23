import React, {useState} from 'react'
import { connect } from "react-redux";
import {Button} from 'antd'
import { Row, Col } from 'reactstrap';
import images from '../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'



function HeaderAfterLogin(props){
    const {dispatch} = props
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('company')
        localStorage.removeItem('myInfo')
        dispatch({type: "setToken", data: null})
        dispatch({type: "setMyInfo", data: null})
    }
    return(
        <>
        <Row>
            <Col>
                <Button type="link" className="no-border-btn" style={{marginRight:30}}>Deals</Button>
            </Col>
            <Col>
                <Button className="white-btn" style={{width: 140}}>Account</Button>
            </Col>
            <Col>
                <Button type="primary" className="ant-blue-btn" style={{width: 140}}>Dashboard</Button>
            </Col>
            <Col onClick={logOut}>
                <Button type="link" className="no-border-btn">Logout</Button>
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon"/>
            </Col>
        </Row>     
        </>
    )
}
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo
    }
}
export default connect(mapStateToProps)(HeaderAfterLogin);