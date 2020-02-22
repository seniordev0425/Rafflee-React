import React, {useState} from 'react'
import {Button} from 'antd'



function HeaderAfterLogin(){
    return(
        <>
            <Button type="link" className="no-border-btn" style={{marginRight:30}}>Deals</Button>
            <Button className="white-btn" style={{width: 140, marginRight:30}}>Account</Button>
            <Button type="primary" className="ant-blue-btn" style={{width: 140, marginRight:30}}>Dashboard</Button>
            <Button type="link" className="no-border-btn" style={{marginRight:30}}>Logout</Button>
            
        </>
    )
}

export default HeaderAfterLogin;