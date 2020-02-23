import React, { useEffect } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import JoinHeader from '../components/layouts/JoinHeader'
import Header from '../components/layouts/Header'
import Banner from '../components/layouts/Banner'
import Carousel from '../components/layouts/Carousel'
import CurrentPromotionList from '../components/layouts/CurrentPromotionLIst'
import FooterLink from '../components/layouts/Footer/FooterLink'
import Footer from '../components/layouts/Footer/Footer'


function Home(props){
    const {history} = props
    console.log('myInfo' + props.myInfo)
    useEffect(() => {
        document.title = "Home"
    });
    return (
        <div style={{fontFamily:"sofiapro"}}>
            {props.myInfo ? (<></>) : (<JoinHeader/>)}
            
            <Header/>
            <Banner/>
            <div className="hot-new-text">
                Hot new contest everyday.
            </div>
            <div className="premium-prize-text">
                Premium prizes & giveaways chosen by Rafflee.
            </div>
            <Carousel/>
            <div className="find-deal-text">
                Find the deal you have been looking for.
            </div>
            <CurrentPromotionList/>
            <FooterLink/>
            <Footer/>
            

        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token
    }
}
export default compose(withRouter, connect(mapStateToProps))(Home);
