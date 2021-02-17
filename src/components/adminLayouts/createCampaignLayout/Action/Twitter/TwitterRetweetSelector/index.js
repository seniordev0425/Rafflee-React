import React, { useState } from 'react'
import { Input } from 'antd'
import * as _ from 'lodash'

import { openNotification } from '../../../../../../utils/notification'

import errorMessages from '../../../../../../utils/messages/error'
import { APIROUTE } from '../../../../../../utils/constants'
import { useTranslation } from 'react-i18next'

const { Search } = Input

function TwitterRetweetSelector(props) {
  const { t } = useTranslation()

  const { setAction } = props
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
          setAction('twitter', 'retweet_id', tweetId)
          setAction('twitter', 'retweet_text', (result?.text || ''))
          setAction('twitter', 'retweet_like', (result?.like || ''))
          setAction('twitter', 'retweet_retweet', (result?.retweet || ''))
          setAction('twitter', 'retweet_created_at', (result?.created_at || ''))
          setAction('twitter', 'retweet_name', (result?.name || ''))
          setAction('twitter', 'retweet_verified', (result?.verified || false))
          setAction('twitter', 'retweet_profile_img', (result?.profile_img || ''))
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

export default TwitterRetweetSelector