import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Progress } from 'reactstrap'
import { Button, Tooltip } from 'antd'
import moment from 'moment'
import * as _ from 'lodash'
import AppLayout from '../components/layouts/AppLayout'
import CampaignHelmet from '../components/common/Helmets/CampaignHelmet'
import images from '../utils/images'
import CustomCollapsePanel from '../components/common/CustomCollapsePanel'
import CustomCollapsePanelForPoll from '../components/common/CustomCollapsePanelForPoll'

import WinningDetailModal from '../components/modals/WinningDetailModal'
import VideoPlayerModal from '../components/modals/VideoPlayerModal'
import ParticipateConfirmModal from '../components/modals/ParticipateConfirmModal'
import TwitterLikeValidationModal from '../components/modals/ActionValidationModals/TwitterLikeValidationModal'
import TwitterRetweetValidationModal from '../components/modals/ActionValidationModals/TwitterRetweetValidationModal'
import TwitterCommentValidationModal from '../components/modals/ActionValidationModals/TwitterCommentValidationModal'
import TwitterFollowValidationModal from '../components/modals/ActionValidationModals/TwitterFollowValidationModal'
import TwitchFollowValidationModal from '../components/modals/ActionValidationModals/TwitchFollowValidationModal'
import YoutubeLikeValidationModal from '../components/modals/ActionValidationModals/YoutubeLikeValidationModal'
import YoutubeCommentValidationModal from '../components/modals/ActionValidationModals/YoutubeCommentValidationModal'
import YoutubeFollowValidationModal from '../components/modals/ActionValidationModals/YoutubeFollowValidationModal'

import LoadingPage from '../components/common/LoadingPage'

import {
  campaignParticipate,
  getCampaignData,
  getWinningData,
  updateFavorite,
  campaignParticipateYoutubeLike,
  campaignParticipateYoutubeComment,
  campaignParticipateYoutubeFollow,
  campaignParticipateYoutubeVideoValidation,
  campaignParticipateTwitterLike,
  campaignParticipateTwitterRetweet,
  campaignParticipateTwitterComment,
  campaignParticipateTwitterFollow,
  campaignParticipateTwitchFollow,
  campaignParticipateVideo,
  campaignParticipatePoll,
  campaignParticipateWebsite,
  campaignParticipateInstagramProfile,
  campaignParticipateInstagramPublication,
  campaignParticipateTiktokProfile,
  campaignParticipateTiktokPublication,
  campaignParticipateFacebookPage,
  campaignParticipateFacebookPost,
  campaignParticipateFacebookUrl
} from '../actions/campaign'

import { twitterConnectStep1, youtubeConnectStep1 } from '../actions/userInfo'

import { getTotalEntries } from '../utils/campaign'
import {
  TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY,
  TWITCH_OAUTH_TOKEN_URL_FOR_USER,
  INSTAGRAM_OAUTH_TOKEN_URL
} from '../utils/constants'

import { useTranslation } from 'react-i18next'

let actionParams = []

