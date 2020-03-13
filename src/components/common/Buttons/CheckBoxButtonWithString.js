import React, { useState } from 'react'
import { Checkbox } from 'antd'

function CheckBoxButtonWithString(props){
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
            {btnString}
        </div>
    )
}

export default CheckBoxButtonWithString;