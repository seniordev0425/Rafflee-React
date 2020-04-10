import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'

import { useTranslation } from 'react-i18next'

function MyCampaignItem(props) {
    const { t } = useTranslation()

    const { item, goToLivePage, goToParticipatePage } = props
    return (
        <div>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={item.campaign_image ? item.campaign_image : images.profile_img} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">{item.campaign_name}
                                <span className={Date.parse(item.end_date) > Date.now() ? "green-dot" : "red-dot"}></span>
                            </div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            {item.type_of_distribution === 'live_draw' &&
                                <div className="mt-2">
                                    <Button
                                        size="lg"
                                        color="link"
                                        className="blue-link-btn"
                                        onClick={() => goToLivePage(item.pk)}
                                    >
                                        {t('my_campaign_page.live_page')}
                                    </Button>
                                </div>
                            }

                            <div className="mt-2">
                                <span className="footer-link-bold pointer" onClick={() => goToParticipatePage(item.pk)}>
                                    {t('my_campaign_page.view_participants')} ({item.number_of_participants})
                                </span>
                            </div>

                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>

    )
}

export default MyCampaignItem;