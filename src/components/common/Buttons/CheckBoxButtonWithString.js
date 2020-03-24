import React, { useState } from 'react'
import { Checkbox } from 'antd'
import { isMobile } from 'react-device-detect'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CheckBoxButtonWithString(props){
    const { t } = useTranslation()

    const {btnString, handleActions, value} = props
    const[checked, setChecked] = useState(value)
    const onChangeChecked = () => {
        setChecked(!checked)
        handleActions()
    }

    return(
        <div className={checked ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
            <Checkbox 
                className="mr-2"
                onChange={onChangeChecked}
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

export default CheckBoxButtonWithString;