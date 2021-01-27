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
import ParticipateConfirmModal from '../components/modals/ParticipateConfirmModal'
import TwitterLikeValidationModal from '../components/modals/ActionValidationModals/TwitterLikeValidationModal'
import TwitterRetweetValidationModal from '../components/modals/ActionValidationModals/TwitterRetweetValidationModal'
import TwitterTweetValidationModal from '../components/modals/ActionValidationModals/TwitterTweetValidationModal'
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
  campaignParticipateTwitterTweet,
  campaignParticipateTwitterFollow,
  campaignParticipateTwitchFollow,
  campaignParticipatePoll,
  campaignParticipateWebsite,
  campaignParticipateInstagramProfile,
  campaignParticipateInstagramPublication,
  campaignParticipateInstagramComment,
  campaignParticipateTiktokProfile,
  campaignParticipateTiktokPublication,
  campaignParticipateFacebookPage,
  campaignParticipateFacebookPost,
  campaignParticipateFacebookUrl,
  getCampaignRules
} from '../actions/campaign'

import { twitterConnectStep1, youtubeConnectStep1 } from '../actions/userInfo'

import { printPreview } from '../utils/pdf'
import { getTotalEntries, getSocialUserActions } from '../utils/campaign'
import {
  TWITCH_OAUTH_TOKEN_URL_FOR_COMPANY,
  TWITCH_OAUTH_TOKEN_URL_FOR_USER,
  INSTAGRAM_OAUTH_TOKEN_URL
} from '../utils/constants'

