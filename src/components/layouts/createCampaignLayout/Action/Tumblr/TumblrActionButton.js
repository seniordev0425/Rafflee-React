import React from 'react'
import images from '../../../../../utils/images'

function TumblrActionButton(props) {
    return (
        <div {...props} className="tumblr-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.tumblr_action_icon} width={10} height={16} alt="" />
            <div>Tumblr</div>
        </div>
    )
}

export default TumblrActionButton