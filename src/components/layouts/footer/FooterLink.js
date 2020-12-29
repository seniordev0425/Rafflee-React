import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
  faTwitch,
  faTiktok
} from '@fortawesome/free-brands-svg-icons'
import ContactUsModal from '../../../components/modals/ContactUsModal'

import {
  RAFFLEE_FACEBOOK_LINK,
  RAFFLEE_INSTAGRAM_LINK,
  RAFFLEE_LINKEDIN_LINK,
  RAFFLEE_TIKTOK_LINK,
  RAFFLEE_TWITTER_LINK
} from '../../../utils/constants'

function FooterLink() {
  const { t } = useTranslation()

  const [openContactUsModal, setOpenContactUsModal] = useState(false)

  return (
    <div className="footer-link-container">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row>
            <Col xs="6" md="3" className="mb-4 mb-md-0">
            </Col>

            <Col xs="6" md="3" className="mb-4 mb-md-0">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.resources')}
              </div>
              <div className="mt-3">
                <Link to="/about">
                  <span className="color-gray">{t('footer.discover_us')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/careers/openings">
                  <span className="color-gray">{t('footer.we_are_hiring')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/report">
                  <span className="color-gray">{t('footer.report')}</span>
                </Link>
              </div>
            </Col>

            <Col xs="6" md="3">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.business')}
              </div>
              <div className="mt-3">
                <Link to="/brands">
                  <span className="color-gray">{t('footer.brands')}</span>
                </Link>
              </div>
              <div className="mt-3">
                <Link to="/influencer">
                  <span className="color-gray">{t('footer.influencers')}</span>
                </Link>
              </div>
            </Col>

            <Col xs="6" md="3">
              <div className="footer-link-bold" style={{ fontSize: '1rem' }}>
                {t('footer.contact_us')}
              </div>
              <div className="mt-3" onClick={() => setOpenContactUsModal(true)}>
                <span className="color-gray pointer">{t('footer.contact_by_email')}</span>
              </div>

              <div className="footer-link-bold mt-3" style={{ fontSize: '1rem' }}>
                {t('footer.follow_us')}
              </div>
              <div>
                <a href={RAFFLEE_FACEBOOK_LINK} target="blank">
                  <FontAwesomeIcon icon={faFacebookF} color='#000000bd' className="font-size-13 mr-3 mt-3" />
                </a>
                <a href={RAFFLEE_TWITTER_LINK} target="blank">
                  <FontAwesomeIcon icon={faTwitter} color='#000000bd' className="font-size-13 mr-3 mt-3" />
                </a>
                <a href={RAFFLEE_LINKEDIN_LINK} target="blank">
                  <FontAwesomeIcon icon={faLinkedinIn} color='#000000bd' className="font-size-13 mr-3 mt-3" />
                </a>
                <a href={RAFFLEE_INSTAGRAM_LINK} target="blank">
                  <FontAwesomeIcon icon={faInstagram} color='#000000bd' className="font-size-13 mr-3 mt-3" />
                </a>
                <a href={RAFFLEE_TIKTOK_LINK} target="blank">
                  <FontAwesomeIcon icon={faTiktok} color='#000000bd' className="font-size-13 mr-3 mt-3" />
                </a>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <ContactUsModal
        open={openContactUsModal}
        onToggle={() => setOpenContactUsModal(!openContactUsModal)}
        onClose={() => setOpenContactUsModal(false)}
      />
    </div>
  )
}

export default FooterLink;