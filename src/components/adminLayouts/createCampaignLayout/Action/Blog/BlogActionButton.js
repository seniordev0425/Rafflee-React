import React from 'react'
import images from '../../../../../utils/images'

function BlogActionButton(props) {
  return (
    <div {...props} className="blog-action-btn d-flex justify-content-between align-items-center mr-sm-4 mr-1 mb-sm-3 mb-1">
      <img src={images.blog_action_icon} width={16} height={16} alt="" />
      <div>Blog</div>
    </div>
  )
}

export default BlogActionButton