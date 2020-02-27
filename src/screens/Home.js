import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import JoinHeader from '../components/layouts/JoinHeader'
import Header from '../components/layouts/Header'
import Banner from '../components/layouts/Banner'
import Carousel from '../components/layouts/Carousel'
import CurrentPromotionList from '../components/layouts/CurrentPromotionLIst'
import FooterLink from '../components/layouts/footer/FooterLink'
import Footer from '../components/layouts/footer/Footer'
import {getHotPromotions, getHighlightedPromotions, getNewPromotions, getBestOfferPromotions} from '../apis/apiCalls'


function Home(props){
    const {history} = props
    const [hotPromotions, setHotPromotions] = useState([])
    const [highlightedPromotions, sethighlightedPromotions] = useState([])
    const [newPromotions, setNewPromotions] = useState([])
    const [bestOfferPromotions, setBestOfferPromotions] = useState([])

    useEffect(() => {
        document.title = "Home"
        console.log('you visited home page')
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
            <Banner/>
            <div className="hot-new-text">
                Hot new contest everyday.
            </div>
            <div className="premium-prize-text">
                Premium prizes & giveaways chosen by Rafflee.
            </div>
            {hotPromotions.length && <Carousel hotPromotions={hotPromotions}/>}
            <div className="find-deal-text">
                Find the deal you have been looking for.
            </div>
            <CurrentPromotionList
                highlightedPromotions={highlightedPromotions}
                newPromotions={newPromotions}
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
export default compose(withRouter, connect(mapStateToProps))(Home);
