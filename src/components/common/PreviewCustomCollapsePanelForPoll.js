import React, { useState } from 'react'
import { Select } from 'antd'
import { Button, Tooltip } from 'antd'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import images from '../../utils/images'

import { useTranslation } from 'react-i18next'

function PreviewCustomCollapsePanelForPoll(props) {
    const { t } = useTranslation()

    const {
        title,
        text,
        multiple_choice,
        responses,
        mandatory,
        entries,
    } = props

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
                    <div>
                        <div className="d-flex">
                            {text}
                        </div>
                        <Select
                            mode={multiple_choice ? "multiple" : "single"}
                            className="w-100 mt-2 mt-sm-3"
                            placeholder={t('create_campaign_page.categories_placeholder')}
                            onChange={(val) => setAnswers(val)}
                            size="large"
                        >
                            {renderChildren()}
                        </Select>
                        <div className="mt-3">
                            <Button
                                type="primary"
                                className="ant-blue-btn promotion-list-item-btn"
                                onClick={() => void 0}
                            >
                                {t('button_group.confirm')}
                            </Button>
                        </div>
                    </div>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className="d-flex align-items-center justify-content-center campaign-detail-entries-container">
                {entries}
            </div>
            <div className="collapse-other-icon">
                ?
            </div>
        </div>
    )
}

export default PreviewCustomCollapsePanelForPoll