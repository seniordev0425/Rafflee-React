import React, {useState} from 'react'
import {Button} from 'antd'
import LoginSignupBaseModal from '../modals/LoginSignupBaseModal'


function HeaderBeforeLogin(){

    const [modal, setModal] = useState(false)
    const [companyStatus, setCompanyStatus] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    
    const showCompanyModal = () => setCompanyStatus(true)
    
    const toggle = (val) => {
        setIsLogin(val)
        setModal(!modal)
        setCompanyStatus(false)
        console.log(isLogin)
        
    }
    const switch_login_signin = (val) => {
        setIsLogin(val)
    }
    return(
        <>
            <Button type="link" className="no-border-btn" style={{marginRight:30}}>Deals</Button>
            
            <Button className="white-btn" style={{width: 140, marginRight:30}} onClick={()=>toggle(false)}>Sign In</Button>
            <Button type="primary" className="ant-blue-btn" style={{width: 140, marginRight:30}} onClick={()=>toggle(true)}>Log In</Button>
            <LoginSignupBaseModal modal={modal} isLogin={isLogin ? true : false} switch_login_signin={switch_login_signin} toggle={toggle} companyStatus={companyStatus} showCompanyModal={showCompanyModal}/>
            
        </>
    )
}

export default HeaderBeforeLogin;