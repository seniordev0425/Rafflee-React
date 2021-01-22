import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import debounce from 'lodash/debounce'
import * as _ from 'lodash'

import { openNotification } from '../../../../../../utils/notification'

import { APIROUTE } from '../../../../../../utils/constants'
import { useTranslation } from 'react-i18next'

const { Option } = Select

function YoutubeVideoSelect(props) {
  const { t } = useTranslation()

  const { action, setAction } = props

  const [videos, setVideos] = useState([])
  const [value, setValue] = useState([])
  const [fetching, setFetching] = useState(false)

  const fetchVideo = value => {
    if (value === '') return
    setVideos([])
    setFetching(true)

    var myHeaders = new Headers()
    myHeaders.append("Authorization", "JWT " + localStorage.getItem('token'))
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    }

    fetch(`${APIROUTE}youtube/video/search/?search=${value}`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 200) {
          setVideos(result.videos)
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
    setVideos([])
    setValue(value)
    setFetching(false)
    
    var commentData = {}
    if (_.isEmpty(value)) {
      commentData = {
        comment_id: '',
        comment_url_img: '',
        comment_video_title: '',
        comment_published_at: '',
        comment_channel_title: ''
      }
    } else {
      commentData = _.find(videos, { videoId: value[0].value })
      commentData = {
        comment_id: commentData.videoId,
        comment_url_img: commentData.profile_image_url.url,
        comment_video_title: commentData.title,
        comment_published_at: commentData.publishedAt,
        comment_channel_title: commentData.channelTitle
      }
    }
    setAction('youtube', action.id, {
      ...action,
      comment_id: commentData.comment_id,
      comment_url_img: commentData.comment_url_img,
      comment_video_title: commentData.comment_video_title,
      comment_published_at: commentData.comment_published_at,
      comment_channel_title: commentData.comment_channel_title
    })
  }

  return (
    <Select
      mode="multiple"
      labelInValue
      value={value}
      placeholder={t('create_campaign_page.select_video')}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      filterOption={false}
      onSearch={debounce(fetchVideo, 800)}
      onChange={handleChange}
      style={{ width: '100%' }}
      open={value.length >= 1 ? false : true}
      size='large'
    >
      {videos.map(video => (
        <Option key={video.videoId} value={video.videoId}>
          <img src={video.profile_image_url.url} width={25} height={25} className="rounded-circle" alt="" />
          <span className="ml-2 font-weight-bold">{video.title}</span>
        </Option>
      ))}
    </Select>
  )
}

export default YoutubeVideoSelect