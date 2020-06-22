import React from 'react'
import { Row, Col} from 'reactstrap'

import { useTranslation } from 'react-i18next'

function FaceBookConnectBtn(){
    const { t } = useTranslation()

    return(
            <Row className="not-allowed">
                <Col xs="2" className="pl-0 pr-0 fb-icon-container1">
                    f
                </Col>
                <Col xs="10" className="pl-0 pr-0 fb-icon-container2">
                    {t('account_page.facebook_connect')}
                </Col>
            </Row>
    )
}
export default FaceBookConnectBtn;