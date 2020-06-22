import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function InstagramConnectBtn(){
    const { t } = useTranslation()

    return(

            <Row className="not-allowed">
                <Col xs="2" className="pl-0 pr-0 instagram-icon-container1">
                    <img src={images.instagram_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 instagram-icon-container2">
                    {t('account_page.instagram_connect')}
                </Col>
            </Row>

    )
}
export default InstagramConnectBtn;