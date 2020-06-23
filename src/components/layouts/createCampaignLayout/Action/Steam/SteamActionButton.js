import React from 'react'
import images from '../../../../../utils/images'

function SteamActionButton(props) {
    return (
        <div {...props} className="steam-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.steam_action_icon} width={18} height={18} alt="" />
            <div>Steam</div>
        </div>
    )
}

export default SteamActionButton