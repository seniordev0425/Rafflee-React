import React from 'react'
import images from '../../../../../utils/images'

function VimeoActionButton(props) {
    return (
        <div {...props} className="vimeo-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.vimeo_action_icon} width={16} height={16} alt="" />
            <div>Vimeo</div>
        </div>
    )
}

export default VimeoActionButton