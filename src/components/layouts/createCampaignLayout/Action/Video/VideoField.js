import React from 'react'
import { Row, Col, Input } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import images from '../../../../../utils/images'

import { useTranslation } from 'react-i18next'

function VideoField(props) {
    const { t } = useTranslation()

    const { params, setAction } = props

    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#22B9A7', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div>
                    <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}>v</span>
                    <span className="ml-3">{t('create_campaign_page.create_video_action')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setAction('url_video', 'video', false)}
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
                            placeholder={t('create_campaign_page.url_video')}
                            value={params.url_video.url}
                            onChange={(e) => setAction('url_video', 'url', e.target.value)}
                        />
                    </Col>
                    <Col size="12" className="p-0 justify-content-between align-items-center mt-3 mt-sm-0">
                        <Row>
                            <Col xs="12" sm="8" className="p-0">
                                <Row>
                                    <Col className="p-0 px-sm-4">
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                            placeholder={t('create_campaign_page.video_name')}
                                            value={params.url_video.video_name}
                                            onChange={(e) => setAction('url_video', 'video_name', e.target.value)}
                                        />
                                    </Col>
                                    <Col className="p-0 px-sm-4">
                                        <Input
                                            value={params.url_video.entries}
                                            onChange={(e) => setAction('url_video', 'entries', e.target.value)}
                                            className="custom-form-control"
                                            type="number"
                                            placeholder={t('create_campaign_page.entries')}
                                        />
                                    </Col>
                                </Row>
                            </Col>
                            <Col xs="12" sm="4" className="p-0 d-flex align-items-center justify-content-end mt-3 mt-sm-0">
                                <Checkbox checked={params.url_video.mandatory} onChange={(e) => setAction('url_video', 'mandatory', e.target.checked)} />
                                <span className="ml-3 footer-link">{t('create_campaign_page.mandatory')}</span>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col xs="12" sm="6" className="p-0">
                        <div className="footer-link-bold mb-3">
                            {`${t('create_campaign_page.url_video_mobile')} (mp4, avi, etc.)`}
                        </div>
                        <Input
                            type="text"
                            className="custom-form-control"
                            placeholder='https://example.com/name.mp4'
                            value={params.url_video.url_mobile}
                            onChange={(e) => setAction('url_video', 'url_mobile', e.target.value)}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default VideoField