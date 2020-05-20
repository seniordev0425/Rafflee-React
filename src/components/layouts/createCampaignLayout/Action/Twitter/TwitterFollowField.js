import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function TwitterFollowField(props) {
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
                    <span className="ml-3">{t('create_campaign_page.follow_tweet')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('twitter', 'follow', false)}
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
                            placeholder={t('create_campaign_page.follow_id')}
                            value={params.twitter.follow_id}
                            onChange={(e) => setAction('twitter', 'follow_id', e.target.value)}
                        />
                    </Col>
                    <Col size="12" className="p-0 justify-content-between align-items-center mt-3 mt-sm-0">
                        <Row>
                            <Col xs="12" sm="8" className="p-0">
                                <Row>
                                    <Col className="p-0 px-sm-4">
                                        <Select
                                            defaultValue="screen_name"
                                            onChange={val => setAction('twitter', 'follow_type', val)}
                                            size="large"
                                            className="w-100"
                                        >
                                            <Option value="screen_name">{t('twitter_follow_modal.screen_name')}</Option>
                                            <Option value="user_id">{t('twitter_follow_modal.user_id')}</Option>
                                        </Select>
                                    </Col>
                                    <Col className="p-0 px-sm-4">
                                        <Input
                                            value={params.twitter.follow_entries}
                                            onChange={(e) => setAction('twitter', 'follow_entries', e.target.value)}
                                            className="custom-form-control"
                                            type="number"
                                            placeholder={t('create_campaign_page.entries')}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" sm="4" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                                <Checkbox checked={params.twitter.follow_mandatory} onChange={(e) => setAction('twitter', 'follow_mandatory', e.target.checked)} />
                                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TwitterFollowField