import React from 'react'
import { Row, Col } from 'reactstrap'
import { Button, Radio, Checkbox, Tooltip } from 'antd'
import images from '../../../../utils/images'

import { useTranslation } from 'react-i18next'

function CampaignType(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection } = props

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <div className="mt-5 mb-3 ml-3">
                    <div className="footer-link-bold">{t('create_campaign_page.campaign_sort')}</div>
                    <div className="m-3">
                        <Radio.Group value={params.campaign_type} onChange={(e) => setParams('campaign_type', e.target.value)} style={{ display: 'block' }}>
                            <div className="d-flex align-items-center justify-content-between">
                                <Radio value="giveaway" />
                                <div className={params.campaign_type === 'giveaway' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                                    {t('create_campaign_page.giveaway')}
                                    {params.campaign_type === 'giveaway'
                                        ?
                                        (
                                            <Tooltip title="Tooltip will show on mouse enter.">
                                                <img src={images.question_icon} />
                                            </Tooltip>
                                        )
                                        : (<img src={images.question_icon} />)
                                    }
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <Radio value="reward" />
                                <div className={params.campaign_type === 'reward' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                                    {t('create_campaign_page.reward')}
                                    {params.campaign_type === 'reward'
                                        ?
                                        (
                                            <Tooltip title="Tooltip will show on mouse enter.">
                                                <img src={images.question_icon} />
                                            </Tooltip>
                                        )
                                        : (<img src={images.question_icon} />)
                                    }
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between mt-4">
                                <Radio value="rafflee" disabled />
                                <div className={params.campaign_type === 'rafflee' ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                                    {t('create_campaign_page.rafflee')}
                                    {params.campaign_type === 'rafflee'
                                        ?
                                        (
                                            <Tooltip title="Tooltip will show on mouse enter.">
                                                <img src={images.question_icon} />
                                            </Tooltip>
                                        )
                                        : (<img src={images.question_icon} />)
                                    }
                                </div>
                            </div>
                        </Radio.Group>
                    </div>
                    <div className="footer-link-bold">{t('create_campaign_page.options')}</div>
                    <div className="m-3">
                        <div className="d-flex align-items-center justify-content-between mt-4">
                            <Checkbox
                                checked={params.live_draw}
                                onChange={(e) => setParams('live_draw', e.target.checked)}
                            />
                            <div className={params.live_draw ? "inline-sort-div-active" : "inline-sort-div-inactive"}>
                                {t('create_campaign_page.live_draw')}
                                {params.live_draw
                                    ?
                                    (
                                        <Tooltip title="Tooltip will show on mouse enter.">
                                            <img src={images.question_icon} />
                                        </Tooltip>
                                    )
                                    : (<img src={images.question_icon} />)
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <Row>
                    <Col>
                        <Button
                            type="primary"
                            className="ant-blue-btn my-5"
                            style={{ width: 150 }}
                            onClick={() => setSection('action')}
                        >
                            {t('button_group.next')}
                        </Button>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default CampaignType