function CampaignDetail(props) {
  const { t } = useTranslation()

  const { match } = props

  const campaignData = useSelector(state => state.campaign.campaignData)
  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)
  const userProfile = useSelector(state => state.userInfo.userProfile)
  const confirmed_participation = useSelector(state => state.campaign.confirmed_participation)
  const dispatch = useDispatch()

  const GET_CAMPAIGN_DATA_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_DATA)
  const CAMPAIGN_PARTICIPATE_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE)
  const CAMPAIGN_PARTICIPATE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CAMPAIGN_PARTICIPATE)

  const OPEN_TWITTER_LIKE_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_LIKE_VALIDATION_MODAL)
  const OPEN_TWITTER_RETWEET_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_RETWEET_VALIDATION_MODAL)
  const OPEN_TWITTER_COMMENT_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_COMMENT_VALIDATION_MODAL)
  const OPEN_TWITTER_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_FOLLOW_VALIDATION_MODAL)
  const OPEN_TWITCH_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITCH_FOLLOW_VALIDATION_MODAL)
  const OPEN_YOUTUBE_LIKE_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_YOUTUBE_LIKE_VALIDATION_MODAL)
  const OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL)
  const OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL)

  const twitter_oauth_token = useSelector(state => state.userInfo.twitter_oauth_token)
  const twitterDirectConnect = useSelector(state => state.userInfo.twitterDirectConnect)
  const twitchDirectConnect = useSelector(state => state.userInfo.twitchDirectConnect)
  const youtube_oauth_url = useSelector(state => state.userInfo.youtube_oauth_url)
  const youtubeDirectConnect = useSelector(state => state.userInfo.youtubeDirectConnect)
  const instagramDirectConnect = useSelector(state => state.userInfo.instagramDirectConnect)

  const instagram_follow_validation = useSelector(state => state.campaign.instagram_follow_validation)
  const instagram_like_validation = useSelector(state => state.campaign.instagram_like_validation)

  const [totalEntriesNum, setTotalEntriesNum] = useState(0)
  const [action, setAction] = useState({})
  const [openVideo, setOpenVideo] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)

  const [openWinningDetailModal, setOpenWinningDetailModal] = useState(false)
  const [openTwitterLikeModal, setOpenTwitterLikeModal] = useState(false)
  const [openTwitterRetweetModal, setOpenTwitterRetweetModal] = useState(false)
  const [openTwitterCommentModal, setOpenTwitterCommentModal] = useState(false)
  const [openTwitterFollowModal, setOpenTwitterFollowModal] = useState(false)
  const [openTwitchFollowModal, setOpenTwitchFollowModal] = useState(false)
  const [openYoutubeLikeModal, setOpenYoutubeLikeModal] = useState(false)
  const [openYoutubeCommentModal, setOpenYoutubeCommentModal] = useState(false)
  const [openYoutubeFollowModal, setOpenYoutubeFollowModal] = useState(false)

  const [isYoutubeVideoClicked, setIsYoutubeVideoClicked] = useState(false)

  useEffect(() => {
    // Load campaign data after render
    document.title = "Campaign Detail"
    var body = {
      token: token
    }
    dispatch(getCampaignData(match.params.id, body))
    actionParams = []
  }, [token])

  useEffect(() => {
    if (twitter_oauth_token) { // Redirect to twitter login after getting twitter oauth token
      dispatch({ type: 'INIT_STATE', state: 'twitter_oauth_token', data: '' })
      window.open(`https://api.twitter.com/oauth/authorize?oauth_token=${twitter_oauth_token}`, '_blank')
    }
    if (youtube_oauth_url) { // Redirect to youtube login after getting youtube oauth token url
      dispatch({ type: 'INIT_STATE', state: 'youtube_oauth_url', data: '' })
      window.open(youtube_oauth_url, '_blank')
    }
  }, [twitter_oauth_token, youtube_oauth_url])

  useEffect(() => {
    if (twitterDirectConnect) { // If user is not connected to twitter then dispatch action to get twitter oauth token
      dispatch({ type: 'INIT_STATE', state: 'twitterDirectConnect', data: false })
      dispatch(twitterConnectStep1())
    }

    if (twitchDirectConnect) { // If user is not connected to twitch then open oauth connection directly
      dispatch({ type: 'INIT_STATE', state: 'twitchDirectConnect', data: false })
      if (company) {
        window.open(TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY, '_blank')
      } else {
        window.open(TWITCH_OAUTH_TOKEN_URL_FOR_USER, '_blank')
      }
    }

    if (youtubeDirectConnect) { // If user is not connected to youtube then dispatch action to get youtube oauth token url
      dispatch({ type: 'INIT_STATE', state: 'youtubeDirectConnect', data: false })
      dispatch(youtubeConnectStep1(company))
    }

    if (instagramDirectConnect) { // If user is not connected to instagram then open oauth connection directly
      dispatch({ type: 'INIT_STATE', state: 'instagramDirectConnect', data: false })
      window.open(INSTAGRAM_OAUTH_TOKEN_URL, '_blank')
    }
  }, [twitterDirectConnect, twitchDirectConnect, youtubeDirectConnect, instagramDirectConnect])

  useEffect(() => {
    if (instagram_follow_validation && action && !_.isEmpty(action.social_action)) {
      window.open(`https://instagram.com/${action.social_action[2].instagram_profile_url}`, '_blank')
    }
    if (instagram_like_validation && action && !_.isEmpty(action.social_action)) {
      window.open(`https://instagram.com/p/${action.social_action[2].instagram_publication_url}`, '_blank')
    }
  }, [
    instagram_follow_validation,
    instagram_like_validation
  ])

  useEffect(() => {
    // Extract social action data from campaign data
    setAction(campaignData.action_participate[0])

    setTotalEntriesNum(getTotalEntries(campaignData))

  }, [campaignData])

  useEffect(() => {
    if (CAMPAIGN_PARTICIPATE_SUCCESS) {
      // if campaign participation is success then open confirm modal
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CAMPAIGN_PARTICIPATE', data: false })
      setOpenConfirm(true)
    }
  }, [CAMPAIGN_PARTICIPATE_SUCCESS])

  useEffect(() => {
    if (confirmed_participation) {
      dispatch({ type: 'CAMPAIGN_INIT_STATE', state: 'confirmed_participation', data: false })
      setOpenConfirm(true)
    }
  }, [confirmed_participation])

  useEffect(() => {
    // Open social actions validation modal after click on social actions button
    if (OPEN_TWITTER_LIKE_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_LIKE_VALIDATION_MODAL', data: false })
      setOpenTwitterLikeModal(true)
    }
    if (OPEN_TWITTER_RETWEET_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_RETWEET_VALIDATION_MODAL', data: false })
      setOpenTwitterRetweetModal(true)
    }
    if (OPEN_TWITTER_COMMENT_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_COMMENT_VALIDATION_MODAL', data: false })
      setOpenTwitterCommentModal(true)
    }
    if (OPEN_TWITTER_FOLLOW_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_FOLLOW_VALIDATION_MODAL', data: false })
      setOpenTwitterFollowModal(true)
    }
    if (OPEN_TWITCH_FOLLOW_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITCH_FOLLOW_VALIDATION_MODAL', data: false })
      setOpenTwitchFollowModal(true)
    }
    if (OPEN_YOUTUBE_LIKE_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_YOUTUBE_LIKE_VALIDATION_MODAL', data: false })
      setOpenYoutubeLikeModal(true)
    }
    if (OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL', data: false })
      setOpenYoutubeCommentModal(true)
    }
    if (OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL', data: false })
      setOpenYoutubeFollowModal(true)
    }
  }, [
    OPEN_TWITTER_LIKE_VALIDATION_MODAL,
    OPEN_TWITTER_RETWEET_VALIDATION_MODAL,
    OPEN_TWITTER_COMMENT_VALIDATION_MODAL,
    OPEN_TWITTER_FOLLOW_VALIDATION_MODAL,
    OPEN_TWITCH_FOLLOW_VALIDATION_MODAL,
    OPEN_YOUTUBE_LIKE_VALIDATION_MODAL,
    OPEN_YOUTUBE_COMMENT_VALIDATION_MODAL,
    OPEN_YOUTUBE_FOLLOW_VALIDATION_MODAL
  ])

  const goToWinningDetail = (item, id) => {
    // Load prize data of campaign and open prize modal
    setOpenWinningDetailModal(true)
    dispatch(getWinningData(id, item.name))
  }

  const renderWinnings = () => {
    return (
      (campaignData.winnings || []).map((item, index) =>
        <div key={index} className="mt-3 color-blue font-size-11">
          <span className="pointer" onClick={() => goToWinningDetail(item, campaignData.pk)}>{`${item.number_of_people} - ${item.name}`}</span>
        </div>
      )
    )
  }

  const calcRemainingDates = () => {
    const currentDate = moment(Date.now())
    const endDate = moment(Date.parse(campaignData.end_date))

    const diff = endDate.diff(currentDate)
    const diffDuration = moment.duration(diff)

    return diffDuration.asDays() > 0 ? Math.round(diffDuration.asDays()) : 0
  }

  const handleOpenVideo = () => setOpenVideo(!openVideo)

  const openVideoModal = () => {
    setOpenVideo(true)
  }

  const videoEnded = () => {
    // if user has looked the video to the end then validate video cation
    dispatch(campaignParticipateVideo({ promotion_id: campaignData.pk }))
  }

  const onYoutubeVideoEnded = () => {
    dispatch(campaignParticipateYoutubeVideoValidation({ promotion_id: campaignData.pk }))
  }

  const handleOpenConfirm = () => setOpenConfirm(!openConfirm)

  const tryToOpenValidationModal = (socialName, actionType) => {
    if (socialName === 'twitter' && actionType === 'like') {
      dispatch(campaignParticipateTwitterLike({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'twitter' && actionType === 'retweet') {
      dispatch(campaignParticipateTwitterRetweet({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'twitter' && actionType === 'comment') {
      dispatch(campaignParticipateTwitterComment({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'twitter' && actionType === 'follow') {
      dispatch(campaignParticipateTwitterFollow({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'twitch' && actionType === 'follow') {
      dispatch(campaignParticipateTwitchFollow({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'instagram' && actionType === 'follow') {
      dispatch(campaignParticipateInstagramProfile({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'instagram' && actionType === 'like') {
      dispatch(campaignParticipateInstagramPublication({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'tiktok' && actionType === 'follow') {
      window.open(action.social_action[5].tiktok_profile_url, '_blank')
      dispatch(campaignParticipateTiktokProfile({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'tiktok' && actionType === 'like') {
      window.open(action.social_action[5].tiktok_publication_url, '_blank')
      dispatch(campaignParticipateTiktokPublication({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'video' && actionType === 'watch') {
      openVideoModal()
    }
    else if (socialName === 'website' && actionType === 'visit') {
      window.open(action.website.url.includes("http") ? action.website.url : `https://${action.website.url}`, '_blank')
      dispatch(campaignParticipateWebsite({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'facebook' && actionType === 'page') {
      window.open(action.social_action[0].facebook_page_url, '_blank')
      dispatch(campaignParticipateFacebookPage({ promotion_id: campaignData.pk, action: '' }))
    }
    else if (socialName === 'facebook' && actionType === 'post') {
      window.open(action.social_action[0].facebook_post_url, '_blank')
      dispatch(campaignParticipateFacebookPost({ promotion_id: campaignData.pk, action: '' }))
    }
    else if (socialName === 'facebook' && actionType === 'url') {
      window.open(action.social_action[0].facebook_url_url, '_blank')
      dispatch(campaignParticipateFacebookUrl({ promotion_id: campaignData.pk, action: '' }))
    }
    else if (socialName === 'youtube' && actionType === 'like') {
      dispatch(campaignParticipateYoutubeLike({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'youtube' && actionType === 'comment') {
      dispatch(campaignParticipateYoutubeComment({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'youtube' && actionType === 'follow') {
      dispatch(campaignParticipateYoutubeFollow({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'youtube' && actionType === 'video') {
      setIsYoutubeVideoClicked(true)
    }
  }

  const participatePoll = (val) => {
    dispatch(campaignParticipatePoll({ promotion_id: campaignData.pk, response: JSON.stringify(val) }))
  }

  const update = () => {
    var body = {
      promotion_id: match.params.id
    }
    dispatch(updateFavorite(body, 'campaign_detail'))
  }

  const participate = () => {
    var body = {
      promotion_id: campaignData.pk,
      social_actions: JSON.stringify(actionParams)
    }
    dispatch(campaignParticipate(body))
  }

  if (GET_CAMPAIGN_DATA_PROCESS) {
    return <LoadingPage />
  }

  return (
    <AppLayout>
      <CampaignHelmet />
      <Row className="mt-0 mt-sm-5">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row className="px-3 mt-5">
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{calcRemainingDates()}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.days')}</div>
            </Col>
            <Col className="px-0" style={{ borderRight: "1px solid #767b8378" }}>
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">
                {`${((campaignData.user_actions || {}).entries_user || 0)} / ${totalEntriesNum}`}
              </div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.entries')}</div>
            </Col>
            <Col className="px-0">
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{campaignData.number_of_participants || 0}</div>
              <div className="color-gray mt-2 text-center">{t('campaign_detail_page.participants')}</div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <div className="d-flex justify-content-center">
                <img src={campaignData.campaign_image ? campaignData.campaign_image : images.campaign} width="100%" style={{ maxHeight: 500, objectFit: 'contain' }} alt="" />
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
              <div>
                <Link to={`/company/${campaignData.company_id}/`}>
                  <img src={campaignData.company_logo ? campaignData.company_logo : images.profile_img} alt="" />
                </Link>
              </div>
            </Col>
            <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
              <div className="promotion-list-item-title">{campaignData.campaign_name}</div>
              <div className="mt-3 color-blue font-weight-bold">
                <Link to={`/company/${campaignData.company_id}/`}>
                  <span>
                    {campaignData.company_name}
                  </span>
                </Link>
              </div>
              <div className="d-flex justify-content-between">
                <div style={{ width: "70%" }} className="promotion-list-item-text">{campaignData.long_description}</div>
                {(token && !company) && (
                  <div className="promotion-list-item-star" onClick={update}>
                    <img src={campaignData.favorite ? images.trans_star_favorite : images.trans_star} alt="" />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <Row className="my-5">
            <Col>
              <div className="pb-5" style={{ borderBottom: '2px solid #F3F4F7' }}>
                <div className="color-blue font-size-14 font-weight-bold">{t('campaign_detail_page.the_prize')}</div>
                <div className="mt-3 color-gray font-size-11">{t('campaign_detail_page.prize_description')}</div>
                {renderWinnings()}
              </div>
            </Col>
          </Row>
          {token && !company && userProfile.phone_number_verification &&
            <Row className="mb-5">
              <Col className="font-size-11 color-gray">
                <div className="d-md-flex d-block justify-content-between mb-2">
                  <div>
                    {t('campaign_detail_page.chance_winning_prize')}
                  </div>
                  <div>
                    {campaignData.remaining_actions?.remaining_mandatory_action > 0
                      ?
                      `${campaignData.remaining_actions.remaining_mandatory_action} ${t('campaign_detail_page.mandatory_action_left')}`
                      :
                      campaignData.remaining_actions?.remaining_normal_action > 0
                        ?
                        `${campaignData.remaining_actions.remaining_normal_action} ${t('campaign_detail_page.action_left')}`
                        :
                        ''
                    }
                  </div>
                </div>
                <Progress
                  striped
                  animated
                  value={campaignData.user_actions?.entries_user * 100 / totalEntriesNum}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[0].facebook_page) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.facebook_page.title')}
                  text={t('campaign_detail_page.facebook_page.text')}
                  socialName="facebook"
                  actionType="page"
                  mandatory={action.social_action[0].facebook_page_mandatory}
                  entries={action.social_action[0].facebook_page_entries}
                  didAction={(campaignData.user_actions || {}).facebook_page}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                  facebookActionUrl={action.social_action[0].facebook_page_url}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[0].facebook_post) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.facebook_post.title')}
                  text={t('campaign_detail_page.facebook_post.text')}
                  socialName="facebook"
                  actionType="post"
                  mandatory={action.social_action[0].facebook_post_mandatory}
                  entries={action.social_action[0].facebook_post_entries}
                  didAction={(campaignData.user_actions || {}).facebook_post}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                  facebookActionUrl={action.social_action[0].facebook_post_url}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[0].facebook_url) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.facebook_url.title')}
                  text={t('campaign_detail_page.facebook_url.text')}
                  socialName="facebook"
                  actionType="url"
                  mandatory={action.social_action[0].facebook_url_mandatory}
                  entries={action.social_action[0].facebook_url_entries}
                  didAction={(campaignData.user_actions || {}).facebook_url}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                  facebookActionUrl={action.social_action[0].facebook_url_url}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[1].youtube_like) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.youtube_like.title')}
                  text={t('campaign_detail_page.youtube_like.text')}
                  socialName="youtube"
                  actionType="like"
                  mandatory={action.social_action[1].youtube_like_mandatory}
                  entries={action.social_action[1].youtube_like_entries}
                  didAction={(campaignData.user_actions || {}).youtube_like}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[1].youtube_follow) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.youtube_follow.title')}
                  text={t('campaign_detail_page.youtube_follow.text')}
                  socialName="youtube"
                  actionType="follow"
                  mandatory={action.social_action[1].youtube_follow_mandatory}
                  entries={action.social_action[1].youtube_follow_entries}
                  didAction={(campaignData.user_actions || {}).youtube_follow}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[1].youtube_comment) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.youtube_comment.title')}
                  text={t('campaign_detail_page.youtube_comment.text')}
                  socialName="youtube"
                  actionType="comment"
                  mandatory={action.social_action[1].youtube_comment_mandatory}
                  entries={action.social_action[1].youtube_comment_entries}
                  didAction={(campaignData.user_actions || {}).youtube_comment}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[1].youtube_video) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.youtube_video.title')}
                  text={t('campaign_detail_page.youtube_video.text')}
                  socialName="youtube"
                  actionType="video"
                  mandatory={action.social_action[1].youtube_video_mandatory}
                  entries={action.social_action[1].youtube_video_entries}
                  didAction={(campaignData.user_actions || {}).youtube_video}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                  youtubeVideoId={action.social_action[1].youtube_video_id}
                  isYoutubeVideoClicked={isYoutubeVideoClicked}
                  onYoutubeVideoEnded={onYoutubeVideoEnded}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[2].instagram_profile) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.instagram_follow.title')}
                  text={t('campaign_detail_page.instagram_follow.text')}
                  socialName="instagram"
                  actionType="follow"
                  mandatory={action.social_action[2].instagram_profile_mandatory}
                  entries={action.social_action[2].instagram_profile_entries}
                  didAction={(campaignData.user_actions || {}).instagram_profile}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[2].instagram_publication) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.instagram_like.title')}
                  text={t('campaign_detail_page.instagram_like.text')}
                  socialName="instagram"
                  actionType="like"
                  mandatory={action.social_action[2].instagram_publication_mandatory}
                  entries={action.social_action[2].instagram_publication_entries}
                  didAction={(campaignData.user_actions || {}).instagram_publication}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[3].twitter_like) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.twitter_like.title')}
                  text={t('campaign_detail_page.twitter_like.text')}
                  socialName="twitter"
                  actionType="like"
                  mandatory={action.social_action[3].twitter_like_mandatory}
                  entries={action.social_action[3].twitter_like_entries}
                  didAction={(campaignData.user_actions || {}).twitter_like}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[3].twitter_follow) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.twitter_follow.title')}
                  text={t('campaign_detail_page.twitter_follow.text')}
                  socialName="twitter"
                  actionType="follow"
                  mandatory={action.social_action[3].twitter_follow_mandatory}
                  entries={action.social_action[3].twitter_follow_entries}
                  didAction={(campaignData.user_actions || {}).twitter_follow}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[3].twitter_tweet) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.twitter_tweet.title')}
                  text={t('campaign_detail_page.twitter_tweet.text')}
                  socialName="twitter"
                  actionType="comment"
                  mandatory={action.social_action[3].twitter_tweet_mandatory}
                  entries={action.social_action[3].twitter_tweet_entries}
                  didAction={(campaignData.user_actions || {}).twitter_tweet}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[3].twitter_retweet) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.twitter_retweet.title')}
                  text={t('campaign_detail_page.twitter_retweet.text')}
                  socialName="twitter"
                  actionType="retweet"
                  mandatory={action.social_action[3].twitter_retweet_mandatory}
                  entries={action.social_action[3].twitter_retweet_entries}
                  didAction={(campaignData.user_actions || {}).twitter_retweet}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[4].twitch_follow) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.twitch_follow.title')}
                  text={t('campaign_detail_page.twitch_follow.text')}
                  socialName="twitch"
                  actionType="follow"
                  mandatory={action.social_action[4].twitch_follow_mandatory}
                  entries={action.social_action[4].twitch_follow_entries}
                  didAction={(campaignData.user_actions || {}).twitch_follow}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[5].tiktok_profile) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_follow.title')}
                  text={t('campaign_detail_page.tiktok_follow.text')}
                  socialName="tiktok"
                  actionType="follow"
                  mandatory={action.social_action[5].tiktok_profile_mandatory}
                  entries={action.social_action[5].tiktok_profile_entries}
                  didAction={(campaignData.user_actions || {}).tiktok_profile}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {(action.social_action?.[5].tiktok_publication) &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.tiktok_like.title')}
                  text={t('campaign_detail_page.tiktok_like.text')}
                  socialName="tiktok"
                  actionType="like"
                  mandatory={action.social_action[5].tiktok_publication_mandatory}
                  entries={action.social_action[5].tiktok_publication_entries}
                  didAction={(campaignData.user_actions || {}).tiktok_publication}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {action.video &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.video.title')}
                  text={t('campaign_detail_page.video.text')}
                  socialName="video"
                  actionType="watch"
                  mandatory={action.video.mandatory}
                  entries={action.video.entries}
                  didAction={(campaignData.user_actions || {}).video}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {action.website &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanel
                  title={t('campaign_detail_page.website.title')}
                  text={action.website.url}
                  socialName="website"
                  actionType="visit"
                  mandatory={action.website.mandatory}
                  entries={action.website.entries}
                  didAction={(campaignData.user_actions || {}).website}
                  tryToOpenValidationModal={tryToOpenValidationModal}
                />
              </Col>
            </Row>
          }
          {action.poll &&
            <Row className="mb-4 mt-4">
              <Col style={{ paddingLeft: 40 }}>
                <CustomCollapsePanelForPoll
                  title={action.poll.question}
                  text={t('campaign_detail_page.poll.text')}
                  multiple_choice={action.poll.multiple_choices}
                  responses={action.poll.responses}
                  mandatory={action.poll.mandatory}
                  entries={action.poll.entries}
                  didAction={(campaignData.user_actions || {}).poll}
                  participatePoll={participatePoll}
                />
              </Col>
            </Row>
          }
          <Row className="justify-content-center mb-4">
            {campaignData.participation_validated
              ?
              <Tooltip title={t('campaign_detail_page.participation_validated')} color='#0aa53e'>
                <Button
                  type="primary"
                  className="ant-green-btn promotion-list-item-btn"
                  onClick={null}
                >
                  {t('button_group.participation_validated')}
                </Button>
              </Tooltip>
              :
              <Button
                type={campaignData.close_promotion ? "danger" : "primary"}
                className={campaignData.close_promotion ? "ant-red-btn promotion-list-item-btn" : "ant-blue-btn promotion-list-item-btn"}
                onClick={campaignData.close_promotion ? null : participate}
                loading={CAMPAIGN_PARTICIPATE_PROCESS}
              >
                {!CAMPAIGN_PARTICIPATE_PROCESS &&
                  campaignData.close_promotion ? t('button_group.promotion_ended') : t('button_group.participate')
                }
              </Button>
            }
          </Row>
        </Col>
      </Row>

      <ParticipateConfirmModal
        open={openConfirm}
        onToggle={handleOpenConfirm}
        promotion_id={campaignData.pk}
        company_name={campaignData.company_name}
      />
      <VideoPlayerModal
        open={openVideo}
        onToggle={handleOpenVideo}
        videoEnded={videoEnded}
      />
      <WinningDetailModal
        open={openWinningDetailModal}
        onToggle={() => setOpenWinningDetailModal(!openWinningDetailModal)}
      />
      <TwitterLikeValidationModal
        open={openTwitterLikeModal}
        onToggle={() => setOpenTwitterLikeModal(!openTwitterLikeModal)}
        closeModal={() => setOpenTwitterLikeModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterRetweetValidationModal
        open={openTwitterRetweetModal}
        onToggle={() => setOpenTwitterRetweetModal(!openTwitterRetweetModal)}
        closeModal={() => setOpenTwitterRetweetModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterCommentValidationModal
        open={openTwitterCommentModal}
        onToggle={() => setOpenTwitterCommentModal(!openTwitterCommentModal)}
        closeModal={() => setOpenTwitterCommentModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterFollowValidationModal
        open={openTwitterFollowModal}
        onToggle={() => setOpenTwitterFollowModal(!openTwitterFollowModal)}
        closeModal={() => setOpenTwitterFollowModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitchFollowValidationModal
        open={openTwitchFollowModal}
        onToggle={() => setOpenTwitchFollowModal(!openTwitchFollowModal)}
        closeModal={() => setOpenTwitchFollowModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeLikeValidationModal
        open={openYoutubeLikeModal}
        onToggle={() => setOpenYoutubeLikeModal(!openYoutubeLikeModal)}
        closeModal={() => setOpenYoutubeLikeModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeCommentValidationModal
        open={openYoutubeCommentModal}
        onToggle={() => setOpenYoutubeCommentModal(!openYoutubeCommentModal)}
        closeModal={() => setOpenYoutubeCommentModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeFollowValidationModal
        open={openYoutubeFollowModal}
        onToggle={() => setOpenYoutubeFollowModal(!openYoutubeFollowModal)}
        closeModal={() => setOpenYoutubeFollowModal(false)}
        promotion_id={campaignData.pk}
      />
    </AppLayout>
  )
}

export default withRouter(CampaignDetail)
