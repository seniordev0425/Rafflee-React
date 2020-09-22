import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import SelectLanguage from '../HeaderLayout/SelectLanguage'

function Footer() {
  const { t } = useTranslation()

  return (
    <div className="footer-container">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row className="align-items-center">
            <Col xs="12" lg="4">
              <SelectLanguage />
            </Col>
            <Col xs="12" lg="4" className="d-lg-flex justify-content-center d-none">
              <span className="footer-link">
                {t('footer.all_rights_reserved')}
              </span>
            </Col>
            <Col xs="12" lg="4" className="mt-3 mt-lg-0">
              <div className="d-flex justify-content-start justify-content-lg-end">
                <Link to="/faq">
                  <div className="mr-4">
                    <span className="footer-link">
                      {t('footer.faq')}
                    </span>
                  </div>
                </Link>
                <Link to="/privacy-policy">
                  <div className="mr-4">
                    <span className="footer-link">
                      {t('footer.privacy_policy')}
                    </span>
                  </div>
                </Link>
                <Link to="/general-conditions">
                  <div className="mr-4">
                    <span className="footer-link">
                      {t('footer.terms_of_service')}
                    </span>
                  </div>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default Footer;