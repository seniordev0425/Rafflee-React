import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function YoutubeConnectBtn(){
    const { t } = useTranslation()

    return(
            <Row className="not-allowed">
                <Col xs="2" className="pl-0 pr-0 youtube-icon-container1">
                    <img src={images.youtube_icon}/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 youtube-icon-container2">
                    {t('account_page.youtube_connect')}
                </Col>
            </Row>
    )
}
export default YoutubeConnectBtn;