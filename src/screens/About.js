import React from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import AboutHelmet from '../components/common/Helmets/AboutHelmet'
import Banner from '../components/layouts/about/Banner'
import images from '../utils/images'

import { useTranslation } from 'react-i18next'

function About() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <AboutHelmet />
      <Banner />
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <Row style={{ marginTop: 60 }}>
            <Col xs="12" sm="6">
              <div className="color-gray font-size-13" style={{ maxWidth: 300 }}>
                {t('about_page.description1')}
              </div>
              <div className="color-black font-size-15 mt-4 font-weight-bold" style={{ maxWidth: 400 }}>
                {t('about_page.description2')}
              </div>
            </Col>
            <Col xs="12" sm="6">
              <img className="about-page-introduction-img" src={images.about_page_user_approach} alt="" />
            </Col>
          </Row>

          <Row style={{ marginTop: 80 }}>
            <Col xs="12" sm="6">
              <img className="about-page-introduction-img" src={images.about_page_client_approach} alt="" />
            </Col>
            <Col xs="12" sm="6" className="d-flex justify-content-center">
              <div>
                <div className="color-gray font-size-13" style={{ maxWidth: 300 }}>
                  {t('about_page.description3')}
                </div>
                <div className="color-black font-size-15 mt-4 font-weight-bold" style={{ maxWidth: 400 }}>
                  {t('about_page.description4')}
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: 80 }}>
            <Col xs="12" sm="6">
              <div>
                <div className="color-gray font-size-13" style={{ maxWidth: 300 }}>
                  {t('about_page.description5')}
                </div>
                <div className="color-black font-size-15 mt-4 font-weight-bold" style={{ maxWidth: 400 }}>
                  {t('about_page.description6')}
                </div>
              </div>
            </Col>
            <Col xs="12" sm="6">
              <img className="about-page-introduction-img" src={images.about_page_client_approach} alt="" />
            </Col>
          </Row>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default About
