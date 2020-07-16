import React, { useState, useEffect } from 'react'
import { Button, Tooltip } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanel(props) {
  const { t } = useTranslation()

  const {
    title,
    text,
    socialName,
    actionType,
    mandatory,
    entries,
    didAction,
    tryToOpenValidationModal
  } = props

  const userProfile = useSelector(state => state.userInfo.userProfile)
  const token = useSelector(state => state.userInfo.token)
  const company = useSelector(state => state.userInfo.company)
  const validation = useSelector(state => state.userInfo[`${socialName}_${actionType}_validation`])
  const dispatch = useDispatch()

  const [validated, setValidated] = useState(false)

  useEffect(() => {
    if (validation) {
      dispatch({ type: 'INIT_STATE', state: `${socialName}_${actionType}_validation`, data: false })
      setValidated(true)
    }
  }, [validation])

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
          <img src={images.youtube_icon} alt="" />
        </div>)
      case 'twitch':
        return (<div className="collapse-twitch-icon">
          <img src={images.twitch_icon} width="20" alt="" />
        </div>)
      case 'instagram':
        return (<div className="collapse-instagram-icon">
          <img src={images.instagram_icon} width="20" alt="" />
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

  return (
    <div className="d-flex justify-content-between">
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
          {(token && !company && userProfile.phone_number_verification) ?
            <div>
              <div style={{ color: '#767B83' }}>
                {text}
              </div>
              <div className="mt-2 mt-sm-3">
                <Button
                  style={{ width: 100 }}
                  type="primary"
                  className="ant-blue-btn"
                  onClick={() => tryToOpenValidationModal(socialName, actionType)}
                >
                  {(didAction || validated) ? t('button_group.validated') : t('button_group.validate')}
                </Button>
              </div>
            </div>
            :
            <span style={{ color: '#f5ad2b' }}>{t('campaign_detail_page.social_detail_alert')}</span>
          }
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <div className="d-flex align-items-center justify-content-center campaign-detail-entries-container">
        {`+${entries}`}
      </div>
      {renderIcons()}
    </div>
  )
}

export default CustomCollapsePanel;