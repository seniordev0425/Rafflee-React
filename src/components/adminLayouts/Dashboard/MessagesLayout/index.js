import React, { useState } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'
import CompanyMessages from './CompanyMessages'
import ContactMessages from './ContactMessages'
import ReportMessages from './ReportMessages'

import { useTranslation } from 'react-i18next'

function MessagesLayout() {
  const { t } = useTranslation()

  const [currentSection, setCurrentSection] = useState('company')

  const renderSection = () => {
    switch (currentSection) {
      case 'company':
        return <CompanyMessages />
      case 'contact':
        return <ContactMessages />
      case 'report':
        return <ReportMessages />
      default:
        return <CompanyMessages />
    }
  }

  return (
    <div>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="company" className="analytics-menuitem" onClick={() => setCurrentSection("company")}>
              <span className={currentSection === 'company' ? "underline font-weight-bold" : ""}> {t('menubar.company')}</span>
            </Menu.Item>
            <Menu.Item key="contact" className="analytics-menuitem" onClick={() => setCurrentSection("contact")}>
              <span className={currentSection === 'contact' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.contact')}</span>
            </Menu.Item>
            <Menu.Item key="report" className="analytics-menuitem" onClick={() => setCurrentSection("report")}>
              <span className={currentSection === 'report' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.report')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </div>
  )
}

export default MessagesLayout