import React from 'react'
import { useSelector } from "react-redux";
import PropTypes from 'prop-types'
import LogInModal from './LogInModal'
import SignUpModal from './SignUpModal'
import CompanyModal from './CompanyModal'
import FaceBookSignBtn from '../common/Buttons/FaceBookSignBtn'
import GoogleSignBtn from '../common/Buttons/GoogleSignBtn'
import { Row, Modal, ModalHeader, ModalBody} from 'reactstrap'

import { useTranslation } from 'react-i18next'

function LoginSignupBaseModal(props){
    const { t } = useTranslation()

    const {isLogin, switch_login_signin, modal, toggle, companyStatus, showCompanyModal} = props
    const token = useSelector(state=>state.userInfo.token)
 
    return (
        <>
            <Modal isOpen={modal && !token} toggle={toggle} style={{top: 165}}>
                    <ModalHeader toggle={toggle} style={{borderBottom: 'none'}}></ModalHeader>
                    <ModalBody className="modal-body-padding">
                        {companyStatus === true ? (<CompanyModal/>): (
                            <div style={{fontFamily:"sofiapro"}}>
                                <Row style={{margin: 0}}>
                                    <div className="modal-login-btn" style={isLogin ? {opacity: 1} : {opacity: 0.25}} onClick={()=>switch_login_signin(true)}>{t('header.log_in')}</div>
                                    <div className="modal-signin-btn" style={isLogin ? {opacity: 0.25} : {opacity: 1}} onClick={()=>switch_login_signin(false)}>{t('header.sign_in')}</div>
                                </Row>
                                
                                <div style={{marginTop: "2rem"}}>{isLogin ? (<LogInModal toggle={toggle}/>) : (<SignUpModal toggle={toggle} showCompanyModal={showCompanyModal}/>)}</div>
                                
                                <div className="or-divider-container">
                                    <h2><span className="or-divider-text">{t('signin_modal.or')}</span></h2>
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



export default LoginSignupBaseModal;