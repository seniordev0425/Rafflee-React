import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import { isMobile } from 'react-device-detect'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CheckBoxButtonForAction(props){
    const { t } = useTranslation()

    const { socialName, btnString, onParticipate, isVideoEnded, tryToOpenValidationModal } = props
    const[checked, setChecked] = useState(false)

    useEffect(() => {
        if (isVideoEnded) if (socialName === 'video') setChecked(!checked)
    }, [isVideoEnded])
    
    const onVideoChecked = () => {
        onParticipate(socialName, btnString, !checked, null)
        // if (socialName === 'video') {
            if (isVideoEnded) setChecked(!checked)
        // } else {
            // setChecked(!checked)
        // }
    }

    const onActionChecked = () => {
        if (checked) {
            onParticipate(socialName, btnString, !checked, null)
            setChecked(!checked)
        } else {
            tryToOpenValidationModal(socialName, btnString)
        }
    }

    return(
        <div className={checked ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
            <Checkbox 
                className="mr-2"
                onChange={socialName === 'video' ? onVideoChecked : onActionChecked}
                checked={checked}
            />
            {!isMobile
                ? 
                t(`create_campaign_page.${btnString}`)
                :
                <img src={images[`${btnString}_icon`]} width={15}/>
            }                
        </div>
    )
}

export default CheckBoxButtonForAction;