import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function TwitterMessageField(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    const { Option } = Select

    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#1EA1F1', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div>
                    <img src={images.twitter_action_icon} width={18} height={16} />
                    <span className="ml-3">{t('create_campaign_page.comment_tweet')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('twitter', 'comment', false)}
                    >
                        {t('button_group.remove')}
                    </span>
                </div>
            </div>
            <div
                className="p-2 p-sm-4"
                style={{ borderColor: '#E6ECEE', borderWidth: 1, borderStyle: 'solid', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
            >
                <Row>
                    <Col xs="12" sm="6" className="p-0">
                        <Input
                            type="text"
                            className="custom-form-control"
                            placeholder={t('twitter_comment_modal.comment_model')}
                            value={params.twitter.comment_model}
                            onChange={(e) => setAction('twitter', 'comment_model', e.target.value)}
                        />
                    </Col>
                    <Col xs="12" sm="6" className="p-0 d-flex justify-content-end align-items-center mt-3 mt-sm-0">
                        <Checkbox />
                        <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TwitterMessageField