import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import {Row, Col} from 'reactstrap'
import {Menu} from 'antd'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import UserAccountForm from '../components/layouts/account/UserAccountForm'
import images from '../utils/images'
import CompanyAccountForm from '../components/layouts/account/CompanyAccountForm'


function UserAccount(props){
    const {history} = props
    useEffect(() => {
        document.title = "UserAccount"
    },[]);
    return (
        <div style={{fontFamily:"sofiapro"}}>
            <JoinHeader/>
            <Header/>
            <div className="menubar-container">
                <Row>
                    <Col xs={{size: 10, offset: 1}}>
                        <Menu mode="horizontal" className="menubar" selectedKeys={['profile']}>
                            <Menu.Item key="profile">
                                <img src={props.company ? images.company_icon : images.user_icon}/>
                                <span className="ml-3"> {props.company ? "Company Profile" : "Profile"}</span>
                            </Menu.Item>
                            
                        </Menu>
                    </Col>
                </Row>
            </div>
            <div>
                <Row className="mb-5">
                    <Col xs={{size: 10, offset: 1}}>
                        {props.company ? (<CompanyAccountForm/>) : (<UserAccountForm/>)}
                    </Col>
                </Row>
            </div>
            <FooterLink/>
            <Footer/>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company
    }
}
export default compose(withRouter, connect(mapStateToProps))(UserAccount);
