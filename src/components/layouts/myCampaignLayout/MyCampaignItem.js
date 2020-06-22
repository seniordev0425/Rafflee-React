import React, { useState } from 'react'
import { Row, Col, Button } from 'reactstrap'
import { Button as AntdButton, Tooltip } from 'antd'
import CampaignCloseModal from '../../modals/CampaignCloseModal'
import images from '../../../utils/images'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function MyCampaignItem(props) {
    const { t } = useTranslation()

    const { item, goToLivePage, goToParticipatePage } = props

    const [openCloseModal, setOpenCloseModal] = useState(false)

    const handleCloseModal = () => {
        if (Date.parse(item.end_date) <= Date.now()) return
        setOpenCloseModal(!openCloseModal)
    }

    return (
        <div>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={item.campaign_image ? item.campaign_image : images.profile_img} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title d-flex justify-content-between align-items-center">{item.campaign_name}
                                <Tooltip
                                    title={Date.parse(item.end_date) > (Date.now() + 1000) ? `${t('my_campaign_page.in_progress')} ${moment(item.end_date).format('YYYY-MM-DD')}` : `${t('my_campaign_page.ended_at')} ${moment(item.end_date).format('YYYY-MM-DD')}`}
                                    placement="topRight"
                                >
                                    <span className={Date.parse(item.end_date) > (Date.now() + 1000) ? "green-dot pointer" : "red-dot pointer"}></span>
                                </Tooltip>

                            </div>
                            <div className="font-size-9 d-block d-sm-flex">
                                <div>{`${t('my_campaign_page.number_of_views')}${item.nbr_of_views},`}</div>
                                <div className="ml-sm-2 ml-0">{t('my_campaign_page.percentage_of_interest')}
                                    <span style={{ color: item.percentage_of_interest >= 0 ? 'green' : 'red' }}>{`${item.percentage_of_interest}%`}</span>
                                </div>
                            </div>
                            <div className="promotion-list-item-text">{item.description}</div>
                            {item.live_draw &&
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

                            <div className="mt-2 d-flex justify-content-between align-items-center">
                                <span className="footer-link-bold pointer" onClick={() => goToParticipatePage(item.pk)}>
                                    {t('my_campaign_page.view_participants')} ({item.number_of_participants})
                                </span>
                                <AntdButton
                                    type="primary"
                                    className={Date.parse(item.end_date) > (Date.now() + 1000) ? "ant-blue-btn" : "ant-disabled-btn"}
                                    style={{ width: 85, height: 30, padding: 0 }}
                                    onClick={handleCloseModal}
                                >
                                    {t('button_group.close')}
                                </AntdButton>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <CampaignCloseModal
                open={openCloseModal}
                onToggle={handleCloseModal}
                onClose={() => setOpenCloseModal(false)}
                promotion_id={item.pk}
            />
        </div>
    )
}

export default MyCampaignItem