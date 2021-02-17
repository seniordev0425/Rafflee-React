import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import { openNotification } from '../../../../../../utils/notification'
import images from '../../../../../../utils/images'
import { APIROUTE } from '../../../../../../utils/constants'

import { useTranslation } from 'react-i18next'

const { Option } = Select

function TwitterFollowScreenName(props) {
  const { t } = useTranslation()

  const { action, setAction } = props

  const [data, setData] = useState([])
  const [value, setValue] = useState([])
  const [fetching, setFetching] = useState(false)

  const fetchUser = value => {
    if (value === '') return
    setData([])
    setFetching(true)

    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'))

    var formdata = new FormData()
    formdata.append("search", value)

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch(`${APIROUTE}twitter/users/search/?search=${value}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          const data = result.search.map((user, index) => ({
            id: index,
            profile_image_url: user.profile_image_url,
            screen_name: user.screen_name,
            followers_count: user.followers_count,
            verified: user.verified
          }))
          setData(data)
        } else {
          openNotification('warning', t('create_campaign_page.connection_error'))
        }
        setFetching(false)
      })
      .catch(() => {
        setFetching(false)
      })
  }

  const handleChange = value => {
    setValue(value)
    setFetching(false)
    setAction('twitter', action.id, {
      ...action,
      follow_id: value.length > 0 ? data[value[0].value].id : '',
      follow_profile_image_url: value.length > 0 ? data[value[0].value].profile_image_url : '',
      follow_followers_count: value.length > 0 ? data[value[0].value].followers_count : 0,
      follow_screen_name: value.length > 0 ? data[value[0].value].screen_name : '',
      follow_verified: value.length > 0 ? data[value[0].value].verified : false
    })
    setData([])
  }

  return (
    <Select
      mode="multiple"
      labelInValue
      value={value}
      placeholder={t('create_campaign_page.select_user')}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={debounce(fetchUser, 800)}
      onChange={handleChange}
      style={{ width: '100%' }}
      open={value.length >= 1 ? false : true}
      size='large'
    >
      {data.map(d => (
        <Option key={d.id} value={d.id}>
          <img src={d.profile_image_url} width={25} height={25} className="rounded-circle" alt="" />
          <span className="ml-2 font-weight-bold">{d.screen_name}</span>
          {d.verified &&
            <img src={images.verified_icon} width={15} height={15} className="ml-2" alt="" />
          }
          <span className="ml-2">{`${d.followers_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} ${t('my_circle_page.followers')}`}</span>
        </Option>
      ))}
    </Select>
  )
}

export default TwitterFollowScreenName