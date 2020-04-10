import React from 'react'
import { useSelector } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'
import CheckBoxButtonForAction from '../common/Buttons/CheckBoxButtonForAction'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanel(props) {
    const { t } = useTranslation()
    const userProfile = useSelector(state => state.userInfo.userProfile)
    const token = useSelector(state => state.userInfo.token)
    const company = useSelector(state => state.userInfo.company)

    const { type, actions, onParticipate, isVideoEnded } = props

    const renderIcons = () => {
        switch (type) {
            case 'twitter':
                return (<div className="collapse-twitter-icon">
                    <img src={images.twitter_icon} />
                </div>)
            case 'facebook':
                return (<div className="collapse-fb-icon">
                    f
                </div>)
            case 'youtube':
                return (<div className="collapse-youtube-icon">
                    <img src={images.youtube_icon} />
                </div>)
            case 'twitch':
                return (<div className="collapse-twitch-icon">
                    <img src={images.twitch_icon} width="20" />
                </div>)
            case 'instagram':
                return (<div className="collapse-instagram-icon">
                    <img src={images.instagram_icon} width="20" />
                </div>)

            case 'video':
                return (<div className="collapse-video-icon">
                    <img src={images.video_icon} width="25" />
                </div>)
        }
    }

    return (
        <>
            <ExpansionPanel className="collapse-panel-body">
                <ExpansionPanelSummary
                    className="collapse-panel-summary"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    aria-label="Expand"
                    id="panel1a-header"
                >
                    <span className="promotion-list-item-title">{t(`campaign_detail_page.${type}.title`)}</span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        {t(`campaign_detail_page.${type}.text`)}
                    </div>
                    {(token && !company && userProfile.phone_number_verification) &&
                        <div className="mt-2 mt-sm-3">
                            {actions.like && (
                                <CheckBoxButtonForAction socialName={type} btnString='like' onParticipate={onParticipate} />
                            )}
                            {actions.follow && (
                                <CheckBoxButtonForAction socialName={type} btnString='follow' onParticipate={onParticipate} />
                            )}
                            {actions.comment && (
                                <CheckBoxButtonForAction socialName={type} btnString='comment' onParticipate={onParticipate} />
                            )}
                            {actions.retweet && (
                                <CheckBoxButtonForAction socialName={type} btnString='retweet' onParticipate={onParticipate} />
                            )}
                            {actions.video && (
                                <CheckBoxButtonForAction socialName={type} btnString='video' onParticipate={onParticipate} isVideoEnded={isVideoEnded} />
                            )}
                        </div>
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {renderIcons()}
        </>
    )
}

export default CustomCollapsePanel;