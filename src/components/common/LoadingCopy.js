import React from 'react'
import images from '../../utils/images'

function LoadingCopy(){
    return <div className="loading-bar"><img src={images.loading_icon} alt=""/></div>
}

export default LoadingCopy;