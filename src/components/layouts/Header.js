import React, { useState, useEffect } from 'react'
import {Row} from 'reactstrap'
import Sidebar from "react-sidebar";
import images from '../../utils/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import HeaderBeforeLogin from './HeaderBeforeLogin'
import HeaderAfterLogin from './HeaderAfterLogin'
import SidebarContent from './SidebarContent'
function Header(props){
    const [sidebarOpen, SetSidebarOpen] = useState(false)
    const [hideNav, setHideNav] = useState(false)
    const onSetSidebarOpen = (val) => {
        
        SetSidebarOpen(val)
    }
    
    useEffect(() => {
        setHideNav(window.innerWidth <= 750)
        window.addEventListener('resize', resize)
        console.log('really:' + hideNav)
    })
    const resize = () => {
        setHideNav(window.innerWidth <=750)
    }
    return(
        <div className="header-container">
            <div style={{width: "100%", height: 40}}>
                <img src={images.logo} />
                <div className="header-right-part">
                {hideNav ? (
                    <Sidebar
                        sidebar={<SidebarContent/>}
                        open={sidebarOpen}
                        onSetOpen={onSetSidebarOpen}
                        styles={{ sidebar: { background: "white", width: 200 } }}
                   
                    >
                        <span className="side-bar-menu" onClick={()=>SetSidebarOpen(true)}>
                            <FontAwesomeIcon icon={faBars} aria-hidden="true" size="lg"/>
                        </span>
                        
                
                    </Sidebar>
                ) : (
                    <HeaderBeforeLogin/>
                )}
                
                </div>
            </div>
            
        </div>
    )
}

export default Header;