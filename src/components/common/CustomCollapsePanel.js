import React from 'react'
import { useSelector } from 'react-redux'
import { Button } from 'reactstrap'
import { Checkbox } from 'antd'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanel(props) {
    const { t } = useTranslation()

    const {type, title, participate} = props

    const isLoading = useSelector(state=>state.userInfo.CAMPAIGN_PARTICIPATE_SUCCESS)

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
            case 'other':
                return (<div className="collapse-other-icon">
                            ?
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
                <span className="promotion-list-item-title">{title}</span>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        To get credit for this entry, you must tweet about this on your twitter page. Likes & comments are appreciated, but no required. Thanks!
                    </div>
                    <div className="mt-3">
                        <Checkbox>Would you like to join the private Converse Cercle?</Checkbox>
                    </div>
                    <div className="mt-3">
                        <Checkbox>Would you like to receive informations about this company by email?</Checkbox>
                    </div>
                    <Button className="btn blue-btn mt-3 participate-btn-size" color="primary" onClick={participate} disabled={isLoading}>
                        {t('button_group.participate')}
                    </Button>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            {renderIcons()}
        </>
    )
}

export default CustomCollapsePanel;