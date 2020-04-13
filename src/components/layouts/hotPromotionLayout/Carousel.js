import React from 'react'
import PropTypes from 'prop-types'
import AliceCarousel from '../../../utils/carousel_lib/react-alice-carousel'
import CampaignCard from './CampaignCard'

function Carousel(props) {
    const { hotPromotions } = props

    const responsive = {
        0: { items: 1 },
        600: { items: 2 },
        960: { items: 3 },
        1320: { items: 6 },
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
            company_logo={item.company_logo}
        />
    )

    if (hotPromotions.length < 1)
        return <></>
    return (
        <div className="app" style={{ maxWidth: galleryItems.length > 1 ? galleryItems.length * 450 : galleryItems.length * 480 }}>
            <AliceCarousel
                items={galleryItems}
                showSlideInfo={true}
                preventEventOnTouchMove={false}
                mouseTrackingEnabled={false}
                onSlideChanged={console.debug}
                responsive={responsive}
                stagePadding={stagePadding}
                dotsDisabled={true}
                infinite={true}
                autoPlay={false}
                autoPlayInterval={2000}
                duration={800}
            />
        </div>
    )
}

Carousel.propTypes = {
    hotPromotions: PropTypes.array.isRequired,
}
export default Carousel;