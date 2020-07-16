import React from 'react'
import images from '../../../../../utils/images'

function TwitterActionButton(props) {
  return (
    <div {...props} className="twitter-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
      <img src={images.twitter_action_icon} width={18} height={16} alt="" />
      <div>Twitter</div>
    </div>
  )
}

export default TwitterActionButton