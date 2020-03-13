import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import AliceCarousel from '../../../utils/carousel_lib/react-alice-carousel'
import CampaignCard from './CampaignCard'

function Carousel(props){
    const {hotPromotions} = props
    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        960 : { items: 3 },
        1320 : {items: 6},
    }
    const stagePadding = {
        paddingLeft: 50,
        paddingRight: 50,
    }

    const galleryItems = (hotPromotions || []).map((item) => 
        <CampaignCard 
            description={item.description}
            campaign_name={item.campaign_name}
            campaign_image={item.campaign_image}
            pk={item.pk}
        />)

    return(
        <div className="app" style={{maxWidth: galleryItems.length * 400}}>
            <AliceCarousel
                items={galleryItems}
                showSlideInfo={true}
                preventEventOnTouchMove={true}
                mouseTrackingEnabled={true}
                onSlideChanged={console.debug}
                responsive={responsive}
                
                stagePadding={stagePadding} 
                dotsDisabled={true}
                infinite={true}
            >
                
                
            </AliceCarousel>
            
        </div>
    )
}

Carousel.propTypes = {
    hotPromotions:PropTypes.array.isRequired,
  }
export default Carousel;