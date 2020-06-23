import React from 'react'
import { Row, Col} from 'reactstrap'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function SteamConnectBtn(){
    const { t } = useTranslation()

    return(

            <Row className="not-allowed">
                <Col xs="2" className="pl-0 pr-0 steam-icon-container1">
                    <img src={images.steam_icon} alt=""/>
                </Col>
                <Col xs="10" className="pl-0 pr-0 steam-icon-container2">
                    {t('account_page.steam_connect')}
                </Col>
            </Row>

    )
}
export default SteamConnectBtn;