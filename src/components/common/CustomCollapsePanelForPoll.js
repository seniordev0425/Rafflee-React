import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Select } from 'antd'
import { Button } from 'antd'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import images from '../../utils/images'
import { openNotification } from '../../utils/notification'

import { useTranslation } from 'react-i18next'

function CustomCollapsePanelForPoll(props) {
    const { t } = useTranslation()

    const { type, multiple_choice, responses, question, participatePoll } = props

    const userProfile = useSelector(state => state.userInfo.userProfile)
    const token = useSelector(state => state.userInfo.token)
    const company = useSelector(state => state.userInfo.company)

    const CAMPAIGN_PARTICIPATE_POLL_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE_POLL)

    const [answers, setAnswers] = useState(null)

    const { Option } = Select

    const renderChildren = () => {
        return (
            responses.map((item, index) =>
                <Option key={index} value={item}>{item}</Option>
            )
        )
    }

    const onSubmit = () => {
        if (!answers) {
            openNotification('warning', t('campaign_detail_page.select_answer'))
            return
        }
        participatePoll(answers)
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
                {(token && !company && userProfile.phone_number_verification) &&
                    <ExpansionPanelDetails>
                        <div>
                            {t(`campaign_detail_page.${type}.text`)}
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
                                onClick={onSubmit}
                                loading={CAMPAIGN_PARTICIPATE_POLL_PROCESS}
                            >
                                {!CAMPAIGN_PARTICIPATE_POLL_PROCESS && t('button_group.confirm')}
                            </Button>
                        </div>
                    </ExpansionPanelDetails>
                }
            </ExpansionPanel>
            <div className="collapse-other-icon">
                ?
            </div>
        </>
    )
}

export default CustomCollapsePanelForPoll;