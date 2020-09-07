import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Progress } from 'reactstrap'
import { Button } from 'antd'
import moment from 'moment'
import AppLayout from '../components/layouts/AppLayout'
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

import LoadingPage from '../components/common/LoadingPage'

import {
  campaignParticipate,
  getCampaignData,
  getWinningData,
  updateFavorite,
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

import { twitterConnectStep1 } from '../actions/userInfo'

import { useTranslation } from 'react-i18next'

let actionParams = []

function CampaignDetail(props) {
  const { t } = useTranslation()

  const { match } = props

  const campaignData = useSelector(state => state.campaign.campaignData)
  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)
  const userProfile = useSelector(state => state.userInfo.userProfile)
  const dispatch = useDispatch()

  const GET_CAMPAIGN_DATA_PROCESS = useSelector(state => state.userInfo.GET_CAMPAIGN_DATA)
  const CAMPAIGN_PARTICIPATE_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE)
  const CAMPAIGN_PARTICIPATE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CAMPAIGN_PARTICIPATE)

  const OPEN_TWITTER_LIKE_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_LIKE_VALIDATION_MODAL)
  const OPEN_TWITTER_RETWEET_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_RETWEET_VALIDATION_MODAL)
  const OPEN_TWITTER_COMMENT_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_COMMENT_VALIDATION_MODAL)
  const OPEN_TWITTER_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITTER_FOLLOW_VALIDATION_MODAL)
  const OPEN_TWITCH_FOLLOW_VALIDATION_MODAL = useSelector(state => state.userInfo.OPEN_TWITCH_FOLLOW_VALIDATION_MODAL)

  const twitter_oauth_token = useSelector(state => state.userInfo.twitter_oauth_token)
  const twitterDirectConnect = useSelector(state => state.userInfo.twitterDirectConnect)

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
  }, [twitter_oauth_token])

  useEffect(() => {
    if (twitterDirectConnect) { // If user is not connected to twitter then dispatch action to get twitter oauth token
      dispatch({ type: 'INIT_STATE', state: 'twitterDirectConnect', data: false })
      dispatch(twitterConnectStep1())
    }
  }, [twitterDirectConnect])

  useEffect(() => {
    // Extract social action data from campaign data
    setAction(campaignData.action_participate[0])

    //Calculate total entries number
    let totalTemp = 0
    if (campaignData.action_participate[0]?.social_action[0].facebook_page) {
      totalTemp += campaignData.action_participate[0].social_action[0].facebook_page_entries
    }
    if (campaignData.action_participate[0]?.social_action[0].facebook_post) {
      totalTemp += campaignData.action_participate[0].social_action[0].facebook_post_entries
    }
    if (campaignData.action_participate[0]?.social_action[0].facebook_url) {
      totalTemp += campaignData.action_participate[0].social_action[0].facebook_url_entries
    }

    if (campaignData.action_participate[0]?.social_action[2].instagram_profile) {
      totalTemp += campaignData.action_participate[0].social_action[2].instagram_profile_entries
    }
    if (campaignData.action_participate[0]?.social_action[2].instagram_publication) {
      totalTemp += campaignData.action_participate[0].social_action[2].instagram_publication_entries
    }

    if (campaignData.action_participate[0]?.social_action[3].twitter_like) {
      totalTemp += campaignData.action_participate[0].social_action[3].twitter_like_entries
    }
    if (campaignData.action_participate[0]?.social_action[3].twitter_follow) {
      totalTemp += campaignData.action_participate[0].social_action[3].twitter_follow_entries
    }
    if (campaignData.action_participate[0]?.social_action[3].twitter_tweet) {
      totalTemp += campaignData.action_participate[0].social_action[3].twitter_tweet_entries
    }
    if (campaignData.action_participate[0]?.social_action[3].twitter_retweet) {
      totalTemp += campaignData.action_participate[0].social_action[3].twitter_retweet_entries
    }

    if (campaignData.action_participate[0]?.social_action[4].twitch_follow) {
      totalTemp += campaignData.action_participate[0].social_action[4].twitch_follow_entries
    }

    if (campaignData.action_participate[0]?.social_action[5].tiktok_profile) {
      totalTemp += campaignData.action_participate[0].social_action[5].tiktok_profile_entries
    }
    if (campaignData.action_participate[0]?.social_action[5].tiktok_publication) {
      totalTemp += campaignData.action_participate[0].social_action[5].tiktok_publication_entries
    }

    if (campaignData.action_participate[0]?.video) {
      totalTemp += campaignData.action_participate[0].video.entries
    }

    if (campaignData.action_participate[0]?.website) {
      totalTemp += campaignData.action_participate[0].website.entries
    }

    if (campaignData.action_participate[0]?.poll) {
      totalTemp += campaignData.action_participate[0].poll.entries
    }

    setTotalEntriesNum(totalTemp)

  }, [campaignData])

  useEffect(() => {
    if (CAMPAIGN_PARTICIPATE_SUCCESS) {
      // if campaign participation is success then open confirm modal
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CAMPAIGN_PARTICIPATE', data: false })
      setOpenConfirm(true)
    }
  }, [CAMPAIGN_PARTICIPATE_SUCCESS])

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
  }, [
    OPEN_TWITTER_LIKE_VALIDATION_MODAL,
    OPEN_TWITTER_RETWEET_VALIDATION_MODAL,
    OPEN_TWITTER_COMMENT_VALIDATION_MODAL,
    OPEN_TWITTER_FOLLOW_VALIDATION_MODAL,
    OPEN_TWITCH_FOLLOW_VALIDATION_MODAL,
  ])

  const goToWinningDetail = (winningName, id) => {
    // Load prize data of campaign and open prize modal
    setOpenWinningDetailModal(true)
    dispatch(getWinningData(id, winningName))
  }

  const renderWinnings = () => {
    return (
      (campaignData.winnings || []).map((item, index) =>
        <div key={index} className="mt-3 color-blue font-size-11">
          <span className="pointer" onClick={() => goToWinningDetail(item, campaignData.pk)}>{`- ${item}`}</span>
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
      window.open(`https://instagram.com/${action.social_action[2].instagram_profile_url}`, '_blank')
      dispatch(campaignParticipateInstagramProfile({ promotion_id: campaignData.pk }))
    }
    else if (socialName === 'instagram' && actionType === 'like') {
      window.open(`https://instagram.com/p/${action.social_action[2].instagram_publication_url}`, '_blank')
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
              <div className="color-gray mt-2 text-center font-weight-bold font-size-20">{campaignData.number_of_eligible_people || 0}</div>
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
          </Row>
        </Col>
      </Row>

      <ParticipateConfirmModal open={openConfirm} onToggle={handleOpenConfirm} promotion_id={campaignData.pk} company_name={campaignData.company_name} />
      <VideoPlayerModal open={openVideo} onToggle={handleOpenVideo} videoEnded={videoEnded} />

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
    </AppLayout>
  )
}

export default withRouter(CampaignDetail)
