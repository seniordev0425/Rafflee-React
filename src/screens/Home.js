import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import Banner from '../components/layouts/Banner'
import Carousel from '../components/layouts/hotPromotionLayout/Carousel'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import { getHotPromotions, getHighlightedPromotions, getNewPromotions, getBestPromotions } from '../actions/homepage'
import Loading from '../components/common/Loading'


function Home(props){

    const hotPromotions = useSelector(state=>state.homepage.hotPromotions)
    const highlightedPromotions = useSelector(state=>state.homepage.highlightedPromotions)
    const newPromotions = useSelector(state=>state.homepage.newPromotions)
    const bestOfferPromotions = useSelector(state=>state.homepage.bestOfferPromotions)

    const isLoading_1 = useSelector(state=>state.userInfo.GET_HOT_PROMOTIONS_SUCCESS)
    const isLoading_2 = useSelector(state=>state.userInfo.GET_HIGHLIGHTED_PROMOTIONS_SUCCESS)
    const isLoading_3 = useSelector(state=>state.userInfo.GET_NEW_PROMOTIONS_SUCCESS)
    const isLoading_4 = useSelector(state=>state.userInfo.GET_BEST_PROMOTIONS_SUCCESS)

    const token = useSelector(state=>state.userInfo.token)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Home"

        dispatch(getHotPromotions({token: token}))
        dispatch(getHighlightedPromotions({token: token}))
        dispatch(getNewPromotions({token: token}))
        dispatch(getBestPromotions({token: token}))

    },[token]);

    // if (isLoading_1 || isLoading_2 || isLoading_3 || isLoading_4)
    //     return <Loading/>

    return (
        <div style={{fontFamily:"sofiapro"}}>
            <JoinHeader/>
            <Header/>
            <Banner/>
            <div className="hot-new-text">
                Hot new contest everyday.
            </div>
            <div className="premium-prize-text">
                Premium prizes & giveaways chosen by Rafflee.
            </div>
            {hotPromotions.length && <Carousel hotPromotions={hotPromotions}/>}
            <div className="find-deal-text">
                Find the campaign you have been looking for.
            </div>
            <CurrentPromotionList
                />
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
