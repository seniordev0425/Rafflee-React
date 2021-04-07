import React, { useState } from 'react'
import { Select, Spin } from 'antd'
import * as _ from 'lodash'
import debounce from 'lodash/debounce'

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
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'))
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

    var videoData = {}
    if (_.isEmpty(value)) {
      videoData = {
        video_id: '',
        video_url_img: '',
        video_published_at: ''
      }
    } else {
      videoData = _.find(videos, { videoId: value[0].value })
      videoData = {
        video_id: videoData.videoId,
        video_url_img: videoData.profile_image_url.url,
        video_published_at: videoData.publishedAt
      }
    }
    setAction('youtube', action.id, {
      ...action,
      video_id: videoData.video_id,
      video_url_img: videoData.video_url_img,
      video_published_at: videoData.video_published_at
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