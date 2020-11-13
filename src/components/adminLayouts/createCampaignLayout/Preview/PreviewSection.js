import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import PreviewCustomCollapsePanel from '../../../common/PreviewCustomCollapsePanel'
import PreviewCustomCollapsePanelForPoll from '../../../common/PreviewCustomCollapsePanelForPoll'

import { createCampaign } from '../../../../actions/campaign'

import { b64toBlob } from '../../../../utils/others'
import images from '../../../../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function PreviewSection(props) {
  const { t } = useTranslation()

  const { params, setSection, onBack } = props

  const CREATE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.CREATE_CAMPAIGN)
  const CREATE_CAMPAIGN_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CREATE_CAMPAIGN)
  const dispatch = useDispatch()

  // Required messages array which should appear when click on create campaign
  const [messages, setMessages] = useState([])

  const companyProfile = useSelector(state => state.userInfo.companyProfile)

  const [totalEntriesNum, setTotalEntriesNum] = useState(0)

  useEffect(() => {
    if (CREATE_CAMPAIGN_SUCCESS) {
      // if success then switch current section to resume
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CREATE_CAMPAIGN', data: false })
      setSection('resume')
    }
  }, [CREATE_CAMPAIGN_SUCCESS])

  useEffect(() => {
    //Calculate total entries number
    let totalTemp = 0
    if (params.facebook.page) {
      totalTemp += parseInt(params.facebook.page_entries) || 1
    }
    if (params.facebook.post) {
      totalTemp += parseInt(params.facebook.post_entries) || 1
    }
    if (params.facebook.url) {
      totalTemp += parseInt(params.facebook.url_entries) || 1
    }

    if (params.instagram.profile) {
      totalTemp += parseInt(params.instagram.profile_entries) || 1
    }
    if (params.instagram.publication) {
      totalTemp += parseInt(params.instagram.publication_entries) || 1
    }

    if (params.twitter.like) {
      totalTemp += parseInt(params.twitter.like_entries) || 1
    }
    if (params.twitter.follow) {
      totalTemp += parseInt(params.twitter.follow_entries) || 1
    }
    if (params.twitter.tweet) {
      totalTemp += parseInt(params.twitter.tweet_entries) || 1
    }
    if (params.twitter.retweet) {
      totalTemp += parseInt(params.twitter.retweet_entries) || 1
    }

    if (params.twitch.follow) {
      totalTemp += parseInt(params.twitch.follow_entries) || 1
    }

    if (params.tiktok.profile) {
      totalTemp += parseInt(params.tiktok.profile_entries) || 1
    }
    if (params.tiktok.publication) {
      totalTemp += parseInt(params.tiktok.publication_entries) || 1
    }

    if (params.url_video.video) {
      totalTemp += parseInt(params.url_video.entries) || 1
    }

    if (params.url_website.website) {
      totalTemp += parseInt(params.url_website.entries) || 1
    }

    if (params.poll !== 'false') {
      totalTemp += parseInt(params.poll.entries) || 1
    }
    setTotalEntriesNum(totalTemp)
  }, [])

  const renderWinnings = () => {
    return (
      (params.winnings).map((item, index) =>
        <div key={index} className="mt-3 color-blue font-size-11">{`- ${item.name}`}</div>
      )
    )
  }

  // Returns remaining dates
  const calcRemainingDates = () => {
    const currentDate = moment(Date.now())
    const endDate = moment(Date.parse(params.end_date))

    const diff = endDate.diff(currentDate)
    const diffDuration = moment.duration(diff)

    return diffDuration.asDays() > 0 ? Math.round(diffDuration.asDays()) : 0
  }

  // Returns maximum participants
  const calcMaximumParticipants = () => {
    if (params.campaign_type === 'giveaway') return 0
    let max_participants = 0
    // if campaign type is 'reward' then maximum participants is calculated by sum of every prize's number of people
    params.winnings.forEach(item => max_participants += parseInt(item.number_of_people || '0'))
    return max_participants
  }

  const onSubmit = () => {
    let required_messages = []

    let categories = []
    params.temp_categories.forEach((item) => categories.push({ name: item }))

    // Make facebook action para
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

    // Check required fields and prepare required messages
    if (params.promotion_name === '') required_messages.push(t('create_campaign_page.required_fields.campaign_name'))
    if (params.promotion_picture === '') required_messages.push(t('create_campaign_page.required_fields.campaign_image'))
    if (params.promotion_description === '') required_messages.push(t('create_campaign_page.required_fields.short_description'))
    if (params.promotion_long_description === '') required_messages.push(t('create_campaign_page.required_fields.complete_description'))
    if (params.start_date === '') required_messages.push(t('create_campaign_page.required_fields.start_date'))
    if (params.end_date === '') required_messages.push(t('create_campaign_page.required_fields.end_date'))
    if (!facebook.length && !twitter.length &&
      !twitch.length && !instagram.length &&
      !params.url_video.video && !tiktok.length &&
      !params.url_website.website &&
      params.poll === 'false') {
      required_messages.push(t('create_campaign_page.required_fields.action'))
    }
    for (let i = 0; i < params.winnings.length; i++) {
      if (params.winnings[i].name === '' || params.winnings[i].number_of_people === '' || params.winnings[i].description === '') {
        required_messages.push(t('create_campaign_page.required_fields.winnings'))
        break;
      }
    }

    setMessages(required_messages)

    if (required_messages.length > 0) {
      return
    }

    // Genarate form data to create campaign
    let promotion_picture = null
    let block = params.promotion_picture.split(";")
    let contentType = block[0].split(":")[1]
    let realData = block[1].split(",")[1]
    promotion_picture = b64toBlob(realData, contentType)

    var formdata = new FormData()
    formdata.append('pk', params.pk)
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
    dispatch(createCampaign(formdata))
  }


  return (
    <Row>
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <div className="mt-5 mb-3 mx-3">
          <Row className="px-3 mt-5">
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcRemainingDates()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.days')}</div>
            </Col>
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">0 / {totalEntriesNum}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.entries')}</div>
            </Col>
            <Col className="px-0">
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcMaximumParticipants()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.participants')}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="d-flex justify-content-center">
                <img src={params.promotion_picture ? params.promotion_picture : images.campaign} width="100%" style={{ maxHeight: 500, objectFit: 'contain' }} alt="" />
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img p-0">
              <div>
                <img src={companyProfile.logo ? companyProfile.logo : images.profile_img} alt="" />
                <div className="mt-3 color-blue font-weight-bold">{companyProfile.company_name}</div>
              </div>
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title">{params.promotion_name}</div>
              <div style={{ width: "70%" }} className="promotion-list-item-text">{params.promotion_long_description}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="pb-5" style={{ borderBottom: '2px solid #F3F4F7' }}>
                <div className="color-blue font-size-14 font-weight-bold">{t('campaign_detail_page.the_prize')}</div>
                <div className="mt-3 color-gray font-size-11">{t('campaign_detail_page.prize_description')}</div>
                {renderWinnings()}
              </div>
            </Col>
          </Row>

          {params.facebook.page &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_page.title')}
                  text={t('campaign_detail_page.facebook_page.text')}
                  socialName="facebook"
                  mandatory={params.facebook.page_mandatory}
                  entries={params.facebook.page_entries}
                />
              </Col>
            </Row>
          }
          {params.facebook.post &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_post.title')}
                  text={t('campaign_detail_page.facebook_post.text')}
                  socialName="facebook"
                  mandatory={params.facebook.post_mandatory}
                  entries={params.facebook.post_entries}
                />
              </Col>
            </Row>
          }
          {params.facebook.url &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.facebook_url.title')}
                  text={t('campaign_detail_page.facebook_url.text')}
                  socialName="facebook"
                  mandatory={params.facebook.url_mandatory}
                  entries={params.facebook.url_entries}
                />
              </Col>
            </Row>
          }
          {params.instagram.profile &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.instagram_follow.title')}
                  text={t('campaign_detail_page.instagram_follow.text')}
                  socialName="instagram"
                  mandatory={params.instagram.profile_mandatory}
                  entries={params.instagram.profile_entries}
                />
              </Col>
            </Row>
          }
          {params.instagram.publication &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.instagram_like.title')}
                  text={t('campaign_detail_page.instagram_like.text')}
                  socialName="instagram"
                  mandatory={params.instagram.publication_mandatory}
                  entries={params.instagram.publication_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.like &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_like.title')}
                  text={t('campaign_detail_page.twitter_like.text')}
                  socialName="twitter"
                  mandatory={params.twitter.like_mandatory}
                  entries={params.twitter.like_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.follow &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_follow.title')}
                  text={t('campaign_detail_page.twitter_follow.text')}
                  socialName="twitter"
                  mandatory={params.twitter.follow_mandatory}
                  entries={params.twitter.follow_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.comment &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_tweet.title')}
                  text={t('campaign_detail_page.twitter_tweet.text')}
                  socialName="twitter"
                  mandatory={params.twitter.comment_mandatory}
                  entries={params.twitter.comment_entries}
                />
              </Col>
            </Row>
          }
          {params.twitter.retweet &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitter_retweet.title')}
                  text={t('campaign_detail_page.twitter_retweet.text')}
                  socialName="twitter"
                  mandatory={params.twitter.retweet_mandatory}
                  entries={params.twitter.retweet_entries}
                />
              </Col>
            </Row>
          }
          {params.twitch.follow &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitch_follow.title')}
                  text={t('campaign_detail_page.twitch_follow.text')}
                  socialName="twitch"
                  mandatory={params.twitch.follow_mandatory}
                  entries={params.twitch.follow_entries}
                />
              </Col>
            </Row>
          }
          {params.tiktok.profile &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_follow.title')}
                  text={t('campaign_detail_page.tiktok_follow.text')}
                  socialName="tiktok"
                  mandatory={params.tiktok.profile_mandatory}
                  entries={params.tiktok.profile_entries}
                />
              </Col>
            </Row>
          }
          {params.tiktok.publication &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_like.title')}
                  text={t('campaign_detail_page.tiktok_like.text')}
                  socialName="tiktok"
                  mandatory={params.tiktok.publication_mandatory}
                  entries={params.tiktok.publication_entries}
                />
              </Col>
            </Row>
          }
          {params.url_video.video &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.video.title')}
                  text={t('campaign_detail_page.video.text')}
                  socialName="video"
                  mandatory={params.url_video.mandatory}
                  entries={params.url_video.entries}
                />
              </Col>
            </Row>
          }
          {params.url_website.website &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.website.title')}
                  text={params.url_website.url}
                  socialName="website"
                  mandatory={params.url_website.mandatory}
                  entries={params.url_website.entries}
                />
              </Col>
            </Row>
          }
          {params.poll !== 'false' &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanelForPoll
                  title={params.poll.question}
                  text={t('campaign_detail_page.poll.text')}
                  multiple_choice={params.poll.mutiples_choices}
                  responses={params.poll.response}
                  mandatory={params.poll.mandatory}
                  entries={params.poll.entries}
                />
              </Col>
            </Row>
          }
        </div>
        <Row>
          <Col className="d-flex justify-content-between">
            <Button
              type="primary"
              className="ant-blue-btn my-5"
              style={{ width: 180 }}
              onClick={onBack}
            >
              {t('button_group.go_to_campaigns')}
            </Button>
            <Button
              onClick={onSubmit}
              className="ant-blue-btn my-3"
              type="primary"
              style={{ width: 200 }}
              loading={CREATE_CAMPAIGN_PROCESS}
            >
              {!CREATE_CAMPAIGN_PROCESS && t('button_group.create_campaign')}
            </Button>
          </Col>
        </Row>
        <div>
          {messages.map((item, index) =>
            <div key={index} className="mb-3 font-size-9 color-red">
              {item}
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

export default PreviewSection