import React from 'react'
import images from '../../../../../utils/images'

function TypeFormActionButton(props) {
  return (
    <div {...props} className="typeform-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
      <img src={images.typeform_action_icon} width={12} height={18} alt="" />
      <div>TypeForm</div>
    </div>
  )
}

export default TypeFormActionButton