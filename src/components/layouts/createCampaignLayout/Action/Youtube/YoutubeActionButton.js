import React from 'react'
import images from '../../../../../utils/images'

function YoutubeActionButton(props) {
  return (
    <div {...props} className="youtube-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
      <img src={images.youtube_action_icon} width={30} alt="" />
      <div>Youtube</div>
    </div>
  )
}

export default YoutubeActionButton