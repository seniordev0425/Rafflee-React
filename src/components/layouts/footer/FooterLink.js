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
                            <div style={{ marginTop: "15px" }}>
                                <Link to="/report">
                                    <span className="footer-link">{t('footer.report')}</span>
                                </Link>
                            </div>
                        </Col>
                        <Col xs="6" md="3">
                            <div className="footer-link-bold">
                                {t('footer.legal')}
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <Link to="/privacy-policy">
                                    <span className="footer-link">{t('footer.privacy_policy')}</span>
                                </Link>
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.cookies_policy')}
                            </div>
                            <div className="footer-link" style={{ marginTop: "15px" }}>
                                {t('footer.legal_notice')}
                            </div>
                            <div style={{ marginTop: "15px" }}>
                                <Link to="/general-conditions">
                                    <span className="footer-link">{t('footer.terms_of_service')}</span>
                                </Link>
                            </div>
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