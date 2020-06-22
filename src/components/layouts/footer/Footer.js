import React from 'react'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function Footer() {
    const { t } = useTranslation()

    return (
        <div className="footer-link py-3">
            <Row>
                <Col xs={{ size: 10, offset: 1 }}>
                    <Row className="justify-content-center">
                        <span>
                            {t('footer.all_rights_reserved')}
                        </span>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default Footer;