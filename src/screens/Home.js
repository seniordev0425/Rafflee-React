import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import JoinHeader from '../components/layouts/JoinHeader'
import Header from '../components/layouts/Header'

function Home(props){
    const {history} = props
    useEffect(() => {
        document.title = "Home"
    });
    return (
        <>
            <JoinHeader/>
            <Header/>
        </>
    );
}

export default withRouter(Home);
