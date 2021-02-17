import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Button } from 'antd'
import PreviewCustomCollapsePanel from '../../../common/PreviewCustomCollapsePanel'
import PreviewCustomCollapsePanelForPoll from '../../../common/PreviewCustomCollapsePanelForPoll'
import PreviewWinningDetailModal from '../../../modals/PreviewWinningDetailModal'

import { createCampaign } from '../../../../actions/campaign'

import { b64toBlob } from '../../../../utils/others'
import { getTotalEntriesOfPreviewSection } from '../../../../utils/campaign'
import images from '../../../../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function PreviewSection(props) {
  const { t } = useTranslation()

  const { params, setSection, onSaveCampaign } = props

  const companyProfile = useSelector(state => state.userInfo.companyProfile)
  const CREATE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.CREATE_CAMPAIGN)
  const CREATE_CAMPAIGN_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CREATE_CAMPAIGN)
  const SAVE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.SAVE_CAMPAIGN)
  const dispatch = useDispatch()

  // Required messages array which should appear when click on create campaign
  const [messages, setMessages] = useState([])
  const [openWinningModal, setOpenWinningModal] = useState(false)
  const [selectedWinning, setSelectedWinning] = useState(null)

  useEffect(() => {
    if (CREATE_CAMPAIGN_SUCCESS) {
      // if success then switch current section to resume
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CREATE_CAMPAIGN', data: false })
      setSection('resume')
    }
  }, [CREATE_CAMPAIGN_SUCCESS])

  const renderWinnings = () => {
    return (
      (params.winnings).map((item, index) =>
        <div
          key={index}
          className="mt-3 color-blue font-size-11 pointer"
          onClick={() => {
            setSelectedWinning(item)
            setOpenWinningModal(true)
          }}
        >
          {`- ${item.name}`}
        </div>
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
    // Check required fields and prepare required messages
    if (params.promotion_name === '') required_messages.push(t('create_campaign_page.required_fields.campaign_name'))
    if (!params.promotion_picture) required_messages.push(t('create_campaign_page.required_fields.campaign_image'))
    if (params.promotion_description === '') required_messages.push(t('create_campaign_page.required_fields.short_description'))
    if (params.promotion_long_description === '') required_messages.push(t('create_campaign_page.required_fields.complete_description'))
    if (params.start_date === '') required_messages.push(t('create_campaign_page.required_fields.start_date'))
    if (params.end_date === '') required_messages.push(t('create_campaign_page.required_fields.end_date'))
    if (!facebook.length && !twitter.length &&
      !twitch.length && !instagram.length && !youtube.length &&
      !tiktok.length && !url_website.length && !poll.length) {
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
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">0 / {getTotalEntriesOfPreviewSection(params)}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.entries')}</div>
            </Col>
            <Col className="px-0">
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcMaximumParticipants()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.participants')}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            {params.promotion_picture !== '' &&
              <Col>
                <div className="d-flex justify-content-center">
                  <img src={params.promotion_picture} width="100%" style={{ maxHeight: 500, objectFit: 'contain' }} alt="" />
                </div>
              </Col>
            }
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
          <Row>
            <Col>
              <div className="pb-5" style={{ borderBottom: '2px solid #F3F4F7' }}>
                <div className="color-gray font-size-11 mb-2">{`${t('campaign_detail_page.winners')}:  ${calcMaximumParticipants()}`}</div>
                <div className="color-blue font-size-14 font-weight-bold">{t('campaign_detail_page.the_prize')}</div>
                <div className="mt-3 color-gray font-size-11">{t('campaign_detail_page.prize_description')}</div>
                {renderWinnings()}
              </div>
            </Col>
          </Row>

          {params.facebook.map((action) => {
            if (action.type === 'page') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.facebook_page.title')}
                    text={t('campaign_detail_page.facebook_page.text')}
                    socialName="facebook"
                    mandatory={action.page_mandatory}
                    entries={action.page_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'post') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.facebook_post.title')}
                    text={t('campaign_detail_page.facebook_post.text')}
                    socialName="facebook"
                    mandatory={action.post_mandatory}
                    entries={action.post_entries}
                  />
                </Col>
              </Row>
            } else {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.facebook_url.title')}
                    text={t('campaign_detail_page.facebook_url.text')}
                    socialName="facebook"
                    mandatory={action.url_mandatory}
                    entries={action.url_entries}
                  />
                </Col>
              </Row>
            }
          })}

          {params.instagram.map((action) => {
            if (action.type === 'follow') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.instagram_follow.title')}  
                    text={t('campaign_detail_page.instagram_follow.text')}
                    socialName="instagram"
                    mandatory={action.follow_mandatory}
                    entries={action.follow_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'like') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.instagram_like.title')}
                    text={t('campaign_detail_page.instagram_like.text')}
                    socialName="instagram"
                    mandatory={action.like_mandatory}
                    entries={action.like_entries}
                  />
                </Col>
              </Row>
            } else {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.instagram_comment.title')}
                    text={t('campaign_detail_page.instagram_comment.text')}
                    socialName="instagram"
                    mandatory={action.comment_mandatory}
                    entries={action.comment_entries}
                  />
                </Col>
              </Row>
            }
          })}

          {params.twitter.map((action) => {
            if (action.type === 'like') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.twitter_like.title')}
                    text={t('campaign_detail_page.twitter_like.text')}
                    socialName="twitter"
                    mandatory={action.like_mandatory}
                    entries={action.like_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'follow') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.twitter_follow.title')}
                    text={t('campaign_detail_page.twitter_follow.text')}
                    socialName="twitter"
                    mandatory={action.follow_mandatory}
                    entries={action.follow_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'comment') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.twitter_comment.title')}
                    text={t('campaign_detail_page.twitter_comment.text')}
                    socialName="twitter"
                    mandatory={action.comment_mandatory}
                    entries={action.comment_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'tweet') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.twitter_tweet.title')}
                    text={t('campaign_detail_page.twitter_tweet.text')}
                    socialName="twitter"
                    mandatory={action.tweet_mandatory}
                    entries={action.tweet_entries}
                  />
                </Col>
              </Row>
            } else {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.twitter_retweet.title')}
                    text={t('campaign_detail_page.twitter_retweet.text')}
                    socialName="twitter"
                    mandatory={action.retweet_mandatory}
                    entries={action.retweet_entries}
                  />
                </Col>
              </Row>
            }
          })}

          {params.youtube.map((action) => {
            if (action.type === 'like') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.youtube_like.title')}
                    text={t('campaign_detail_page.youtube_like.text')}
                    socialName="youtube"
                    mandatory={action.like_mandatory}
                    entries={action.like_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'follow') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.youtube_follow.title')}
                    text={t('campaign_detail_page.youtube_follow.text')}
                    socialName="youtube"
                    mandatory={action.follow_mandatory}
                    entries={action.follow_entries}
                  />
                </Col>
              </Row>
            } else if (action.type === 'comment') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.youtube_comment.title')}
                    text={t('campaign_detail_page.youtube_comment.text')}
                    socialName="youtube"
                    mandatory={action.comment_mandatory}
                    entries={action.comment_entries}
                  />
                </Col>
              </Row>
            } else {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.youtube_video.title')}
                    text={t('campaign_detail_page.youtube_video.text')}
                    socialName="youtube"
                    mandatory={action.video_mandatory}
                    entries={action.video_entries}
                  />
                </Col>
              </Row>
            }
          })}

          {params.twitch.map((action) => (
            <Row key={action.id} className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.twitch_follow.title')}
                  text={t('campaign_detail_page.twitch_follow.text')}
                  socialName="twitch"
                  mandatory={action.follow_mandatory}
                  entries={action.follow_entries}
                />
              </Col>
            </Row>
          ))}

          {params.tiktok.map((action) => {
            if (action.type === 'like') {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.tiktok_like.title')}
                    text={t('campaign_detail_page.tiktok_like.text')}
                    socialName="tiktok"
                    mandatory={action.like_mandatory}
                    entries={action.like_entries}
                  />
                </Col>
              </Row>
            } else {
              return <Row key={action.id} className="mb-4 mt-4">
                <Col style={{ paddingLeft: 40 }}>
                  <PreviewCustomCollapsePanel
                    title={t('campaign_detail_page.tiktok_follow.title')}
                    text={t('campaign_detail_page.tiktok_follow.text')}
                    socialName="tiktok"
                    mandatory={action.follow_mandatory}
                    entries={action.follow_entries}
                  />
                </Col>
              </Row>
            }
          })}

          {params.url_website.map((action) => (
            <Row key={action.id} className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanel
                  title={t('campaign_detail_page.website.title')}
                  text={action.url}
                  socialName="website"
                  mandatory={action.mandatory}
                  entries={action.entries}
                />
              </Col>
            </Row>
          ))}

          {params.poll.map((action) => (
            <Row key={action.id} className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <PreviewCustomCollapsePanelForPoll
                  title={action.question}
                  text={t('campaign_detail_page.poll.text')}
                  multiple_choice={action.multiples_choices}
                  responses={action.response}
                  mandatory={action.mandatory}
                  entries={action.entries}
                />
              </Col>
            </Row>
          ))}
        </div>
        <Row>
          <Col className="d-flex justify-content-between">
            <Button
              type="primary"
              className="ant-blue-btn my-3"
              style={{ width: 150 }}
              onClick={onSaveCampaign}
              loading={SAVE_CAMPAIGN_PROCESS}
            >
              {!SAVE_CAMPAIGN_PROCESS && t('button_group.save')}
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

      <PreviewWinningDetailModal
        open={openWinningModal}
        onToggle={() => setOpenWinningModal(!openWinningModal)}
        winning={selectedWinning}
      />
    </Row>
  )
}

export default PreviewSection