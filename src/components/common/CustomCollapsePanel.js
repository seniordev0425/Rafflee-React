import React, { useEffect, useRef } from 'react'
import { Button, Tooltip } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {
  FacebookProvider,
  EmbeddedPost,
  Like
} from 'react-facebook'
import YouTube from 'react-youtube'
import { isMobile } from 'react-device-detect'
import { FACEBOOK_APP_ID } from '../../utils/constants'
import images from '../../utils/images'
import { useTranslation } from 'react-i18next'


function CustomCollapsePanel(props) {
  const { t } = useTranslation()

  const {
    title,                        // campaign action title (string)
    text,                         // campaign action description (string)
    socialName,                   // campaign action name (facebook, twitter, etc.)
    actionType,                   // campaign action type (like, follow, comment, etc.)
    mandatory,                    // campaign action mandatory value (boolean)
    entries,                      // campaign action entries number (integer)
    didAction,                    // already validated this action or not (boolean)
    tryToOpenValidationModal,     // action performance function
    facebookActionUrl,
    youtubeVideoId,
    isYoutubeVideoClicked,
    onYoutubeVideoEnded
  } = props

  const userProfile = useSelector(state => state.userInfo.userProfile)
  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)

  // action validation result. Redux state (boolean)
  const validation = useSelector(state => state.campaign[`${socialName}_${actionType}_validation`])
  const dispatch = useDispatch()

  const youtubePlayer = useRef(null)

  useEffect(() => {
    dispatch({ type: 'CAMPAIGN_INIT_STATE', state: `${socialName}_${actionType}_validation`, data: false })

    window.addEventListener('blur', () => handleYoutubePlaying(false))
    window.addEventListener('focus', () => handleYoutubePlaying(true))

    return () => {
      window.removeEventListener('blur', handleYoutubePlaying)
      window.removeEventListener('focus', handleYoutubePlaying)
      youtubePlayer.current = null
    }
  }, [])

  const handleYoutubePlaying = (playing) => {
    if (youtubePlayer.current) {
      if (playing) {
        youtubePlayer.current.playVideo()
      } else {
        youtubePlayer.current.pauseVideo()
      }
    }
  }

  const renderIcons = () => {
    switch (socialName) {
      case 'twitter':
        return (<div className="collapse-twitter-icon">
          <img src={images.twitter_icon} alt="" />
        </div>)
      case 'facebook':
        return (<div className="collapse-fb-icon">
          f
        </div>)
      case 'youtube':
        return (<div className="collapse-youtube-icon">
          <img src={images.youtube_icon} width={30} alt="" />
        </div>)
      case 'twitch':
        return (<div className="collapse-twitch-icon">
          <img src={images.twitch_icon} width="20" alt="" />
        </div>)
      case 'instagram':
        return (<div className="collapse-instagram-icon">
          <img src={images.instagram_icon} width="20" alt="" />
        </div>)
      case 'tiktok':
        return (<div className="collapse-tiktok-icon">
          <img src={images.tiktok_action_icon} width="20" alt="" />
        </div>)
      case 'video':
        return (<div className="collapse-video-icon">
          <img src={images.video_icon} width="25" alt="" />
        </div>)
      case 'website':
        return (<div className="collapse-website-icon">
          <img src={images.visit_icon} width="25" alt="" />
        </div>)
      default:
        return <></>
    }
  }

  const renderFacebookAction = () => {
    if (isMobile) return null

    switch (actionType) {
      case 'post':
        return (
          <div className="mt-3" id="facebook-post">
            <FacebookProvider appId={FACEBOOK_APP_ID}>
              <EmbeddedPost href={facebookActionUrl} className="mt-3" width={'100%'} />
            </FacebookProvider>
          </div>
        )
      case 'url':
        return (
          <div className="mt-3" id="facebook-like">
            <FacebookProvider appId={FACEBOOK_APP_ID}>
              <Like href={facebookActionUrl} colorScheme="dark" share />
            </FacebookProvider>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <ExpansionPanel className="collapse-panel-body">
        <ExpansionPanelSummary
          className="collapse-panel-summary"
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          aria-label="Expand"
          id="panel1a-header"
        >
          {mandatory &&
            <Tooltip title={t('campaign_detail_page.mandatory_action')} color='#e72f30'>
              <img src={images.required_icon} alt="" width="20" height="20" className="mt-1 mt-sm-2 mr-2" />
            </Tooltip>
          }
          <span className="promotion-list-item-title">{title}</span>
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          {(token && !company && userProfile.phone_number_verification)
            ?
            <div>
              <div style={{ color: '#767B83' }}>
                {text}
                {facebookActionUrl &&
                  renderFacebookAction()
                }
              </div>
              <div className="mt-2 mt-sm-3">
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  className="ant-blue-btn"
                  onClick={() => tryToOpenValidationModal(socialName, actionType)}
                >
                  {(didAction || validation) ? t('button_group.validated') : t('button_group.validate')}
                </Button>
              </div>
              {youtubeVideoId && isYoutubeVideoClicked &&
                <div className="d-flex justify-content-center mt-4">
                  <div className="youtube-video-wrapper">
                    <YouTube
                      videoId={youtubeVideoId}
                      opts={{ width: '100%', playerVars: { autoplay: 1 } }}
                      onReady={event => { youtubePlayer.current = event.target }}
                      onEnd={onYoutubeVideoEnded}
                    />
                  </div>
                </div>
              }
            </div>
            :
            <span style={{ color: '#f5ad2b' }}>{t('campaign_detail_page.social_detail_alert')}</span>
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {(didAction || validation)
        ?
        <img src={images.verified_icon} width={40} height={40} alt="" />
        :
        <div className="d-flex align-items-center justify-content-center campaign-detail-entries-container">
          {`+${entries}`}
        </div>
      }
      {renderIcons()}
    </div>
  )
}

export default CustomCollapsePanel;