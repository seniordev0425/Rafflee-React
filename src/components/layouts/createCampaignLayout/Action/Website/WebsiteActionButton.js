import React from 'react'
import images from '../../../../../utils/images'

function WebsiteActionButton(props) {
    return (
        <div {...props} className="website-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.website_action_icon} width={20} height={20} alt="" />
            <div>Website</div>
        </div>
    )
}

export default WebsiteActionButton