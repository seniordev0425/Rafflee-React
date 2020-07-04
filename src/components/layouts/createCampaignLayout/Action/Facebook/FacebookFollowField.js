import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox, Select } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function FacebookFollowField(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#4264A3', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div className="d-flex align-items-center">
                    <img src={images.facebook_action_icon} width={10} height={16} alt="" />
                    <span className="ml-3">{t('create_campaign_page.follow')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} alt="" />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('facebook', 'follow', false)}
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
                    <Col xs="12" sm="6" className="p-0 pr-sm-2">
                        <Input
                            value={params.facebook.follow_entries}
                            onChange={(e) => setAction('facebook', 'follow_entries', e.target.value)}
                            className="custom-form-control w-100"
                            type="number"
                            placeholder={t('create_campaign_page.entries')}
                        />
                    </Col>
                    <Col xs="12" sm="6" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                        <Checkbox checked={params.facebook.follow_mandatory} onChange={(e) => setAction('facebook', 'follow_mandatory', e.target.checked)} />
                        <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default FacebookFollowField