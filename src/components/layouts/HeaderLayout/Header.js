import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import images from '../../../utils/images'


import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin'

function Header(props){
    const [hideNav, setHideNav] = useState(false)
    
    useEffect(() => {
        setHideNav(window.innerWidth <= 850)
        window.addEventListener('resize', resize)
        return ()=>{
            window.removeEventListener('resize', resize)
        }
    },[])
    const resize = () => {
        setHideNav(window.innerWidth <=750)
    }
    return(
        <div className="header-container">
            <div style={{width: "100%", height: 40}}>
                <Link to="/"> <img src={images.logo} alt="logo"/> </Link>
                <div className="header-right-part">
                {hideNav 
                ? 
                (
                   props.token ? <HeaderAfterLogin/> : <HeaderBeforeLogin/>
                ) 
                : 
                (
                    props.token ? <HeaderAfterLogin/> : <HeaderBeforeLogin/> 
                )}
                
                </div>
            </div>
            
        </div>
    )
}
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token
    }
}
export default connect(mapStateToProps)(Header);