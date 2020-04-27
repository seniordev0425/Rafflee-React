import React from 'react'
import { Select } from 'antd'
import { useTranslation } from 'react-i18next'
import images from '../../../utils/images'

function SelectLanguage() {

    const { Option } = Select
    const { i18n } = useTranslation()

    const handleLanguage = (value) => {
        i18n.changeLanguage(value)
    }
    return (
        <>
            <Select defaultValue={localStorage.getItem('i18nextLng')} size="large" style={{ width: 130 }} onChange={handleLanguage}>
                <Option value="en"><img src={images.flag_en} width="25" className="mr-2" /><span className="font-size-10">English</span></Option>
                <Option value="fr"><img src={images.flag_fr} width="25" className="mr-2" /><span className="font-size-10">France</span></Option>
            </Select>
        </>
    )
}

export default SelectLanguage