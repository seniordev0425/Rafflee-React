import React from 'react'
import { Row, Col } from 'reactstrap'
import images from '../../../utils/images'
import { Button } from 'reactstrap'
import { saveAs } from 'file-saver'

import { useTranslation } from 'react-i18next'

function MyBillsItem(props) {
    const { t } = useTranslation()

    const { item } = props

    const download = () => {
        setTimeout(() => {
            const response = {
                file: 'https://www.win-rar.com/predownload.html?spV=true&subD=true&f=winrar-x64-580.exe',
            };
            // server sent the url to the file!
            // now, let's download:
            window.location.href = response.file;
            // you could also do:
            // window.open(response.file);
        }, 100);
    }
    return (

        <div>
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col lg="1" md="2" sm="2" xs="3" className="promotion-list-item-img">
                            <img src={images.profile_img} />
                        </Col>
                        <Col lg="11" md="10" sm="10" xs="9" className="pl-sm-5">
                            <div className="promotion-list-item-title">
                                {item.promotion}
                                <span className="footer-link-bold float-right">{t('my_bills_page.total')}:</span>
                            </div>
                            <div className="footer-link-bold mt-2">
                                {t('my_bills_page.emission_date')}: {item.emission_date}
                                <span className="float-right">{item.price}</span>

                            </div>
                            <div className="mt-4">

                                <Button
                                    size="lg"
                                    color="primary"
                                    className="bootstrap-blue-btn promotion-list-item-btn"
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

export default MyBillsItem;