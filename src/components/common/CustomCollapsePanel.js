import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanel(props) {
    const { t } = useTranslation()

    const {type, actions, onParticipate} = props

    const renderIcons = () => {
        switch(type){
            case 'twitter':
                return (<div className="collapse-twitter-icon">
                            <img src={images.twitter_icon}/>
                        </div>)
            case 'facebook':
                return (<div className="collapse-fb-icon">
                            f
                        </div>)
            case 'youtube':
                return (<div className="collapse-youtube-icon">
                            <img src={images.youtube_icon}/>
                        </div>)
            case 'twitch':
                return (<div className="collapse-twitch-icon">
                            <img src={images.twitch_icon} width="20"/>
                        </div>)
            case 'instagram':
                return (<div className="collapse-instagram-icon">
                            <img src={images.instagram_icon} width="20"/>
                        </div>)

            case 'video':
                return (<div className="collapse-video-icon">
                            <img src={images.video_icon} width="25"/>
                        </div>)
        }
    }

    return(
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
                    <div className="mt-2 mt-sm-3">
                        {actions.like && (
                            <div className="social-btn mr-sm-3" onClick={() => onParticipate(type, 'like', null)}>
                                {t('create_campaign_page.like')}
                            </div>
                        )}
                        {actions.follow && (
                            <div className="social-btn mr-sm-3" onClick={() => onParticipate(type, 'follow', null)}>
                                {t('create_campaign_page.follow')}
                            </div>
                        )}
                        {actions.comment &&(
                            <div className="social-btn mr-sm-3"  onClick={() => onParticipate(type, 'comment', null)}>
                                {t('create_campaign_page.message')}
                            </div>
                        )}
                        {actions.retweet &&(
                            <div className="social-btn mr-sm-3"  onClick={() => onParticipate(type, 'retweet', null)}>
                                {t('create_campaign_page.retweet')}
                            </div>
                        )}
                        {actions.video &&(
                            <div className="social-btn mr-sm-3"  onClick={() => onParticipate(type, null, null)}>
                                {t('campaign_detail_page.watch_video')}
                            </div>
                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {renderIcons()}
        </>
    )
}

export default CustomCollapsePanel;