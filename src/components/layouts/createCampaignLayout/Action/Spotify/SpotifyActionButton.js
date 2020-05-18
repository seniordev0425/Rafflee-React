import React from 'react'
import images from '../../../../../utils/images'

function SpotifyActionButton(props) {
    return (
        <div {...props} className="spotify-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
            <img src={images.spotify_action_icon} width={18} height={18} />
            <div>Spotify</div>
        </div>
    )
}

export default SpotifyActionButton