import { useTranslation } from 'react-i18next'

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
  const GET_CAMPAIGN_RULES_SUCCESS = useSelector(state => state.userInfo.SUCCESS_GET_CAMPAIGN_RULES)
  const GET_CAMPAIGN_RULES_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_RULES)
  const campaignRules = useSelector(state => state.campaign.campaignRules)

  const OPEN_TWITTER_LIKE_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_LIKE_VALIDATION_MODAL)
  const OPEN_TWITTER_RETWEET_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_RETWEET_VALIDATION_MODAL)
  const OPEN_TWITTER_COMMENT_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_COMMENT_VALIDATION_MODAL)
  const OPEN_TWITTER_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_FOLLOW_VALIDATION_MODAL)
  const OPEN_TWITTER_TWEET_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_TWEET_VALIDATION_MODAL)
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

  const [openConfirm, setOpenConfirm] = useState(false)
  const [openWinningDetailModal, setOpenWinningDetailModal] = useState(false)
  const [openTwitterLikeModal, setOpenTwitterLikeModal] = useState(false)
  const [openTwitterRetweetModal, setOpenTwitterRetweetModal] = useState(false)
  const [openTwitterCommentModal, setOpenTwitterCommentModal] = useState(false)
  const [openTwitterTweetModal, setOpenTwitterTweetModal] = useState(false)
  const [openTwitterFollowModal, setOpenTwitterFollowModal] = useState(false)
  const [openTwitchFollowModal, setOpenTwitchFollowModal] = useState(false)
  const [openYoutubeLikeModal, setOpenYoutubeLikeModal] = useState(false)
  const [openYoutubeCommentModal, setOpenYoutubeCommentModal] = useState(false)
  const [openYoutubeFollowModal, setOpenYoutubeFollowModal] = useState(false)

  const [isYoutubeVideoClicked, setIsYoutubeVideoClicked] = useState(false)

  const [selectedPk, setSelectePk] = useState(null)

  useEffect(() => {
    // Load campaign data after render
    document.title = "Campaign Detail"
    var body = {
      token: token
    }
    dispatch(getCampaignData(match.params.id, body))
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
    if (CAMPAIGN_PARTICIPATE_SUCCESS) {
      // if campaign participation is success then open confirm modal
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CAMPAIGN_PARTICIPATE', data: false })
      setOpenConfirm(true)
    }
    if (confirmed_participation) {
      dispatch({ type: 'CAMPAIGN_INIT_STATE', state: 'confirmed_participation', data: false })
      setOpenConfirm(true)
    }
    if (GET_CAMPAIGN_RULES_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_GET_CAMPAIGN_RULES', data: false })
      printPreview(campaignRules)
    }
  }, [CAMPAIGN_PARTICIPATE_SUCCESS, confirmed_participation, GET_CAMPAIGN_RULES_SUCCESS])

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
    if (OPEN_TWITTER_TWEET_VALIDATION_MODAL) {
      dispatch({ type: 'INIT_STATE', state: 'OPEN_TWITTER_TWEET_VALIDATION_MODAL', data: false })
      setOpenTwitterTweetModal(true)
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
    OPEN_TWITTER_TWEET_VALIDATION_MODAL,
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

  const onYoutubeVideoEnded = (pk) => {
    dispatch(campaignParticipateYoutubeVideoValidation({ promotion_id: campaignData.pk }, pk))
  }

  const handleOpenConfirm = () => setOpenConfirm(!openConfirm)

  const tryToOpenValidationModal = (props) => {
    const { socialName, actionType, pk } = props

    setSelectePk(pk)

    if (socialName === 'twitter' && actionType === 'like') {
      dispatch(campaignParticipateTwitterLike({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'twitter' && actionType === 'retweet') {
      dispatch(campaignParticipateTwitterRetweet({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'twitter' && actionType === 'comment_tweet') {
      dispatch(campaignParticipateTwitterComment({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'twitter' && actionType === 'tweet') {
      dispatch(campaignParticipateTwitterTweet({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'twitter' && actionType === 'follow') {
      dispatch(campaignParticipateTwitterFollow({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'twitch' && actionType === 'follow') {
      dispatch(campaignParticipateTwitchFollow({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'instagram' && actionType === 'follow') {
      const { instagram_follow_url } = props
      dispatch(campaignParticipateInstagramProfile({ promotion_id: campaignData.pk }, pk, instagram_follow_url))
    }
    else if (socialName === 'instagram' && actionType === 'like') {
      const { instagram_like_url } = props
      dispatch(campaignParticipateInstagramPublication({ promotion_id: campaignData.pk }, pk, instagram_like_url))
    }
    else if (socialName === 'instagram' && actionType === 'comment') {
      dispatch(campaignParticipateInstagramComment({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'tiktok' && actionType === 'follow') {
      const { tiktok_follow_url } = props
      window.open(tiktok_follow_url, '_blank')
      dispatch(campaignParticipateTiktokProfile({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'tiktok' && actionType === 'like') {
      const { tiktok_like_url } = props
      window.open(tiktok_like_url, '_blank')
      dispatch(campaignParticipateTiktokPublication({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'website' && actionType === 'visit') {
      const { website_url } = props
      window.open(website_url.includes("http") ? website_url : `https://${website_url}`, '_blank')
      dispatch(campaignParticipateWebsite({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'facebook' && actionType === 'page') {
      const { facebookActionUrl } = props
      window.open(facebookActionUrl, '_blank')
      dispatch(campaignParticipateFacebookPage({ promotion_id: campaignData.pk, action: '' }, pk))
    }
    else if (socialName === 'facebook' && actionType === 'post') {
      const { facebookActionUrl } = props
      window.open(facebookActionUrl, '_blank')
      dispatch(campaignParticipateFacebookPost({ promotion_id: campaignData.pk, action: '' }, pk))
    }
    else if (socialName === 'facebook' && actionType === 'url') {
      const { facebookActionUrl } = props
      window.open(facebookActionUrl, '_blank')
      dispatch(campaignParticipateFacebookUrl({ promotion_id: campaignData.pk, action: '' }, pk))
    }
    else if (socialName === 'youtube' && actionType === 'like') {
      dispatch(campaignParticipateYoutubeLike({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'youtube' && actionType === 'comment') {
      dispatch(campaignParticipateYoutubeComment({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'youtube' && actionType === 'follow') {
      dispatch(campaignParticipateYoutubeFollow({ promotion_id: campaignData.pk }, pk))
    }
    else if (socialName === 'youtube' && actionType === 'video') {
      setIsYoutubeVideoClicked(true)
    }
  }

  const participatePoll = (answers, pk) => {
    dispatch(campaignParticipatePoll({ promotion_id: campaignData.pk, response: JSON.stringify(answers) }, pk))
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
      social_actions: JSON.stringify([])
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
                {`${((campaignData.user_actions || {}).entries_user || 0)} / ${getTotalEntries(campaignData.action_participate)}`}
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
                <div className="mt-3 color-blue font-size-11">
                  <span
                    className="pointer"
                    onClick={() => dispatch(getCampaignRules(campaignData.pk))}
                  >
                    {GET_CAMPAIGN_RULES_PROCESS ? t('create_campaign_page.loading') : t('create_campaign_page.rules')}
                  </span>
                </div>
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
                  value={campaignData.user_actions?.entries_user * 100 / getTotalEntries(campaignData.action_participate)}
                />
              </Col>
            </Row>
          }
          {!_.isEmpty(campaignData.action_participate) &&
            <React.Fragment>
              {campaignData.action_participate.facebook.map(action => {
                if (action.action_type === 'facebook_page') {
                  return (
                    <Row key={`facebook-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.facebook_page.title')}
                          text={t('campaign_detail_page.facebook_page.text')}
                          socialName="facebook"
                          actionType="page"
                          mandatory={action.facebook_page_mandatory}
                          entries={action.facebook_page_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'facebook', action.pk, 'facebook_page')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                          facebookActionUrl={action.facebook_page_url}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.action_type === 'facebook_post') {
                  return (
                    <Row key={`facebook-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.facebook_post.title')}
                          text={t('campaign_detail_page.fa cebook_post.text')}
                          socialName="facebook"
                          actionType="post"
                          mandatory={action.facebook_post_mandatory}
                          entries={action.facebook_post_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'facebook', action.pk, 'facebook_post')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                          facebookActionUrl={action.facebook_post_url}
                        />
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row key={`facebook-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.facebook_url.title')}
                          text={t('campaign_detail_page.facebook_url.text')}
                          socialName="facebook"
                          actionType="url"
                          mandatory={action.facebook_url_mandatory}
                          entries={action.facebook_url_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'facebook', action.pk, 'facebook_url')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                          facebookActionUrl={action.facebook_url_url}
                        />
                      </Col>
                    </Row>
                  )
                }
              })}
              {campaignData.action_participate.youtube.map(action => {
                if (action.action_type === 'youtube_like') {
                  return (
                    <Row key={`youtube-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.youtube_like.title')}
                          text={t('campaign_detail_page.youtube_like.text')}
                          socialName="youtube"
                          actionType="like"
                          mandatory={action.youtube_like_mandatory}
                          entries={action.youtube_like_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'youtube', action.pk, 'youtube_like')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.action_type === 'youtube_follow') {
                  return (
                    <Row key={`youtube-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.youtube_follow.title')}
                          text={t('campaign_detail_page.youtube_follow.text')}
                          socialName="youtube"
                          actionType="follow"
                          mandatory={action.youtube_follow_mandatory}
                          entries={action.youtube_follow_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'youtube', action.pk, 'youtube_follow')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.action_type === 'youtube_comment') {
                  return (
                    <Row key={`youtube-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.youtube_comment.title')}
                          text={t('campaign_detail_page.youtube_comment.text')}
                          socialName="youtube"
                          actionType="comment"
                          mandatory={action.youtube_comment_mandatory}
                          entries={action.youtube_comment_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'youtube', action.pk, 'youtube_comment')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.youtube_video.title')}
                          text={t('campaign_detail_page.youtube_video.text')}
                          socialName="youtube"
                          actionType="video"
                          mandatory={action.youtube_video_mandatory}
                          entries={action.youtube_video_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'youtube', action.pk, 'youtube_video')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                          youtubeVideoId={action.youtube_video_id}
                          isYoutubeVideoClicked={isYoutubeVideoClicked}
                          onYoutubeVideoEnded={onYoutubeVideoEnded}
                        />
                      </Col>
                    </Row>
                  )
                }
              })}
              {campaignData.action_participate.instagram.map(action => {
                if (action.instagram_follow) {
                  return (
                    <Row key={`instagram-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.instagram_follow.title')}
                          text={t('campaign_detail_page.instagram_follow.text')}
                          socialName="instagram"
                          actionType="follow"
                          mandatory={action.instagram_follow_mandatory}
                          entries={action.instagram_follow_entries}
                          instagram_follow_url={`https://instagram.com/${action.instagram_follow_url}`}
                          didAction={getSocialUserActions(campaignData.user_actions, 'instagram', action.pk, 'instagram_follow')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.instagram_like) {
                  return (
                    <Row key={`instagram-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.instagram_like.title')}
                          text={t('campaign_detail_page.instagram_like.text')}
                          socialName="instagram"
                          actionType="like"
                          mandatory={action.instagram_like_mandatory}
                          entries={action.instagram_like_entries}
                          instagram_like_url={`https://instagram.com/p/${action.instagram_like_url}`}
                          didAction={getSocialUserActions(campaignData.user_actions, 'instagram', action.pk, 'instagram_like')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row key={`instagram-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.instagram_comment.title')}
                          text={t('campaign_detail_page.instagram_comment.text')}
                          socialName="instagram"
                          actionType="comment"
                          mandatory={action.instagram_comment_mandatory}
                          entries={action.instagram_comment_entries}
                          // instagram_like_url={`https://instagram.com/p/${action.instagram_like_url}`}
                          didAction={getSocialUserActions(campaignData.user_actions, 'instagram', action.pk, 'instagram_comment')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                }
              })}
              {campaignData.action_participate.twitter.map(action => {
                if (action.twitter_like) {
                  return (
                    <Row key={`twitter-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.twitter_like.title')}
                          text={t('campaign_detail_page.twitter_like.text')}
                          socialName="twitter"
                          actionType="like"
                          mandatory={action.twitter_like_mandatory}
                          entries={action.twitter_like_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'twitter', action.pk, 'twitter_like')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.twitter_follow) {
                  return (
                    <Row key={`twitter-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.twitter_follow.title')}
                          text={t('campaign_detail_page.twitter_follow.text')}
                          socialName="twitter"
                          actionType="follow"
                          mandatory={action.twitter_follow_mandatory}
                          entries={action.twitter_follow_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'twitter', action.pk, 'twitter_follow')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.twitter_tweet) {
                  return (
                    <Row key={`twitter-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.twitter_tweet.title')}
                          text={t('campaign_detail_page.twitter_tweet.text')}
                          socialName="twitter"
                          actionType="tweet"
                          mandatory={action.twitter_tweet_mandatory}
                          entries={action.twitter_tweet_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'twitter', action.pk, 'twitter_tweet')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else if (action.twitter_retweet) {
                  return (
                    <Row key={`twitter-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.twitter_retweet.title')}
                          text={t('campaign_detail_page.twitter_retweet.text')}
                          socialName="twitter"
                          actionType="retweet"
                          mandatory={action.twitter_retweet_mandatory}
                          entries={action.twitter_retweet_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'twitter', action.pk, 'twitter_retweet')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row key={`twitter-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.twitter_comment.title')}
                          text={t('campaign_detail_page.twitter_comment.text')}
                          socialName="twitter"
                          actionType="comment_tweet"
                          mandatory={action.twitter_comment_tweet_mandatory}
                          entries={action.twitter_comment_tweet_entries}
                          didAction={getSocialUserActions(campaignData.user_actions, 'twitter', action.pk, 'twitter_comment_tweet')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                }
              })}
              {campaignData.action_participate.twitch.map(action => (
                <Row key={`twitch-${action.pk}`} className="mb-4 mt-4">
                  <Col style={{ paddingLeft: 40 }}>
                    <CustomCollapsePanel
                      pk={action.pk}
                      title={t('campaign_detail_page.twitch_follow.title')}
                      text={t('campaign_detail_page.twitch_follow.text')}
                      socialName="twitch"
                      actionType="follow"
                      mandatory={action.twitch_follow_mandatory}
                      entries={action.twitch_follow_entries}
                      didAction={getSocialUserActions(campaignData.user_actions, 'twitch', action.pk, 'twitch_follow')}
                      tryToOpenValidationModal={tryToOpenValidationModal}
                    />
                  </Col>
                </Row>
              ))}
              {campaignData.action_participate.tiktok.map(action => {
                if (action.tiktok_like) {
                  return (
                    <Row key={`tiktok-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.tiktok_like.title')}
                          text={t('campaign_detail_page.tiktok_like.text')}
                          socialName="tiktok"
                          actionType="like"
                          mandatory={action.tiktok_like_mandatory}
                          entries={action.tiktok_like_entries}
                          tiktok_like_url={action.tiktok_like_url}
                          didAction={getSocialUserActions(campaignData.user_actions, 'tiktok', action.pk, 'tiktok_like')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                } else {
                  return (
                    <Row key={`tiktok-${action.pk}`} className="mb-4 mt-4">
                      <Col style={{ paddingLeft: 40 }}>
                        <CustomCollapsePanel
                          pk={action.pk}
                          title={t('campaign_detail_page.tiktok_follow.title')}
                          text={t('campaign_detail_page.tiktok_follow.text')}
                          socialName="tiktok"
                          actionType="follow"
                          mandatory={action.tiktok_follow_mandatory}
                          entries={action.tiktok_follow_entries}
                          tiktok_follow_url={action.tiktok_follow_url}
                          didAction={getSocialUserActions(campaignData.user_actions, 'tiktok', action.pk, 'tiktok_follow')}
                          tryToOpenValidationModal={tryToOpenValidationModal}
                        />
                      </Col>
                    </Row>
                  )
                }
              })}
              {campaignData.action_participate.website.map(action => (
                <Row key={`website-${action.pk}`} className="mb-4 mt-4">
                  <Col style={{ paddingLeft: 40 }}>
                    <CustomCollapsePanel
                      pk={action.pk}
                      title={t('campaign_detail_page.website.title')}
                      text={action.url}
                      socialName="website"
                      actionType="visit"
                      mandatory={action.mandatory}
                      entries={action.entries}
                      website_url={action.url}
                      didAction={getSocialUserActions(campaignData.user_actions, 'website', action.pk, 'website')}
                      tryToOpenValidationModal={tryToOpenValidationModal}
                    />
                  </Col>
                </Row>
              ))}
              {campaignData.action_participate.poll.map(action => (
                <Row key={`poll-${action.pk}`} className="mb-4 mt-4">
                  <Col style={{ paddingLeft: 40 }}>
                    <CustomCollapsePanelForPoll
                      pk={action.pk}
                      title={action.question}
                      text={t('campaign_detail_page.poll.text')}
                      multiple_choice={action.multiple_choices}
                      responses={action.responses}
                      mandatory={action.mandatory}
                      entries={action.entries}
                      didAction={getSocialUserActions(campaignData.user_actions, 'poll', action.pk, 'poll')}
                      participatePoll={participatePoll}
                    />
                  </Col>
                </Row>
              ))}
            </React.Fragment>
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
      <WinningDetailModal
        open={openWinningDetailModal}
        onToggle={() => setOpenWinningDetailModal(!openWinningDetailModal)}
      />
      <TwitterLikeValidationModal
        pk={selectedPk}
        open={openTwitterLikeModal}
        onToggle={() => setOpenTwitterLikeModal(!openTwitterLikeModal)}
        closeModal={() => setOpenTwitterLikeModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterRetweetValidationModal
        pk={selectedPk}
        open={openTwitterRetweetModal}
        onToggle={() => setOpenTwitterRetweetModal(!openTwitterRetweetModal)}
        closeModal={() => setOpenTwitterRetweetModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterTweetValidationModal
        pk={selectedPk}
        open={openTwitterTweetModal}
        onToggle={() => setOpenTwitterTweetModal(!openTwitterTweetModal)}
        closeModal={() => setOpenTwitterTweetModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterCommentValidationModal
        pk={selectedPk}
        open={openTwitterCommentModal}
        onToggle={() => setOpenTwitterCommentModal(!openTwitterCommentModal)}
        closeModal={() => setOpenTwitterCommentModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitterFollowValidationModal
        pk={selectedPk}
        open={openTwitterFollowModal}
        onToggle={() => setOpenTwitterFollowModal(!openTwitterFollowModal)}
        closeModal={() => setOpenTwitterFollowModal(false)}
        promotion_id={campaignData.pk}
      />
      <TwitchFollowValidationModal
        pk={selectedPk}
        open={openTwitchFollowModal}
        onToggle={() => setOpenTwitchFollowModal(!openTwitchFollowModal)}
        closeModal={() => setOpenTwitchFollowModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeLikeValidationModal
        pk={selectedPk}
        open={openYoutubeLikeModal}
        onToggle={() => setOpenYoutubeLikeModal(!openYoutubeLikeModal)}
        closeModal={() => setOpenYoutubeLikeModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeCommentValidationModal
        pk={selectedPk}
        open={openYoutubeCommentModal}
        onToggle={() => setOpenYoutubeCommentModal(!openYoutubeCommentModal)}
        closeModal={() => setOpenYoutubeCommentModal(false)}
        promotion_id={campaignData.pk}
      />
      <YoutubeFollowValidationModal
        pk={selectedPk}
        open={openYoutubeFollowModal}
        onToggle={() => setOpenYoutubeFollowModal(!openYoutubeFollowModal)}
        closeModal={() => setOpenYoutubeFollowModal(false)}
        promotion_id={campaignData.pk}
      />
    </AppLayout>
  )
}

export default withRouter(CampaignDetail)
