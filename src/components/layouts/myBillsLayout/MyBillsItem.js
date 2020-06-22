import React from 'react'
import { useDispatch } from 'react-redux'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { getPdfInvoice } from '../../../actions/userInfo'
import moment from 'moment'

function MyBillsItem(props) {
    const { t } = useTranslation()

    const { item } = props
    
    const dispatch = useDispatch()

    const download = () => {
        dispatch(getPdfInvoice(item.id))
       
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
                            <div className="promotion-list-item-title">
                                {item.promotion}
                                <span className="footer-link-bold float-right">{t('my_bills_page.total')}:</span>
                            </div>
                            <div className="footer-link-bold mt-2">
                                {t('my_bills_page.emission_date')}: {moment(item.emission_date).format('DD/MM/YYYY')}
                                <span className="float-right">{item.price}</span>

                            </div>
                            <div className="mt-4">
                                <Button
                                    type="primary"
                                    className="ant-blue-btn promotion-list-item-btn"
                                    onClick={download}
                                >
                                    {t('button_group.download_pdf')}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default MyBillsItem