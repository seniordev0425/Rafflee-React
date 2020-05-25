import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import images from '../../../../utils/images'

import { useTranslation } from 'react-i18next'

function ResumeSection(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection } = props

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <div className="mt-5 mb-3 mx-3">
                    <div
                        className="pl-3 py-2 d-flex align-items-center font-size-9"
                        style={{ backgroundColor: '#DFF0D8', borderRadius: 6, color: '#4F8D4E' }}
                    >
                        {t(`create_campaign_page.${params.campaign_type}_campaign_create_success`)}
                    </div>
                    <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.campaign_link')}</div>
                    <Input
                        type="text"
                        className="custom-form-control footer-link"
                        defaultValue='https://rafflee.io/campaign/'
                    />
                    <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.embed_page_blog_post')}</div>
                    <Input
                        type="textarea"
                        size="5"
                        className="custom-form-control footer-link"
                        defaultValue=''
                    />
                    <div className="footer-link-bold mt-5 mb-3">{t('create_campaign_page.add_tab_site')}</div>
                    <div
                        className="px-3 py-2 mb-5 d-flex align-items-center justify-content-between font-size-9 color-blue"
                        style={{ backgroundColor: '#F4FBFF', borderRadius: 6, border: '1px solid #BAE1FF' }}
                    >
                        <span>{t(`create_campaign_page.need_to_pay_text`)}</span>
                        <span>{t(`create_campaign_page.pay`)}</span>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ResumeSection