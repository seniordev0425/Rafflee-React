import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'
import moment from 'moment'
import SetupSection from './Setup/SetupSection'
import CampaignType from './CampaignType/CampaignType'
import ActionSection from './Action/ActionSection'
import PreviewSection from './Preview/PreviewSection'
import PaymentSection from './Payment/PaymentSection'
import ResumeSection from './Resume/ResumeSection'

import Loading from '../../common/Loading'
import { saveCampaign } from '../../../actions/campaign'

import { facebookActionsMap } from './Action/Facebook/helper'
import { twitterActionsMap } from './Action/Twitter/helper'
import { instagramActionsMap } from './Action/Instagram/helper'
import { pollActionsMap } from './Action/Poll/helper'
import { tiktokActionsMap } from './Action/Tiktok/helper'
import { youtubeActionsMap } from './Action/Youtube/helper'
import { websiteActionsMap } from './Action/Website/helper'
import { twitchActionsMap } from './Action/Twitch/helper'

import { openNotification } from '../../../utils/notification'
import { b64toBlob } from '../../../utils/others'
import errorMessages from '../../../utils/messages/error'

import { useTranslation } from 'react-i18next'

function CreateCampaignLayout() {
  const { t } = useTranslation()

  const CREATE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.CREATE_CAMPAIGN)
  const SAVE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.SAVE_CAMPAIGN)
  const beingCreatedCampaign = useSelector(state => state.campaign.beingCreatedCampaign)
  const dispatch = useDispatch()

  // Enum (setup, campaign_type, action, preview, payment, resume)
  const [currentSection, setCurrentSection] = useState('resume')

  // This state includes all params to create campaign
  const [params, setParams] = useState({
    pk: '',
    promotion_name: '',
    promotion_picture: '',
    promotion_description: '',
    promotion_long_description: '',
    public_promotion: 'public',
    categories: [],
    countries: [],
    temp_categories: [],
    start_date: '',
    end_date: '',
    winnings: [{ name: '', number_of_people: '', description: '', image: [] }],
    campaign_type: 'giveaway',
    live_draw: false,
    limit_participants: false,
    limitation_participation: 0,
    facebook: [],
    twitter: [],
    youtube: [],
    instagram: [],
    twitch: [],
    tiktok: [],
    poll: [],
    url_website: []
  })

  // Update params with being created campaign data
  useEffect(() => {
    if (beingCreatedCampaign) {
      setParams({
        pk: beingCreatedCampaign.pk,
        promotion_name: beingCreatedCampaign.campaign_name,
        promotion_picture: beingCreatedCampaign.campaign_image,
        promotion_description: beingCreatedCampaign.description,
        promotion_long_description: beingCreatedCampaign.long_description,
        public_promotion: 'public',
        categories: beingCreatedCampaign.categories ? beingCreatedCampaign.categories : [],
        temp_categories: beingCreatedCampaign.categories ? beingCreatedCampaign.categories : [],
        countries: beingCreatedCampaign.countries ? beingCreatedCampaign.countries : [],
        start_date: beingCreatedCampaign.release_date ? moment(beingCreatedCampaign.release_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        end_date: beingCreatedCampaign.end_date ? moment(beingCreatedCampaign.end_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        winnings: beingCreatedCampaign.winnings ? beingCreatedCampaign.winnings : [{ name: '', number_of_people: '', description: '', image: [] }],
        campaign_type: beingCreatedCampaign.type_of_distribution,
        live_draw: beingCreatedCampaign.live_draw,
        limit_participants: false,
        limitation_participation: beingCreatedCampaign.number_of_maximum_participants,
        facebook: beingCreatedCampaign.action_participate.facebook.map(facebookActionsMap),
        youtube: beingCreatedCampaign.action_participate.youtube.map(youtubeActionsMap),
        twitter: beingCreatedCampaign.action_participate.twitter.map(twitterActionsMap),
        instagram: beingCreatedCampaign.action_participate.instagram.map(instagramActionsMap),
        twitch: beingCreatedCampaign.action_participate.twitch.map(twitchActionsMap),
        tiktok: beingCreatedCampaign.action_participate.tiktok.map(tiktokActionsMap),
        poll: beingCreatedCampaign.action_participate.poll.map(pollActionsMap),
        url_website: beingCreatedCampaign.action_participate.website.map(websiteActionsMap),
      })
      dispatch({ type: 'SET_BEING_CREATED_CAMPAIGN', data: null })
    }
  }, [beingCreatedCampaign])

  // Update params 
  const _setParams = (key, val) => {
    let temp_params = { ...params }
    temp_params[key] = val
    setParams(temp_params)
  }

  // Update params too. But this function is for only social action params
  const _setAction = (socialName, actionId, newAction) => {
    let temp_params = { ...params }
    temp_params[socialName] = temp_params[socialName].map(action => action.id !== actionId
      ? action
      : newAction
    )
    setParams(temp_params)
  }

  // Switch section
  const _setSection = (section) => {
    setCurrentSection(section)
  }

  // save current campaign
  const onSaveCampaign = () => {
    if (!params.promotion_name) {
      openNotification('warning', errorMessages[localStorage.getItem('i18nextLng')].MSG_CAMPAIGN_NAME_REQUIRED)
      return
    }
    let categories = []
    params.temp_categories.forEach((item) => categories.push({ name: item }))

    // Make facebook action para
    let facebook = []
    params.facebook.forEach(action => {
      if (action.type === 'post') {
        facebook.push({
          pk: action.pk,
          action: 'post',
          entries: action.post_entries || 1,
          mandatory: action.post_mandatory,
          url: `https://www.facebook.com/${action.post_page_id}/posts/${action.post_publication_id}/`,
          like: action.post_like,
          comment: action.post_comment,
          share: action.post_share
        })
      }
      if (action.type === 'url') {
        facebook.push({
          pk: action.pk,
          action: 'url',
          entries: action.url_entries || 1,
          mandatory: action.url_mandatory,
          url: action.url_url,
          like: action.url_like,
          share: action.url_share,
          comment: action.url_comment
        })
      }
      if (action.type === 'page') {
        facebook.push({
          pk: action.pk,
          action: 'page',
          entries: action.page_entries || 1,
          mandatory: action.page_mandatory,
          url: `https://www.facebook.com/${action.page_page_name}-${action.page_page_id}/`,
          follow: action.page_follow,
          share: action.page_share,
          comment: action.page_comment
        })
      }
    })

    // Make twitter action para
    let twitter = []
    params.twitter.forEach(action => {
      if (action.type === 'comment') {
        twitter.push({
          pk: action.pk,
          action: 'comment',
          id: action.comment_id,
          model: action.comment_model,
          entries: action.comment_entries || 1,
          mandatory: action.comment_mandatory,
          text: action.comment_text,
          like: action.comment_like,
          retweet: action.comment_retweet,
          created_at: action.comment_created_at,
          name: action.comment_name,
          verified: action.comment_verified,
          profile_img: action.comment_profile_img
        })
      }
      if (action.type === 'like') {
        twitter.push({
          pk: action.pk,
          action: 'like',
          id: action.like_id,
          entries: action.like_entries || 1,
          mandatory: action.like_mandatory,
          text: action.like_text,
          like: action.like_like,
          retweet: action.like_retweet,
          created_at: action.like_created_at,
          name: action.like_name,
          verified: action.like_verified,
          profile_img: action.like_profile_img
        })
      }
      if (action.type === 'retweet') {
        twitter.push({
          pk: action.pk,
          action: 'retweet',
          id: action.retweet_id,
          entries: action.retweet_entries || 1,
          mandatory: action.retweet_mandatory,
          text: action.retweet_text,
          like: action.retweet_like,
          retweet: action.retweet_retweet,
          created_at: action.retweet_created_at,
          name: action.retweet_name,
          verified: action.retweet_verified,
          profile_img: action.retweet_profile_img
        })
      }
      if (action.type === 'follow') {
        twitter.push({
          pk: action.pk,
          action: 'follow',
          id: action.follow_id,
          entries: action.follow_entries || 1,
          mandatory: action.follow_mandatory,
          profile_img_url: action.follow_profile_image_url,
          followers_count: action.follow_followers_count,
          screen_name: action.follow_screen_name,
          verified: action.follow_verified,
        })
      }
      if (action.type === 'tweet') {
        twitter.push({
          pk: action.pk,
          action: 'tweet',
          model: action.tweet_model,
          entries: action.tweet_entries || 1,
          mandatory: action.tweet_mandatory
        })
      }
    })

    // Make youtube action para
    let youtube = []
    params.youtube.forEach(action => {
      if (action.type === 'like') {
        youtube.push({
          pk: action.pk,
          action: 'like',
          id: action.like_id,
          entries: action.like_entries || 1,
          mandatory: action.like_mandatory,
          url_img: action.like_url_img,
          video_title: action.like_video_title,
          published_at: action.like_published_at,
          channel_title: action.like_channel_title
        })
      }
      if (action.type === 'follow') {
        youtube.push({
          pk: action.pk,
          action: 'follow',
          id: action.follow_id,
          entries: action.follow_entries || 1,
          mandatory: action.follow_mandatory,
          url_img: action.follow_url_img,
          channel_title: action.follow_channel_title
        })
      }
      if (action.type === 'comment') {
        youtube.push({
          pk: action.pk,
          action: 'comment',
          id: action.comment_id,
          entries: action.comment_entries || 1,
          mandatory: action.comment_mandatory,
          url_img: action.comment_url_img,
          video_title: action.comment_video_title,
          published_at: action.comment_published_at,
          channel_title: action.comment_channel_title,
          model: action.comment_model
        })
      }
      if (action.type === 'video') {
        youtube.push({
          pk: action.pk,
          action: 'video',
          id: action.video_id,
          entries: action.video_entries || 1,
          mandatory: action.video_mandatory,
          url_img: action.video_url_img,
          published_at: action.video_published_at
        })
      }
    })

    // Make instagram action para
    let instagram = []
    params.instagram.forEach(action => {
      if (action.type === 'follow') {
        instagram.push({
          pk: action.pk,
          action: 'follow',
          url: action.follow_url,
          entries: action.follow_entries || 1,
          mandatory: action.follow_mandatory
        })
      }
      if (action.type === 'like') {
        instagram.push({
          pk: action.pk,
          action: 'like',
          url: action.like_url,
          entries: action.like_entries || 1,
          mandatory: action.like_mandatory
        })
      }
      if (action.type === 'comment') {
        instagram.push({
          pk: action.pk,
          action: 'comment',
          id: action.comment_id,
          image_url: action.comment_url,
          url: action.comment_permalink,
          entries: action.comment_entries || 1,
          mandatory: action.comment_mandatory,
          caption: action.comment_caption,
          media_type: action.comment_media_type,
          like_count: action.comment_like_count,
          timestamp: action.comment_created_at
        })
      }
    })

    // Make tiktok action para
    let tiktok = []
    params.tiktok.forEach(action => {
      if (action.type === 'follow') {
        tiktok.push({
          pk: action.pk,
          action: 'follow',
          url: `https://www.tiktok.com/${action.follow_url}`,
          entries: action.follow_entries || 1,
          mandatory: action.follow_mandatory
        })
      }
      if (action.type === 'like') {
        tiktok.push({
          pk: action.pk,
          action: 'like',
          url: action.like_url,
          entries: action.like_entries || 1,
          mandatory: action.like_mandatory
        })
      }
    })


    // Make twitch action para
    let twitch = []
    params.twitch.forEach(action => {
      twitch.push({
        pk: action.pk,
        action: 'follow',
        follow_name: action.follow_name,
        entries: action.follow_entries || 1,
        mandatory: action.follow_mandatory
      })
    })

    // Make website action para
    let url_website = []
    params.url_website.forEach(action => {
      url_website.push({
        pk: action.pk,
        url: action.url,
        entries: action.entries || 1,
        mandatory: action.mandatory
      })
    })

    // Make poll action para
    let poll = []
    params.poll.forEach(action => {
      poll.push({
        pk: action.pk,
        question: action.question,
        response: action.response,
        multiples_choices: action.multiples_choices,
        entries: action.entries || 1,
        mandatory: action.mandatory
      })
    })

    let promotion_picture = null
    if (params.promotion_picture) {
      let block = params.promotion_picture.split(";")
      let contentType = block[0].split(":")[1]
      let realData = block[1].split(",")[1]
      promotion_picture = b64toBlob(realData, contentType)
    }

    var formdata = new FormData()
    formdata.append('pk', params.pk)
    formdata.append('promotion_picture', promotion_picture)
    formdata.append('promotion_name', params.promotion_name)
    formdata.append('promotion_description', params.promotion_description)
    formdata.append('promotion_long_description', params.promotion_long_description)
    formdata.append('public_promotion', params.public_promotion)

    let winnings = params.winnings
    winnings = winnings.map(winning => ({
      ...winning,
      image: winning.image.map(image => {
        let block = image.split(";")
        let realData = block[1].split(",")[1]
        return realData
      })
    }))
    formdata.append('winnings', JSON.stringify(winnings))

    if (categories.length > 0) {
      formdata.append('categories', JSON.stringify(categories))
    } else {
      formdata.append('categories', null)
    }
    formdata.append('countries', JSON.stringify({ countries: params.countries }))
    formdata.append('promotion_option', JSON.stringify({ live_draw: params.live_draw, limitation_participation: params.limitation_participation }))
    formdata.append('promotion_type', params.campaign_type)
    formdata.append('start_date', params.start_date)
    formdata.append('end_date', params.end_date)

    formdata.append('poll', JSON.stringify(poll))
    formdata.append('facebook', JSON.stringify(facebook))
    formdata.append('youtube', JSON.stringify(youtube))
    formdata.append('twitter', JSON.stringify(twitter))
    formdata.append('instagram', JSON.stringify(instagram))
    formdata.append('tiktok', JSON.stringify(tiktok))
    formdata.append('twitch', JSON.stringify(twitch))
    formdata.append('url_website', JSON.stringify(url_website))

    dispatch(saveCampaign(formdata))
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'setup':
        return <SetupSection params={params} setParams={_setParams} setSection={_setSection} onSaveCampaign={onSaveCampaign} />
      case 'campaign_type':
        return <CampaignType params={params} setParams={_setParams} setSection={_setSection} onSaveCampaign={onSaveCampaign} />
      case 'action':
        return <ActionSection params={params} setParams={_setParams} setSection={_setSection} onSaveCampaign={onSaveCampaign} setAction={_setAction} />
      case 'preview':
        return <PreviewSection params={params} setParams={_setParams} setSection={_setSection} onSaveCampaign={onSaveCampaign} />
      case 'payment':
        return <PaymentSection params={params} setParams={_setParams} setSection={_setSection} onSaveCampaign={onSaveCampaign} />
      case 'resume':
        return <ResumeSection params={params} setParams={_setParams} setSection={_setSection} />
      default:
        return <SetupSection />
    }
  }

  return (
    <>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="setup" className="analytics-menuitem" onClick={() => setCurrentSection("setup")}>
              <span className={currentSection === 'setup' ? "underline font-weight-bold" : ""}> {t('menubar.setup')}</span>
            </Menu.Item>
            <Menu.Item key="campaign_type" className="analytics-menuitem" onClick={() => setCurrentSection("campaign_type")}>
              <span className={currentSection === 'campaign_type' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.campaign_type')}</span>
            </Menu.Item>
            <Menu.Item key="action" className="analytics-menuitem" onClick={() => setCurrentSection("action")}>
              <span className={currentSection === 'action' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.action')}</span>
            </Menu.Item>
            <Menu.Item key="preview" className="analytics-menuitem" onClick={() => setCurrentSection("preview")}>
              <span className={currentSection === 'preview' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.preview')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      <div style={{ position: 'relative' }}>
        {renderSection()}
        {(CREATE_CAMPAIGN_PROCESS || SAVE_CAMPAIGN_PROCESS) &&
          <div className="opacity-loading-container">
            <Loading />
          </div>
        }
      </div>
    </>
  )
}

export default CreateCampaignLayout