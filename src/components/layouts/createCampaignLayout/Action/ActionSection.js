import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from 'lodash'
import { Row, Col } from 'reactstrap'
import { Menu, Dropdown, Button, Checkbox } from 'antd'
import FacebookActionButton from './Facebook/FacebookActionButton'
import TwitterActionButton from './Twitter/TwitterActionButton'
import YoutubeActionButton from './Youtube/YoutubeActionButton'
import InstagramActionButton from './Instagram/InstagramActionButton'
import TwitchActionButton from './Twitch/TwitchActionButton'
import TiktokActionButton from './Tiktok/TiktokActionButton'
import BlogActionButton from './Blog/BlogActionButton'
import PodcastActionButton from './Podcast/PodcastActionButton'
import TumblrActionButton from './Tumblr/TumblrActionButton'
import TypeFormActionButton from './TypeForm/TypeFormActionButton'
import VimeoActionButton from './Vimeo/VimeoActionButton'
import SpotifyActionButton from './Spotify/SpotifyActionButton'
import PollActionButton from './Poll/PollActionButton'
import SteamActionButton from './Steam/SteamActionButton'
import WebsiteActionButton from './Website/WebsiteActionButton'
import SoundcloudActionButton from './Soundcloud/SoundcloudActionButton'

import FacebookActionMenu from './Facebook/FacebookActionMenu'
import TwitterActionMenu from './Twitter/TwitterActionMenu'
import YoutubeActionMenu from './Youtube/YoutubeActionMenu'
import InstagramActionMenu from './Instagram/InstagramActionMenu'
import TwitchActionMenu from './Twitch/TwitchActionMenu'
import PollActionMenu from './Poll/PollActionMenu'
import WebsiteActionMenu from './Website/WebsiteActionMenu'
import TiktokActionMenu from './Tiktok/TiktokActionMenu'

import FacebookPostField from './Facebook/FacebookPostField'
import FacebookLikeShareUrlField from './Facebook/FacebookLikeShareUrlField'
import FacebookPageField from './Facebook/FacebookPageField'
import TwitterLikeField from './Twitter/TwitterLikeField'
import TwitterFollowField from './Twitter/TwitterFollowField'
import TwitterTweetField from './Twitter/TwitterTweetField'
import TwitterCommentField from './Twitter/TwitterCommentField'
import TwitterRetweetField from './Twitter/TwitterRetweetField'
import YoutubeLikeField from './Youtube/YoutubeLikeField/YoutubeLikeField'
import YoutubeFollowField from './Youtube/YoutubeFollowField/YoutubeFollowField'
import YoutubeCommentField from './Youtube/YoutubeCommentField/YoutubeCommentField'
import YoutubeVideoField from './Youtube/YoutubeVideoField/YoutubeVideoField'
import InstagramProfileField from './Instagram/InstagramProfileField'
import InstagramPublicationField from './Instagram/InstagramPublicationField'
import InstagramCommentField from './Instagram/InstagramCommentField'
import TwitchFollowField from './Twitch/TwitchFollowField'
import TiktokProfileField from './Tiktok/TiktokProfileField'
import TiktokPublicationField from './Tiktok/TiktokPublicationField'
import PollField from './Poll/PollField'
import WebsiteField from './Website/WebsiteField'

import { getFacebookPages, getInstagramPublications } from '../../../../actions/social'

import { useTranslation } from 'react-i18next'

