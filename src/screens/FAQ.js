import React from 'react'
import { Row, Col } from 'reactstrap'
import AppLayout from '../components/layouts/AppLayout'
import Banner from '../components/layouts/faq/Banner'
import CustomCollapsePanelForFAQ from '../components/common/CustomCollapsePanelForFAQ'
import images from '../utils/images'

import { useTranslation } from 'react-i18next'

function FAQ() {
  const { t } = useTranslation()

  return (
    <AppLayout>
      <Banner />
      <Row style={{ marginTop: 70, marginBottom: 100 }}>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div>
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question1')}
              text={t('faq_page.answer1')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question2')}
              text={t('faq_page.answer2')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question3')}
              text={t('faq_page.answer3')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question4')}
              text={t('faq_page.answer4')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question5')}
              text={t('faq_page.answer5')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question6')}
              text=''
              textLink={t('faq_page.answer6')}
              redirectTo='user'
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question7')}
              text={t('faq_page.answer7')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question8')}
              text={t('faq_page.answer8')}
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question9')}
              textLink={t('faq_page.register_here')}
              text={`  ${t('faq_page.answer9')}\n${t('faq_page.answer10')}\n${t('faq_page.answer11')}`}
              redirectTo='company'
            />
          </div>
          <div className="mt-5">
            <CustomCollapsePanelForFAQ
              title={t('faq_page.question12')}
              text={t('faq_page.answer12')}
            />
          </div>
        </Col>
      </Row>
    </AppLayout>
  )
}

export default FAQ
