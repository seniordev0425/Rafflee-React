import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function WebsiteField(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#95A5A6', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div>
                    <img src={images.website_action_icon} width={18} height={16} />
                    <span className="ml-3">{t('create_campaign_page.create_website_action')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('url_website', 'website', false)}
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
                            placeholder={t('create_campaign_page.url_website')}
                            value={params.url_website.url}
                            onChange={(e) => setAction('url_website', 'url',  e.target.value)}
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

export default WebsiteField