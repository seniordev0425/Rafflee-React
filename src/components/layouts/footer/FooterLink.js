import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faTwitch
} from '@fortawesome/free-brands-svg-icons'
import SelectLanguage from '../HeaderLayout/SelectLanguage'

function FooterLink() {
  const { t } = useTranslation()

  return (
    <div className="footer-link-container">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col xs="6" md="3" className="mb-4 mb-md-0">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.enterprise')}
              </div>
              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link"> {t('footer.who_are_we')}</span>
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.the_team')}</span>
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.we_are_hiring')}</span>
                </Link>
              </div>
            </Col>
            <Col xs="6" md="3" className="mb-4 mb-md-0">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.community')}
              </div>
              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.company_contact_us')}</span>
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.influencer_contact_us')}</span>
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.faq')}</span>
                </Link>
              </div>

              <div className="mt-3">
                <Link to="/report">
                  <span className="footer-link">{t('footer.report')}</span>
                </Link>
              </div>
            </Col>
            <Col xs="6" md="3">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.legal')}
              </div>
              <div className="mt-3">
                <Link to="/privacy-policy">
                  <span className="footer-link">{t('footer.privacy_policy')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.cookies_policy')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/in-progress">
                  <span className="footer-link">{t('footer.legal_notice')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/general-conditions">
                  <span className="footer-link">{t('footer.terms_of_service')}</span>
                </Link>
              </div>
            </Col>
            <Col xs="6" md="3">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.follow_us')}
              </div>
              <div>
                <FontAwesomeIcon icon={faFacebookF} color='gray' className="font-size-13 mr-3 mt-3" />
                <FontAwesomeIcon icon={faTwitter} color='gray' className="font-size-13 mr-3 mt-3" />
                <FontAwesomeIcon icon={faLinkedinIn} color='gray' className="font-size-13 mr-3 mt-3" />
                <FontAwesomeIcon icon={faInstagram} color='gray' className="font-size-13 mr-3 mt-3" />
                <FontAwesomeIcon icon={faTwitch} color='gray' className="font-size-13 mr-3 mt-3" />
              </div>
              <div className="footer-link-bold mt-3" style={{ fontSize: '1rem' }}>Language</div>
              <div className="mt-3">
                <SelectLanguage />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default FooterLink;