import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function InstagramPublicationField(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#1E3F6C', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div className="d-flex align-items-center">
                    <img src={images.instagram_action_icon} width={18} height={18} />
                    <span className="ml-3">{t('create_campaign_page.instagram_publication')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('instagram', 'publication', false)}
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
                            placeholder={t('create_campaign_page.instagram_publication_url')}
                            value={params.instagram.publication_url}
                            onChange={(e) => setAction('instagram', 'publication_url',  e.target.value)}
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

export default InstagramPublicationField