function ActionSection(props) {
  const { t } = useTranslation()

  const {
    params,
    setParams,
    setSection,
    setAction,
    onSaveCampaign
  } = props

  const SAVE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.SAVE_CAMPAIGN)
  const instagramPublications = useSelector(state => state.social.instagramPublications)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFacebookPages())
  }, [])

  useEffect(() => {
    if (!isEmpty(params.instagram.filter(action => action.type === 'comment')) && isEmpty(instagramPublications)) {
      dispatch(getInstagramPublications())
    }
  }, [params.instagram])

  const menu = (
    <Menu>
      <div>
        <Checkbox />
      </div>
      <div>
        <Checkbox />
      </div>
    </Menu>
  );

  return (
    <div className="min-height-container">
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
          <div className="mt-5 mb-3 ml-3">
            <div className="footer-link-bold mb-3">
              <span>{t('create_campaign_page.actions')}</span>
              <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
            </div>
            <div className="mt-3 d-flex flex-wrap font-size-9 color-white">
              <Dropdown overlay={<FacebookActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <FacebookActionButton />
              </Dropdown>
              <Dropdown overlay={<TwitterActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <TwitterActionButton />
              </Dropdown>
              <Dropdown overlay={<YoutubeActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <YoutubeActionButton />
              </Dropdown>
              <Dropdown overlay={<InstagramActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <InstagramActionButton />
              </Dropdown>
              <Dropdown overlay={<TwitchActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <TwitchActionButton />
              </Dropdown>
              <Dropdown overlay={<TiktokActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <TiktokActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <BlogActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <PodcastActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <TumblrActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <TypeFormActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <VimeoActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <SpotifyActionButton />
              </Dropdown>
              <Dropdown overlay={<PollActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <PollActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <SteamActionButton />
              </Dropdown>
              <Dropdown overlay={<WebsiteActionMenu params={params} setParams={setParams} />} placement="bottomLeft">
                <WebsiteActionButton />
              </Dropdown>
              <Dropdown overlay={menu} placement="bottomLeft" disabled>
                <SoundcloudActionButton />
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x font-size-9 color-white">
          <div className="mx-3">
            {params.facebook.map((action, id) => {
              if (action.type === 'post') {
                return <FacebookPostField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'url') {
                return <FacebookLikeShareUrlField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'page') {
                return <FacebookPageField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
            })}

            {params.twitter.map((action, id) => {
              if (action.type === 'like') {
                return <TwitterLikeField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'follow') {
                return <TwitterFollowField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'comment') {
                return <TwitterCommentField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'tweet') {
                return <TwitterTweetField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'retweet') {
                return <TwitterRetweetField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
            })}

            {params.youtube.map((action, id) => {
              if (action.type === 'like') {
                return <YoutubeLikeField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'follow') {
                return <YoutubeFollowField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'comment') {
                return <YoutubeCommentField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'video') {
                return <YoutubeVideoField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
            })}

            {params.instagram.map((action, id) => {
              if (action.type === 'like') {
                return <InstagramPublicationField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'follow') {
                return <InstagramProfileField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'comment') {
                return <InstagramCommentField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
            })}

            {params.twitch.map((action, id) => {
              return <TwitchFollowField
                key={id}
                action={action}
                setAction={setAction}
                params={params}
                setParams={setParams}
              />
            })}

            {params.tiktok.map((action, id) => {
              if (action.type === 'like') {
                return <TiktokPublicationField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
              if (action.type === 'follow') {
                return <TiktokProfileField
                  key={id}
                  action={action}
                  setAction={setAction}
                  params={params}
                  setParams={setParams}
                />
              }
            })}

            {params.poll.map((action, id) => {
              return <PollField
                key={id}
                action={action}
                setAction={setAction}
                params={params}
                setParams={setParams}
              />
            })}

            {params.url_website.map((action, id) => {
              return <WebsiteField
                key={id}
                action={action}
                setAction={setAction}
                params={params}
                setParams={setParams}
              />
            })}

            <div className="d-flex justify-content-between">
              <Button
                type="primary"
                className="ant-blue-btn my-5"
                style={{ width: 150 }}
                onClick={onSaveCampaign}
                loading={SAVE_CAMPAIGN_PROCESS}
              >
                {!SAVE_CAMPAIGN_PROCESS && t('button_group.save')}
              </Button>
              <Button
                type="primary"
                className="ant-blue-btn my-5"
                style={{ width: 150 }}
                onClick={() => setSection('preview')}
              >
                {t('button_group.next')}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ActionSection