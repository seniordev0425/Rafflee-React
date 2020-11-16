import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import * as _ from 'lodash'

import { openNotification } from '../../../../../../utils/notification'

import { APIROUTE } from '../../../../../../utils/constants'
import { useTranslation } from 'react-i18next'

const { Option } = Select

function YoutubeUserSelect(props) {
  const { t } = useTranslation()

  const { setAction } = props

  const [users, setUsers] = useState([])
  const [value, setValue] = useState([])
  const [fetching, setFetching] = useState(false)

  const fetchUser = value => {
    if (value === '') return
    setUsers([])
    setFetching(true)

    var myHeaders = new Headers()
    myHeaders.append("Authorization", "JWT " + localStorage.getItem('token'))
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch(`${APIROUTE}youtube/users/search/?search=${value}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setUsers(result.users)
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
    setUsers([])
    setValue(value)
    setFetching(false)
    
    var followData = {}
    if (_.isEmpty(value)) {
      followData = {
        follow_id: '',
        follow_url_img: '',
        follow_channel_title: ''
      }
    } else {
      followData = _.find(users, { channelId: value[0].value })
      followData = {
        follow_id: followData.channelId,
        follow_url_img: followData.profile_image_url.url,
        follow_channel_title: followData.channel_title
      }
    }
    setAction('youtube', 'follow_id', followData.follow_id)
    setAction('youtube', 'follow_url_img', followData.follow_url_img)
    setAction('youtube', 'follow_channel_title', followData.follow_channel_title)
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
      {users.map(user => (
        <Option key={user.channelId} value={user.channelId}>
          <img src={user.profile_image_url.url} width={25} height={25} className="rounded-circle" alt="" />
          <span className="ml-2 font-weight-bold">{user.channel_title}</span>
        </Option>
      ))}
    </Select>
  )
}

export default YoutubeUserSelect