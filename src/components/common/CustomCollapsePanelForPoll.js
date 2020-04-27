import React, { useState } from 'react'
import { Select } from 'antd'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanelForPoll(props) {
    const { t } = useTranslation()

    const {type, multiple_choice, responses, question, handleAnswers} = props

    const { Option } = Select

    const renderChildren = () => {
        return (
            responses.map((item, index) => 
                <Option key={index} value={item}>{item}</Option>
            )
        )
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
                <div className="promotion-list-item-title">{question}</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div>
                        {t(`campaign_detail_page.${type}.text`)}
                    </div>
                    <Select
                        mode={multiple_choice ? "multiple" : "single"}
                        className="w-100 mt-2 mt-sm-3"
                        placeholder={t('create_campaign_page.categories_placeholder')}
                        onChange={handleAnswers}
                        size="large"
                    >
                        {renderChildren()}
                    </Select>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className="collapse-other-icon">
                ?
            </div>
        </>
    )
}

export default CustomCollapsePanelForPoll;