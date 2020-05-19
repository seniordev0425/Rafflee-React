import React from 'react'
import { Row, Col, Input, FormGroup } from 'reactstrap'
import { Button, Radio, Checkbox, Tooltip } from 'antd'
import images from '../../../../utils/images'

import { useTranslation } from 'react-i18next'

function PaymentSection(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection } = props

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <div className="mt-5 mb-3 ml-3">
                    <Row>
                        <Col xs="12" sm="6" className="p-0">
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.name')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.ccv')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.card_number')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.date')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                        </Col>
                        <Col xs="12" sm="6" className="p-0">
                            <Row>
                                <Col xs="12" sm={{ size: 9, offset: 3 }}>
                                    <Row>
                                        <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.campaign_total')}</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3">{t('create_campaign_page.campaign')} :$5623</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3">{t('create_campaign_page.iva')}:$20</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3" style={{ paddingTop: 20, borderTop: "1px solid #DEE6E9" }}>
                                            {t('create_campaign_page.total')}:$5643
                                                </div>
                                    </Row>
                                    <Row>
                                        <Button className="ant-blue-btn mt-3" type="primary" style={{ width: 200 }}>
                                            {t('button_group.create_campaign')}
                                        </Button>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default PaymentSection