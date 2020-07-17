import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Checkbox } from 'antd'
import { isMobile } from 'react-device-detect'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function CheckBoxButtonWithString(props) {
  const { t } = useTranslation()

  const { btnString, handleActions, openModal, value, finishedName } = props
  const [checked, setChecked] = useState(value)

  const finished = useSelector(state => state.userInfo[finishedName])
  const dispatch = useDispatch()

  useEffect(() => {
    if (finished) {
      setChecked(!checked)
      handleActions()
      dispatch({ type: 'INIT_STATE', state: finishedName, data: false })
    }
  }, [finished])

  const onChangeChecked = () => {
    if (checked) {
      setChecked(!checked)
      handleActions()
    } else {
      openModal()
    }
  }

  return (
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
        <img src={images[`${btnString}_icon`]} width={15} alt="" />

      }
    </div>
  )
}

export default CheckBoxButtonWithString;