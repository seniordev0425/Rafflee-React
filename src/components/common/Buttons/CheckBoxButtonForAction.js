///////////////////////////////////////////// Unused component at the moment

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'

import { useTranslation } from 'react-i18next'

function CheckBoxButtonForAction(props) {
  const { t } = useTranslation()

  const {
    socialName,
    btnString,
    onParticipate,
    isVideoEnded,
    tryToOpenValidationModal,
    defaultValue,
    instagram_profile,
    instagram_publication
  } = props

  const validation = useSelector(state => state.userInfo[`${socialName}_${btnString}_validation`])
  const dispatch = useDispatch()

  const [checked, setChecked] = useState(defaultValue)

  useEffect(() => {
    if (isVideoEnded) if (socialName === 'video') setChecked(true)
  }, [isVideoEnded])

  useEffect(() => {
    if (validation) {
      dispatch({ type: 'INIT_STATE', state: `${socialName}_${btnString}_validation`, data: false })
      onParticipate(socialName, btnString, true, null)
      setChecked(true)
    }
  }, [validation])

  const onVideoChecked = () => {
    onParticipate(socialName, btnString, !checked, null)
  }

  const onActionChecked = () => {
    tryToOpenValidationModal(socialName, btnString)
    if (socialName === 'instagram' && btnString === 'follow') {
      if (instagram_profile) window.open(instagram_profile, '_blank')
    } else if (socialName === 'instagram' && btnString === 'like') {
      if (instagram_publication) window.open(instagram_publication, '_blank')
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