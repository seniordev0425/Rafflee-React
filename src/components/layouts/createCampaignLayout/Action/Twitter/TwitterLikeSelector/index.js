import React, { useState } from 'react'
import { Input } from 'antd'
import * as _ from 'lodash'

import { openNotification } from '../../../../../../utils/notification'

import errorMessages from '../../../../../../utils/messages/error'
import { APIROUTE } from '../../../../../../utils/constants'
import { useTranslation } from 'react-i18next'

const { Search } = Input

function TwitterLikeSelector(props) {
  const { t } = useTranslation()

  const { action, setAction } = props
  const [isFetching, setIsFetching] = useState(false)

  const fetchTweet = tweetId => {
    setIsFetching(true)
    var myHeaders = new Headers()
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'))
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch(`${APIROUTE}twitter/tweet/search/?search=${tweetId}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setAction('twitter', action.id, {
            ...action,
            like_id: tweetId,
            like_text: result?.text || '',
            like_like: result?.like,
            like_retweet: result?.retweet,
            like_created_at: result?.created_at || '',
            like_name: result?.name || '',
            like_verified: result?.verified,
            like_profile_img: result?.profile_img || '',
          })
        } else {
          openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')][result.msg])
        }
      })
      .finally(() => {
        setIsFetching(false)
      })
  }

  return (
    <Search
      style={{ width: '100%' }}
      size='large'
      placeholder={t('create_campaign_page.tweet_id')}
      loading={isFetching}
      onSearch={fetchTweet}
    />
  )
}

export default TwitterLikeSelector