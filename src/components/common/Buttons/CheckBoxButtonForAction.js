import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'
import { isMobile } from 'react-device-detect'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CheckBoxButtonForAction(props) {
    const { t } = useTranslation()

    const { socialName, btnString, onParticipate, isVideoEnded, tryToOpenValidationModal } = props

    const validation = useSelector(state => state.userInfo[`${socialName}_${btnString}_validation`])
    const dispatch = useDispatch()

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (isVideoEnded) if (socialName === 'video') setChecked(!checked)
    }, [isVideoEnded])

    useEffect(() => {
        if (validation) {
            dispatch({ type: 'INIT_STATE', state: `${socialName}_${btnString}_validation`, data: false })
            onParticipate(socialName, btnString, !checked, null)
            setChecked(!checked)
        }
    }, [validation])

    const onVideoChecked = () => {
        onParticipate(socialName, btnString, !checked, null)
        if (isVideoEnded) setChecked(!checked)
    }

    const onActionChecked = () => {
        if (checked) {
            onParticipate(socialName, btnString, !checked, null)
            setChecked(!checked)
        } else {
            tryToOpenValidationModal(socialName, btnString)
        }
    }

    return (
        <div className={checked ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
            <Checkbox
                className="mr-2"
                onChange={socialName === 'video' ? onVideoChecked : onActionChecked}
                checked={checked}
            />
            {t(`create_campaign_page.${btnString}`)}
        </div>
    )
}

export default CheckBoxButtonForAction;