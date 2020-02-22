import React, {useState} from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'
import CompanyModal from './CompanyModal'
import FaceBookSignBtn from '../common/Buttons/FaceBookSignBtn'
import GoogleSignBtn from '../common/Buttons/GoogleSignBtn'
import {Button, Container, Row, Col, Modal, ModalHeader, ModalBody} from 'reactstrap'

function LoginSignupBaseModal(props){

    const {isLogin, switch_login_signin,  modal, toggle, companyStatus, showCompanyModal} = props
    // const [status, setStatus] = useState(isLogin)
    
    
    // const switch_login_signin = (val) => setStatus(val)
    // console.log('status:' + status)
    return (
        <>
            <Modal isOpen={modal && !props.myInfo} toggle={toggle} style={{top: 165}}>
                    <ModalHeader toggle={toggle} style={{borderBottom: 'none'}}></ModalHeader>
                    <ModalBody className="modal-body-padding">
                        {companyStatus == true ? (<CompanyModal/>): (
                            <div style={{fontFamily:"sofiapro"}}>
                                <Row style={{margin: 0}}>
                                    <div className="modal-login-btn" style={isLogin ? {opacity: 1} : {opacity: 0.25}} onClick={()=>switch_login_signin(true)}>Log In</div>
                                    <div className="modal-signin-btn" style={isLogin ? {opacity: 0.25} : {opacity: 1}} onClick={()=>switch_login_signin(false)}>Sign In</div>
                                </Row>
                                
                                <div style={{marginTop: "2rem"}}>{isLogin ? (<LogInModal/>) : (<SignUpModal showCompanyModal={showCompanyModal}/>)}</div>
                                
                                <div className="or-divider-container">
                                    <h2><span className="or-divider-text">OR</span></h2>
                                </div>
                                <div style={{marginTop: "2rem"}}>
                                    <FaceBookSignBtn/>
                                </div>   
                                <div style={{marginTop: "1rem"}}>
                                    <GoogleSignBtn/>
                                </div>
                            </div>
                        )}
                        
                    </ModalBody>
            </Modal>
            
            
        </>
    );
}
LoginSignupBaseModal.propTypes = {
    isLogin: PropTypes.bool,
    modal: PropTypes.bool,
    toggle: PropTypes.func,
    companyStatus: PropTypes.bool,
    showCompanyModal: PropTypes.func
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo
    }
}

export default connect(mapStateToProps)(LoginSignupBaseModal);