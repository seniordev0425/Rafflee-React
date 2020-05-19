import React from 'react'
import { Row, Col } from 'reactstrap'
import { Menu, Dropdown, Button, Checkbox } from 'antd'
import FacebookActionButton from './Facebook/FacebookActionButton'
import TwitterActionButton from './Twitter/TwitterActionButton'
import YoutubeActionButton from './Youtube/YoutubeActionButton'
import InstagramActionButton from './Instagram/InstagramActionButton'
import TwitchActionButton from './Twitch/TwitchActionButton'
import BlogActionButton from './Blog/BlogActionButton'
import PodcastActionButton from './Podcast/PodcastActionButton'
import TumblrActionButton from './Tumblr/TumblrActionButton'
import TypeFormActionButton from './TypeForm/TypeFormActionButton'
import VimeoActionButton from './Vimeo/VimeoActionButton'
import SpotifyActionButton from './Spotify/SpotifyActionButton'
import PollActionButton from './Poll/PollActionButton'
import VideoActionButton from './Video/VideoActionButton'
import SteamActionButton from './Steam/SteamActionButton'
import WebsiteActionButton from './Website/WebsiteActionButton'
import SoundcloudActionButton from './Soundcloud/SoundcloudActionButton'

import TwitterActionMenu from './Twitter/TwitterActionMenu'
import InstagramActionMenu from './Instagram/InstagramActionMenu'
import TwitchActionMenu from './Twitch/TwitchActionMenu'
import PollActionMenu from './Poll/PollActionMenu'
import VideoActionMenu from './Video/VideoActionMenu'
import WebsiteActionMenu from './Website/WebsiteActionMenu'

import TwitterLikeField from './Twitter/TwitterLikeField'
import TwitterFollowField from './Twitter/TwitterFollowField'
import TwitterMessageField from './Twitter/TwitterMessageField'
import TwitterRetweetField from './Twitter/TwitterRetweetField'
import InstagramProfileField from './Instagram/InstagramProfileField'
import InstagramPublicationField from './Instagram/InstagramPublicationField'
import TwitchFollowField from './Twitch/TwitchFollowField'
import PollField from './Poll/PollField'
import VideoField from './Video/VideoField'
import WebsiteField from './Website/WebsiteField'

import { useTranslation } from 'react-i18next'

function ActionSection(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection, setAction } = props

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
        <>
            <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
                <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                    <div className="mt-5 mb-3 ml-3">
                        <div className="footer-link-bold">{t('create_campaign_page.actions')}</div>
                        <div className="mt-3 d-flex flex-wrap font-size-9 color-white">
                            <Dropdown placement="bottomLeft" disabled>
                                <FacebookActionButton />
                            </Dropdown>
                            <Dropdown overlay={<TwitterActionMenu params={params} setAction={setAction} />} placement="bottomLeft">
                                <TwitterActionButton />
                            </Dropdown>
                            <Dropdown overlay={menu} placement="bottomLeft" disabled>
                                <YoutubeActionButton />
                            </Dropdown>
                            <Dropdown overlay={<InstagramActionMenu params={params} setAction={setAction} />} placement="bottomLeft">
                                <InstagramActionButton />
                            </Dropdown>
                            <Dropdown overlay={<TwitchActionMenu params={params} setAction={setAction} />} placement="bottomLeft">
                                <TwitchActionButton />
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
                            <Dropdown overlay={<VideoActionMenu params={params} setAction={setAction} />} placement="bottomLeft">
                                <VideoActionButton />
                            </Dropdown>
                            <Dropdown overlay={menu} placement="bottomLeft" disabled>
                                <SteamActionButton />
                            </Dropdown>
                            <Dropdown overlay={<WebsiteActionMenu params={params} setAction={setAction} />} placement="bottomLeft">
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
                <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3 font-size-9 color-white">
                    <div className="mx-3">
                        {params.twitter.like &&
                            <TwitterLikeField params={params} setAction={setAction} />
                        }
                        {params.twitter.follow &&
                            <TwitterFollowField params={params} setAction={setAction} />
                        }
                        {params.twitter.comment &&
                            <TwitterMessageField params={params} setAction={setAction} />
                        }
                        {params.twitter.retweet &&
                            <TwitterRetweetField params={params} setAction={setAction} />
                        }
                        {params.instagram.profile &&
                            <InstagramProfileField params={params} setAction={setAction} />
                        }
                        {params.instagram.publication &&
                            <InstagramPublicationField params={params} setAction={setAction} />
                        }
                        {params.twitch.follow &&
                            <TwitchFollowField params={params} setAction={setAction} />
                        }
                        {params.poll !== 'false' &&
                            <PollField params={params} setParams={setParams} setAction={setAction} />
                        }
                        {params.url_video.video &&
                            <VideoField params={params} setAction={setAction} />
                        }
                        {params.url_website.website &&
                            <WebsiteField params={params} setAction={setAction} />
                        }
                        <Button
                            type="primary"
                            className="ant-blue-btn my-5"
                            style={{ width: 150 }}
                            onClick={() => setSection('preview')}
                        >
                            {t('button_group.next')}
                        </Button>
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default ActionSection