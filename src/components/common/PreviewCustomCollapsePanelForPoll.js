import React, { useState } from 'react'
import { Select } from 'antd'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useTranslation } from 'react-i18next'

const Required = () => {
    return (
        <span className="ml-2 font-size-12 color-red font-weight-bold">*</span>
    )
}

function PreviewCustomCollapsePanelForPoll(props) {
    const { t } = useTranslation()

    const { type, multiple_choice, responses, question, mandatory, entries } = props

    const [answers, setAnswers] = useState(null)

    const { Option } = Select

    const renderChildren = () => {
        return (
            responses.map((item, index) =>
                <Option key={index} value={item}>{item}</Option>
            )
        )
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
                    <div className="promotion-list-item-title">{question}</div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div className="d-flex">
                        {t(`campaign_detail_page.${type}.text`)}
                        {mandatory && <Required />}
                    </div>
                    {entries && <div className="color-pink mt-2">{entries}</div>}
                    <Select
                        mode={multiple_choice ? "multiple" : "single"}
                        className="w-100 mt-2 mt-sm-3"
                        placeholder={t('create_campaign_page.categories_placeholder')}
                        onChange={(val) => setAnswers(val)}
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

export default PreviewCustomCollapsePanelForPoll;