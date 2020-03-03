import React from 'react'
import images from '../../utils/images'

function Loading(){
    return <div className="loading-bar"><img src={images.loading_icon}/></div>
}

export default Loading;