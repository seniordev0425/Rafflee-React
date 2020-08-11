import React from 'react'
import images from '../../../../../utils/images'

function TiktokActionButton(props) {
  return (
    <div {...props} className="tiktok-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
      <img src={images.tiktok_action_icon} width={16} height={16} alt="" />
      <div>Tiktok</div>
    </div>
  )
}

export default TiktokActionButton