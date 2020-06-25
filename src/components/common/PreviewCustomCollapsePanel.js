import React from 'react'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'
import CheckBoxButtonForAction from '../common/Buttons/CheckBoxButtonForAction'

import { useTranslation } from 'react-i18next'

const Required = () => {
    return (
        <span className="ml-2 font-size-12 color-red font-weight-bold">*</span>
    )
}

function CustomCollapsePanel(props) {
    const { t } = useTranslation()

    const {
        type,
        actions,
        onParticipate,
        isVideoEnded,
        tryToOpenValidationModal,
        url,
        mandatories,
        entries
    } = props

    const renderIcons = () => {
        switch (type) {
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
                    {entries && <div className="color-pink mt-2" style={{whiteSpace: 'pre-wrap'}}>{entries}</div>}

                    <div className="mt-2 mt-sm-3">
                        {actions.like && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='like'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.like && <Required />}
                            </>
                        )}
                        {actions.follow && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='follow'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.follow && <Required />}
                            </>
                        )}
                        {actions.comment && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='comment'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.comment && <Required />}
                            </>
                        )}
                        {actions.retweet && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='retweet'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.retweet && <Required />}
                            </>
                        )}
                        {actions.profile_url && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='follow'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.profile && <Required />}
                            </>
                        )}
                        {actions.publication_url && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='like'
                                    onParticipate={onParticipate}
                                    tryToOpenValidationModal={tryToOpenValidationModal}
                                />
                                {mandatories.publication && <Required />}
                            </>
                        )}
                        {actions.video && (
                            <>
                                <CheckBoxButtonForAction
                                    socialName={type}
                                    btnString='video'
                                    onParticipate={onParticipate}
                                    isVideoEnded={isVideoEnded}
                                />
                                {mandatories.video && <Required />}
                            </>
                        )}
                        {actions.website && (
                            <div className="color-blue d-flex">{url}{mandatories.website && <Required />}</div>
                        )}
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {renderIcons()}
        </>
    )
}

export default CustomCollapsePanel;