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

import { saveCampaign } from '../../../actions/campaign'

import { b64toBlob } from '../../../utils/others'

import { useTranslation } from 'react-i18next'

function CreateCampaignLayout() {
  const { t } = useTranslation()

  const beingCreatedCampaign = useSelector(state => state.campaign.beingCreatedCampaign)
  const dispatch = useDispatch()

  // Enum (setup, campaign_type, action, preview, payment, resume)
  const [currentSection, setCurrentSection] = useState('setup')

  // This state includes all params to create campaign
  const [params, setParams] = useState({
    pk: '',
    promotion_name: '',
    promotion_picture: '',
    promotion_description: '',
    promotion_long_description: '',
    public_promotion: 'public',
    categories: [],
    temp_categories: [],
    start_date: '',
    end_date: '',
    winnings: [{ name: '', number_of_people: '', description: '', image: '' }],
    campaign_type: 'giveaway',
    live_draw: false,
    limit_participants: false,
    limitation_participation: 0,
    facebook: {
      post: false,
      post_entries: '',
      post_mandatory: false,
      post_like: false,
      post_comment: false,
      post_share: false,
      post_page_id: '',
      post_publication_id: '',
      url: false,
      url_entries: '',
      url_mandatory: false,
      url_url: '',
      url_like: false,
      url_share: false,
      page: false,
      page_entries: '',
      page_mandatory: false,
      page_page_id: '',
      page_page_name: '',
      page_follow: false,
      page_share: false
    },
    twitter: {
      comment: false,
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      like: false,
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      retweet: false,
      retweet_id: '',
      retweet_entries: '',
      retweet_mandatory: false,
      follow: false,
      follow_type: 'screen_name',
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false
    },
    instagram: {
      publication: false,
      profile: false,
      publication_url: '',
      profile_url: '',
      publication_entries: '',
      publication_mandatory: false,
      profile_entries: '',
      profile_mandatory: false
    },
    twitch: {
      follow: false,
      follow_name: '',
      follow_entries: '',
      follow_mandatory: false
    },
    tiktok: {
      publication: false,
      profile: false,
      publication_url: '',
      profile_url: '@',
      publication_entries: '',
      publication_mandatory: false,
      profile_entries: '',
      profile_mandatory: false
    },
    poll: 'false',
    url_video: {
      video: false,
      url: '',
      url_mobile: '',
      video_name: '',
      entries: '',
      mandatory: false
    },
    url_website: {
      website: false,
      url: '',
      entries: '',
      mandatory: false
    }
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
        start_date: beingCreatedCampaign.release_date,
        end_date: beingCreatedCampaign.end_date,
        winnings: beingCreatedCampaign.winnings ? beingCreatedCampaign.winnings : [{ name: '', number_of_people: '', description: '', image: '' }],
        campaign_type: beingCreatedCampaign.type_of_distribution,
        live_draw: beingCreatedCampaign.live_draw,
        limit_participants: false,
        limitation_participation: beingCreatedCampaign.number_of_maximum_participants,
        facebook: {
          post: beingCreatedCampaign.action_participate[0].social_action[0].facebook_post,
          post_entries: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_post_entries || '',
          post_mandatory: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_post_mandatory || false,
          post_like: false,
          post_comment: false,
          post_share: false,
          post_page_id: '',
          post_publication_id: '',
          url: beingCreatedCampaign.action_participate[0].social_action[0].facebook_url,
          url_entries: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_url_entries || '',
          url_mandatory: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_url_mandatory || false,
          url_url: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_url_url || '',
          url_like: false,
          url_share: false,
          page: beingCreatedCampaign.action_participate[0].social_action[0].facebook_page,
          page_entries: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_page_entries || '',
          page_mandatory: beingCreatedCampaign.action_participate[0].social_action[0]?.facebook_page_mandatory || false,
          page_page_id: '',
          page_page_name: '',
          page_follow: false,
          page_share: false
        },
        twitter: {
          comment: beingCreatedCampaign.action_participate[0].social_action[3].twitter_tweet,
          comment_model: '',
          comment_entries: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_tweet_entries || '',
          comment_mandatory: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_tweet_mandatory || false,
          like: beingCreatedCampaign.action_participate[0].social_action[3].twitter_like,
          like_id: '',
          like_entries: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_like_entries || '',
          like_mandatory: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_like_mandatory || false,
          retweet: beingCreatedCampaign.action_participate[0].social_action[3].twitter_retweet,
          retweet_id: '',
          retweet_entries: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_retweet_entries || '',
          retweet_mandatory: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_retweet_mandatory || false,
          follow: beingCreatedCampaign.action_participate[0].social_action[3].twitter_follow,
          follow_type: 'screen_name',
          follow_id: '',
          follow_entries: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_follow_entries || '',
          follow_mandatory: beingCreatedCampaign.action_participate[0].social_action[3]?.twitter_follow_mandatory || false,
        },
        instagram: {
          publication: beingCreatedCampaign.action_participate[0].social_action[2].instagram_publication,
          profile: beingCreatedCampaign.action_participate[0].social_action[2].instagram_profile,
          publication_url: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_publication_url || '',
          profile_url: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_profile_url || '',
          publication_entries: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_publication_entries || '',
          publication_mandatory: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_publication_mandatory || false,
          profile_entries: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_profile_entries || '',
          profile_mandatory: beingCreatedCampaign.action_participate[0].social_action[2]?.instagram_profile_mandatory || false
        },
        twitch: {
          follow: beingCreatedCampaign.action_participate[0].social_action[4]?.twitch_follow || false,
          follow_name: '',
          follow_entries: beingCreatedCampaign.action_participate[0].social_action[4]?.twitch_follow_entries || '',
          follow_mandatory: beingCreatedCampaign.action_participate[0].social_action[4]?.twitch_follow_mandatory || false,
        },
        tiktok: {
          publication: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_publication,
          profile: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_profile,
          publication_url: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_publication_url || '',
          profile_url: '@',
          publication_entries: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_publication_entries || '',
          publication_mandatory: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_publication_mandatory || false,
          profile_entries: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_profile_entries || '',
          profile_mandatory: beingCreatedCampaign.action_participate[0].social_action[5]?.tiktok_profile_mandatory || false
        },
        poll: beingCreatedCampaign.action_participate[0].poll ?
          {
            question: beingCreatedCampaign.action_participate[0].poll.question,
            response: beingCreatedCampaign.action_participate[0].poll.responses,
            mutiples_choices: beingCreatedCampaign.action_participate[0].poll.multiple_choices,
            entries: beingCreatedCampaign.action_participate[0].poll.entries,
            mandatory: beingCreatedCampaign.action_participate[0].poll.mandatory
          }
          : 'false',
        url_video: {
          video: beingCreatedCampaign.action_participate[0].video ? true : false,
          url: beingCreatedCampaign.action_participate[0].video?.url_video || '',
          url_mobile: beingCreatedCampaign.action_participate[0].video?.url_video_mobile || '',
          video_name: beingCreatedCampaign.action_participate[0].video?.video_name || '',
          entries: beingCreatedCampaign.action_participate[0].video?.entries || '',
          mandatory: beingCreatedCampaign.action_participate[0].video?.mandatory || false
        },
        url_website: {
          website: beingCreatedCampaign.action_participate[0].website ? true : false,
          url: beingCreatedCampaign.action_participate[0].website?.url || '',
          entries: beingCreatedCampaign.action_participate[0].website?.entries || '',
          mandatory: beingCreatedCampaign.action_participate[0].website?.mandatory || false
        }
      })
    }
  }, [beingCreatedCampaign])

  // Update params 
  const _setParams = (key, val) => {
    let temp_params = { ...params }
    temp_params[key] = val
    setParams(temp_params)
  }

  // Update params too. But this function is for only social action params
  const _setAction = (socialName, actionType, val) => {
    let temp_params = { ...params }
    temp_params[socialName][actionType] = val
    setParams(temp_params)
    console.log(params)
  }

  // Switch section
  const _setSection = (section) => {
    setCurrentSection(section)
  }

  // save current campaign
  const onSaveCampaign = () => {
    let categories = []
    params.temp_categories.forEach((item) => categories.push({ name: item }))

    let facebook = []
    if (params.facebook.post) {
      facebook.push({
        action: 'post',
        entries: params.facebook.post_entries || 1,
        mandatory: params.facebook.post_mandatory,
        url: `https://www.facebook.com/${params.facebook.post_page_id}/posts/${params.facebook.post_publication_id}/`,
        like: params.facebook.post_like,
        comment: params.facebook.post_comment,
        share: params.facebook.post_share
      })
    }
    if (params.facebook.url) {
      facebook.push({
        action: 'url',
        entries: params.facebook.url_entries || 1,
        mandatory: params.facebook.url_mandatory,
        url: params.facebook.url_url,
        like: params.facebook.url_like,
        share: params.facebook.url_share
      })
    }
    if (params.facebook.page) {
      facebook.push({
        action: 'page',
        entries: params.facebook.page_entries || 1,
        mandatory: params.facebook.page_mandatory,
        url: `https://www.facebook.com/${params.facebook.page_page_name}-${params.facebook.page_page_id}/`,
        follow: params.facebook.page_follow,
        share: params.facebook.page_share
      })
    }

    // Make twitter action para
    let twitter = []
    if (params.twitter.comment) {
      twitter.push({ action: 'tweet', model: params.twitter.comment_model, entries: params.twitter.comment_entries || 1, mandatory: params.twitter.comment_mandatory })
    }
    if (params.twitter.like) {
      twitter.push({ action: 'like', id: params.twitter.like_id, entries: params.twitter.like_entries || 1, mandatory: params.twitter.like_mandatory })
    }
    if (params.twitter.retweet) {
      twitter.push({ action: 'retweet', id: params.twitter.retweet_id, entries: params.twitter.retweet_entries || 1, mandatory: params.twitter.retweet_mandatory })
    }
    if (params.twitter.follow) {
      twitter.push({ action: 'follow', type: params.twitter.follow_type, id: params.twitter.follow_id, entries: params.twitter.follow_entries || 1, mandatory: params.twitter.follow_mandatory })
    }

    // Make instagram action para
    let instagram = []
    if (params.instagram.profile) {
      instagram.push({ action: 'instagram_profile', url: params.instagram.profile_url, entries: params.instagram.profile_entries || 1, mandatory: params.instagram.profile_mandatory })
    }
    if (params.instagram.publication) {
      instagram.push({ action: 'instagram_publication', url: params.instagram.publication_url, entries: params.instagram.publication_entries || 1, mandatory: params.instagram.publication_mandatory })
    }

    // Make tiktok action para
    let tiktok = []
    if (params.tiktok.profile) {
      tiktok.push({
        action: 'tiktok_profile',
        url: `https://www.tiktok.com/${params.tiktok.profile_url}`,
        entries: params.tiktok.profile_entries || 1,
        mandatory: params.tiktok.profile_mandatory
      })
    }
    if (params.tiktok.publication) {
      tiktok.push({
        action: 'tiktok_publication',
        url: params.tiktok.publication_url,
        entries: params.tiktok.publication_entries || 1,
        mandatory: params.tiktok.publication_mandatory
      })
    }

    // Make twitch action para
    let twitch = []
    if (params.twitch.follow) {
      twitch.push({ action: 'follow', follow_name: params.twitch.follow_name, entries: params.twitch.follow_entries || 1, mandatory: params.twitch.follow_mandatory })
    }

    // Make video action para
    let url_video = {}
    if (params.url_video.video) {
      url_video = { url: params.url_video.url, url_mobile: params.url_video.url_mobile, video_name: params.url_video.video_name, entries: params.url_video.entries || 1, mandatory: params.url_video.mandatory }
    }

    // Make website action para
    let url_website = {}
    if (params.url_website.website) {
      url_website = { url: params.url_website.url, entries: params.url_website.entries || 1, mandatory: params.url_website.mandatory }
    }

    let promotion_picture = null
    if (params.promotion_picture !== '') {
      let block = params.promotion_picture.split(";")
      let contentType = block[0].split(":")[1]
      let realData = block[1].split(",")[1]
      promotion_picture = b64toBlob(realData, contentType)
    }

    var formdata = new FormData()
    formdata.append('pk', '')
    formdata.append('promotion_picture', promotion_picture)
    formdata.append('promotion_name', params.promotion_name)
    formdata.append('promotion_description', params.promotion_description)
    formdata.append('promotion_long_description', params.promotion_long_description)
    formdata.append('public_promotion', params.public_promotion)
    formdata.append('winnings', JSON.stringify(params.winnings))
    if (categories.length > 0) {
      formdata.append('categories', JSON.stringify(categories))
    } else {
      formdata.append('categories', null)
    }
    formdata.append('promotion_option', JSON.stringify({ live_draw: params.live_draw, limitation_participation: params.limitation_participation }))
    formdata.append('promotion_type', params.campaign_type)
    formdata.append('start_date', params.start_date)
    formdata.append('end_date', params.end_date)
    if (params.poll === 'false') {
      formdata.append('poll', null)
    } else {
      formdata.append('poll', JSON.stringify(params.poll))
    }
    formdata.append('facebook', JSON.stringify(facebook))
    formdata.append('youtube', JSON.stringify([]))
    formdata.append('twitter', JSON.stringify(twitter))
    formdata.append('instagram', JSON.stringify(instagram))
    formdata.append('tiktok', JSON.stringify(tiktok))
    formdata.append('twitch', JSON.stringify(twitch))
    formdata.append('url_website', JSON.stringify(url_website))
    formdata.append('url_video', JSON.stringify(url_video))

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
      {renderSection()}
    </>
  )
}

export default CreateCampaignLayout