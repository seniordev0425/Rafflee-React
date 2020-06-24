import React from 'react'
import { useSelector } from 'react-redux'
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
    const userProfile = useSelector(state => state.userInfo.userProfile)
    const token = useSelector(state => state.userInfo.token)
    const company = useSelector(state => state.userInfo.company)

    const {
        type,
        actions,
        didActions,
        onParticipate,
        isVideoEnded,
        tryToOpenValidationModal,
        participateWebsite,
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
            default:
                return <></>
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
                    {(token && !company && userProfile.phone_number_verification) ?
                        <div>
                            <div>
                                {t(`campaign_detail_page.${type}.text`)}
                            </div>
                            {entries && <div className="color-pink mt-2">{entries}</div>}
                            <div className="mt-2 mt-sm-3">
                                {actions.like && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='like'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions[type].like}
                                        />
                                        {mandatories.like &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.follow && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='follow'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions[type].follow}
                                        />
                                        {mandatories.follow &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.comment && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='comment'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions[type].comment}
                                        />
                                        {mandatories.comment &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.retweet && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='retweet'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions[type].retweet}
                                        />
                                        {mandatories.retweet &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.video && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='video'
                                            onParticipate={onParticipate}
                                            isVideoEnded={isVideoEnded}
                                            defaultValue={didActions.video}
                                        />
                                        {mandatories.video &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.website && (
                                    <a
                                        rel={'noopener noreferrer'}
                                        href={actions.website.url.includes("http") ? actions.website.url : `https://${actions.website.url}`}
                                        target='_blank'
                                        className="d-flex"
                                        onClick={participateWebsite}
                                    >
                                        <span>{actions.website.url}</span>
                                        {mandatories.video && <Required />}
                                    </a>
                                )}
                                {actions.instagram_profile && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='follow'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions.instagram_profile}
                                            instagram_profile={`https://instagram.com/${actions.instagram_profile}`}
                                        />
                                        {mandatories.profile &&
                                            <Required />
                                        }
                                    </>
                                )}
                                {actions.instagram_publication && (
                                    <>
                                        <CheckBoxButtonForAction
                                            socialName={type}
                                            btnString='like'
                                            onParticipate={onParticipate}
                                            tryToOpenValidationModal={tryToOpenValidationModal}
                                            defaultValue={didActions.instagram_publication}
                                            instagram_publication={`https://instagram.com/p/${actions.instagram_publication}`}
                                        />
                                        {mandatories.publication &&
                                            <Required />
                                        }
                                    </>
                                )}
                            </div>
                        </div>
                        :
                        <span style={{ color: '#f5ad2b' }}>{t('campaign_detail_page.social_detail_alert')}</span>
                    }
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {renderIcons()}
        </>
    )
}

export default CustomCollapsePanel;