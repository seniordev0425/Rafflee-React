import React from 'react'
import images from '../../../../../utils/images'

function PodcastActionButton(props) {
    return (
        <div {...props} className="podcast-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.podcast_action_icon} width={22} height={18} alt="" />
            <div>Subscribe to a Podcast</div>
        </div>
    )
}

export default PodcastActionButton