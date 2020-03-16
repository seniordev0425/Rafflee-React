import React, {useState, useEffect} from 'react'
import { connect } from "react-redux";
import {Button, Modal, ModalHeader, ModalBody} from 'reactstrap'
import LoginSignupBaseModal from '../../modals/LoginSignupBaseModal'

function JoinHeader(props){
    
    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    const showCompanyModal = () => setCompanyStatus(true)
    
    const toggle = () => {
        setModal(!modal)
        setCompanyStatus(false)
    }
    const switch_login_signin = (val) => {
        setIsLogin(val)
    }
    const [hide, setHide] = useState(false)
    
    useEffect(() => {
        setHide(window.innerWidth <= 850)
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
            {(!props.token && !hide) &&
            <>
                <div className="join-header">
                    Rafflee is  tool that everyone wants.  
                    <Button color="link" className="join-now-button" onClick={toggle}> Join now</Button>
                
                </div>
                
                <LoginSignupBaseModal modal={modal} isLogin={isLogin} switch_login_signin={switch_login_signin} toggle={toggle} companyStatus={companyStatus} showCompanyModal={showCompanyModal}/>
            </>
            }
           </>
    );
}
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
    }
}
export default connect(mapStateToProps)(JoinHeader);