import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function FooterLink() {
    const { t } = useTranslation()

    return (
        <div className="footer-link-container">
            <Row>
                <Col xs="12" sm={{ size: 10, offset: 1 }}>
                    <Row>
                        <Col xs="6" md="3" className="mb-4 mb-md-0">
                            <div className="footer-link-bold">
                                {t('footer.enterprise')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.who_are_we')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.the_team')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.we_are_hiring')}
                            </div>
                        </Col>
                        <Col xs="6" md="3" className="mb-4 mb-md-0">
                            <div className="footer-link-bold">
                                {t('footer.community')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.company_contact_us')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.influencer_contact_us')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.faq')}
                            </div>
                        </Col>
                        <Col xs="6" md="3">
                            <div className="footer-link-bold">
                                {t('footer.legal')}
                            </div>
                            <Link to="/privacy-policy">
                                <div className="footer-link" style={{ marginTop: "15px" }}>
                                    {t('footer.privacy_policy')}
                                </div>
                            </Link>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.cookies_policy')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.legal_notice')}
                            </div>
                            <Link to="/general-conditions">
                                <div className="footer-link" style={{ marginTop: "15px" }}>
                                    {t('footer.terms_of_service')}
                                </div>
                            </Link>
                        </Col>
                        <Col xs="6" md="3">
                            <div className="footer-link-bold">
                                {t('footer.follow_us')}
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default FooterLink;