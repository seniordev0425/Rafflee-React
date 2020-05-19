import React from 'react'
import images from '../../../../../utils/images'

function VideoActionButton(props) {
    return (
        <div
            {...props}
            className="poll-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1"
        >
            <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>v</div>
            <div>Video</div>
        </div>
    )
}

export default VideoActionButton