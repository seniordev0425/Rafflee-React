import React from 'react'
import { Checkbox } from 'antd'

import { useTranslation } from 'react-i18next'

function PollActionMenu(props) {
    const { t } = useTranslation()

    const { params, setParams } = props

    return (
        <div className="action-list-container">
            <div className="action-list-item">
                <label>{t('button_group.create_poll')}</label>
                <Checkbox
                    checked={params.poll !== 'false'}
                    onChange={(e) => {
                        if (e.target.checked) {
                            setParams('poll', { question: '', response: [""], mutiples_choices: false })
                        } else {
                            setParams('poll', 'false')
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default PollActionMenu