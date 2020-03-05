import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import JoinHeader from '../components/layouts/HeaderLayout/JoinHeader'
import Header from '../components/layouts/HeaderLayout/Header'
import Banner from '../components/layouts/Banner'
import Carousel from '../components/layouts/hotPromotionLayout/Carousel'
import CurrentPromotionList from '../components/layouts/currentPromotionLayout/CurrentPromotionLIst'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import {getHotPromotions, getHighlightedPromotions, getNewPromotions, getBestOfferPromotions} from '../apis/apiCalls'


function Deals(props){
    const [hotPromotions, setHotPromotions] = useState([])
    const [highlightedPromotions, sethighlightedPromotions] = useState([])
    const [newPromotions, setNewPromotions] = useState([])
    const [bestOfferPromotions, setBestOfferPromotions] = useState([])

    useEffect(() => {
        document.title = "Deals"
        getHotPromotions()
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){       
                setHotPromotions(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));

        getHighlightedPromotions()
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){                
                sethighlightedPromotions(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));

        getNewPromotions()
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){
                setNewPromotions(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));

        getBestOfferPromotions()
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){
                setBestOfferPromotions(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));
    },[]);
    return (
        <div style={{fontFamily:"sofiapro"}}>
            <JoinHeader/>
            
            <Header/>
            
            <CurrentPromotionList
                highlightedPromotions={highlightedPromotions}
                newPromotions={newPromotions}
                hotPromotions={hotPromotions}
                bestOfferPromotions={bestOfferPromotions}/>
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
export default compose(withRouter, connect(mapStateToProps))(Deals);
