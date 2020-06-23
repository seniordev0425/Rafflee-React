import React from 'react'
import images from '../../../../../utils/images'

function SoundCloudActionButton(props) {
    return (
        <div {...props} className="soundcloud-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.soundcloud_action_icon} width={25} height={18} alt="" />
            <div>SoundCloud</div>
        </div>
    )
}

export default SoundCloudActionButton