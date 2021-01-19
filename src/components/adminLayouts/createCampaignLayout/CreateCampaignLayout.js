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

import { openNotification } from '../../../utils/notification'
import { b64toBlob } from '../../../utils/others'
import errorMessages from '../../../utils/messages/error'

import { useTranslation } from 'react-i18next'

function CreateCampaignLayout(props) {
  const { t } = useTranslation()

  const {
    onChangeSection,
    selectedCampaign
  } = props

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
    countries: [],
    start_date: '',
    end_date: '',
    winnings: [{ name: '', number_of_people: '', description: '', image: [] }],
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
      tweet: false,
      tweet_model: '',
      tweet_entries: '',
      tweet_mandatory: false,
      like: false,
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      like_text: '',
      like_like: '',
      like_retweet: '',
      like_created_at: '',
      like_name: '',
      like_verified: false,
      like_profile_img: '',
      retweet: false,
      retweet_id: '',
      retweet_entries: '',
      retweet_mandatory: false,
      retweet_text: '',
      retweet_like: '',
      retweet_retweet: '',
      retweet_created_at: '',
      retweet_name: '',
      retweet_verified: false,
      retweet_profile_img: '',
      follow: false,
      follow_type: 'screen_name',
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false,
      follow_profile_image_url: '',
      follow_followers_count: '',
      follow_screen_name: '',
      follow_verified: false,
      comment: false,
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      comment_text: '',
      comment_like: '',
      comment_retweet: '',
      comment_created_at: '',
      comment_name: '',
      comment_verified: false,
      comment_profile_img: ''
    },
    youtube: {
      like: false,
      like_id: '',
      like_entries: '',
      like_mandatory: false,
      like_url_img: '',
      like_video_title: '',
      like_published_at: '',
      like_channel_title: '',
      follow: false,
      follow_id: '',
      follow_entries: '',
      follow_mandatory: false,
      follow_url_img: '',
      follow_channel_title: '',
      comment: false,
      comment_id: '',
      comment_model: '',
      comment_entries: '',
      comment_mandatory: false,
      comment_url_img: '',
      comment_video_title: '',
      comment_published_at: '',
      comment_channel_title: '',
      video: false,
      video_id: '',
      video_url_img: '',
      video_entries: '',
      video_mandatory: false
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
    if (selectedCampaign) {

      setParams({
        pk: selectedCampaign.pk,
        promotion_name: selectedCampaign.campaign_name,
        promotion_picture: selectedCampaign.campaign_image,
        promotion_description: selectedCampaign.description,
        promotion_long_description: selectedCampaign.long_description,
        public_promotion: 'public',
        categories: selectedCampaign.categories ? selectedCampaign.categories : [],
        temp_categories: selectedCampaign.categories ? selectedCampaign.categories : [],
        countries: selectedCampaign.countries ? selectedCampaign.countries : [],
        start_date: selectedCampaign.release_date ? moment(selectedCampaign.release_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        end_date: selectedCampaign.end_date ? moment(selectedCampaign.end_date).utc().format('YYYY-MM-DD HH:mm:ss') : null,
        winnings: selectedCampaign.winnings ? selectedCampaign.winnings : [{ name: '', number_of_people: '', description: '', image: [] }],
        campaign_type: selectedCampaign.type_of_distribution,
        live_draw: selectedCampaign.live_draw,
        limit_participants: false,
        limitation_participation: selectedCampaign.number_of_maximum_participants,
        facebook: {
          post: selectedCampaign.action_participate[0].social_action[0].facebook_post,
          post_entries: selectedCampaign.action_participate[0].social_action[0]?.facebook_post_entries || '',
          post_mandatory: selectedCampaign.action_participate[0].social_action[0]?.facebook_post_mandatory || false,
          post_like: false,
          post_comment: false,
          post_share: false,
          post_page_id: '',
          post_publication_id: '',
          url: selectedCampaign.action_participate[0].social_action[0].facebook_url,
          url_entries: selectedCampaign.action_participate[0].social_action[0]?.facebook_url_entries || '',
          url_mandatory: selectedCampaign.action_participate[0].social_action[0]?.facebook_url_mandatory || false,
          url_url: selectedCampaign.action_participate[0].social_action[0]?.facebook_url_url || '',
          url_like: false,
          url_share: false,
          page: selectedCampaign.action_participate[0].social_action[0].facebook_page,
          page_entries: selectedCampaign.action_participate[0].social_action[0]?.facebook_page_entries || '',
          page_mandatory: selectedCampaign.action_participate[0].social_action[0]?.facebook_page_mandatory || false,
          page_page_id: '',
          page_page_name: '',
          page_follow: false,
          page_share: false
        },
        twitter: {
          tweet: selectedCampaign.action_participate[0].social_action[3].twitter_tweet,
          tweet_model: selectedCampaign.action_participate[0].social_action[3]?.twitter_tweet_model || '',
          tweet_entries: selectedCampaign.action_participate[0].social_action[3]?.twitter_tweet_entries || '',
          tweet_mandatory: selectedCampaign.action_participate[0].social_action[3]?.twitter_tweet_mandatory || false,
          comment: selectedCampaign.action_participate[0].social_action[3].twitter_comment_tweet,
          comment_model: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_model || '',
          comment_entries: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_entries || '',
          comment_mandatory: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_mandatory || false,
          comment_text: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_text || '',
          comment_like: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_like || '',
          comment_retweet: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_retweet || '',
          comment_created_at: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_created_at || '',
          comment_name: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_name || '',
          comment_verified: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_verified || false,
          comment_profile_img: selectedCampaign.action_participate[0].social_action[3]?.twitter_comment_tweet_profile_img || '',
          like: selectedCampaign.action_participate[0].social_action[3].twitter_like,
          like_id: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_id || '',
          like_entries: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_entries || '',
          like_mandatory: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_mandatory || false,
          like_text: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_text || '',
          like_like: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_like || '',
          like_retweet: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_retweet || '',
          like_created_at: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_created_at || '',
          like_name: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_name || '',
          like_verified: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_verified || false,
          like_profile_img: selectedCampaign.action_participate[0].social_action[3]?.twitter_like_profile_img || '',
          retweet: selectedCampaign.action_participate[0].social_action[3].twitter_retweet,
          retweet_id: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_id || '',
          retweet_entries: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_entries || '',
          retweet_mandatory: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_mandatory || false,
          retweet_text: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_text || '',
          retweet_like: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_like || '',
          retweet_retweet: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_retweet || '',
          retweet_created_at: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_created_at || '',
          retweet_name: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_name || '',
          retweet_verified: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_verified || false,
          retweet_profile_img: selectedCampaign.action_participate[0].social_action[3]?.twitter_retweet_profile_img || '',
          follow: selectedCampaign.action_participate[0].social_action[3].twitter_follow,
          follow_type: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_type || 'screen_name',
          follow_id: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_id || '',
          follow_entries: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_entries || '',
          follow_mandatory: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_mandatory || false,
          follow_profile_image_url: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_profile_img || '',
          follow_followers_count: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_followers_count || '',
          follow_screen_name: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_screen_name || '',
          follow_verified: selectedCampaign.action_participate[0].social_action[3]?.twitter_follow_verified || false,
        },
        youtube: {
          like: selectedCampaign.action_participate[0].social_action[1].youtube_like,
          like_id: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_id || '',
          like_entries: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_entries || '',
          like_mandatory: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_mandatory || false,
          like_url_img: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_url_img || '',
          like_video_title: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_video_title || '',
          like_published_at: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_published_at || '',
          like_channel_title: selectedCampaign.action_participate[0].social_action[1]?.youtube_like_channel_title || '',
          follow: selectedCampaign.action_participate[0].social_action[1].youtube_follow,
          follow_id: selectedCampaign.action_participate[0].social_action[1]?.youtube_follow_id || '',
          follow_entries: selectedCampaign.action_participate[0].social_action[1]?.youtube_follow_entries || '',
          follow_mandatory: selectedCampaign.action_participate[0].social_action[1]?.youtube_follow_mandatory || false,
          follow_url_img: selectedCampaign.action_participate[0].social_action[1]?.youtube_follow_url_img || '',
          follow_channel_title: selectedCampaign.action_participate[0].social_action[1]?.youtube_follow_channel_title || '',
          comment: selectedCampaign.action_participate[0].social_action[1].youtube_comment,
          comment_id: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_id || '',
          comment_model: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_model || '',
          comment_entries: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_entries || '',
          comment_mandatory: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_mandatory || false,
          comment_url_img: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_url_img || '',
          comment_video_title: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_video_title || '',
          comment_published_at: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_published_at || '',
          comment_channel_title: selectedCampaign.action_participate[0].social_action[1]?.youtube_comment_channel_title || '',
          video: selectedCampaign.action_participate[0].social_action[1].youtube_video,
          video_id: selectedCampaign.action_participate[0].social_action[1]?.youtube_video_id || '',
          video_url_img: selectedCampaign.action_participate[0].social_action[1]?.youtube_video_url_img || '',
          video_entries: selectedCampaign.action_participate[0].social_action[1]?.youtube_video_entries || '',
          video_mandatory: selectedCampaign.action_participate[0].social_action[1]?.youtube_video_mandatory || false,
        },
        instagram: {
          publication: selectedCampaign.action_participate[0].social_action[2].instagram_publication,
          profile: selectedCampaign.action_participate[0].social_action[2].instagram_profile,
          publication_url: selectedCampaign.action_participate[0].social_action[2]?.instagram_publication_url || '',
          profile_url: selectedCampaign.action_participate[0].social_action[2]?.instagram_profile_url || '',
          publication_entries: selectedCampaign.action_participate[0].social_action[2]?.instagram_publication_entries || '',
          publication_mandatory: selectedCampaign.action_participate[0].social_action[2]?.instagram_publication_mandatory || false,
          profile_entries: selectedCampaign.action_participate[0].social_action[2]?.instagram_profile_entries || '',
          profile_mandatory: selectedCampaign.action_participate[0].social_action[2]?.instagram_profile_mandatory || false
        },
        twitch: {
          follow: selectedCampaign.action_participate[0].social_action[4]?.twitch_follow || false,
          follow_name: selectedCampaign.action_participate[0].social_action[4]?.twitch_follow_name || '',
          follow_entries: selectedCampaign.action_participate[0].social_action[4]?.twitch_follow_entries || '',
          follow_mandatory: selectedCampaign.action_participate[0].social_action[4]?.twitch_follow_mandatory || false,
        },
        tiktok: {
          publication: selectedCampaign.action_participate[0].social_action[5]?.tiktok_publication,
          profile: selectedCampaign.action_participate[0].social_action[5]?.tiktok_profile,
          publication_url: selectedCampaign.action_participate[0].social_action[5]?.tiktok_publication_url || '',
          profile_url: selectedCampaign.action_participate[0].social_action[5]?.tiktok_profile_url
            ? selectedCampaign.action_participate[0].social_action[5]?.tiktok_profile_url.split('/')[3]
            : '@',
          publication_entries: selectedCampaign.action_participate[0].social_action[5]?.tiktok_publication_entries || '',
          publication_mandatory: selectedCampaign.action_participate[0].social_action[5]?.tiktok_publication_mandatory || false,
          profile_entries: selectedCampaign.action_participate[0].social_action[5]?.tiktok_profile_entries || '',
          profile_mandatory: selectedCampaign.action_participate[0].social_action[5]?.tiktok_profile_mandatory || false
        },
        poll: selectedCampaign.action_participate[0].poll ?
          {
            question: selectedCampaign.action_participate[0].poll.question,
            response: selectedCampaign.action_participate[0].poll.responses,
            multiples_choices: selectedCampaign.action_participate[0].poll.multiple_choices,
            entries: selectedCampaign.action_participate[0].poll.entries,
            mandatory: selectedCampaign.action_participate[0].poll.mandatory
          }
          : 'false',
        url_video: {
          video: selectedCampaign.action_participate[0].video ? true : false,
          url: selectedCampaign.action_participate[0].video?.url_video || '',
          url_mobile: selectedCampaign.action_participate[0].video?.url_video_mobile || '',
          video_name: selectedCampaign.action_participate[0].video?.video_name || '',
          entries: selectedCampaign.action_participate[0].video?.entries || '',
          mandatory: selectedCampaign.action_participate[0].video?.mandatory || false
        },
        url_website: {
          website: selectedCampaign.action_participate[0].website ? true : false,
          url: selectedCampaign.action_participate[0].website?.url || '',
          entries: selectedCampaign.action_participate[0].website?.entries || '',
          mandatory: selectedCampaign.action_participate[0].website?.mandatory || false
        }
      })
    }
  }, [selectedCampaign])

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

  const renderSection = () => {
    switch (currentSection) {
      case 'setup':
        return <SetupSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'campaign_type':
        return <CampaignType
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'action':
        return <ActionSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
          setAction={_setAction}
        />
      case 'preview':
        return <PreviewSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'payment':
        return <PaymentSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
          onBack={() => onChangeSection('campaignsPanel')}
        />
      case 'resume':
        return <ResumeSection
          params={params}
          setParams={_setParams}
          setSection={_setSection}
        />
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