import React, { useState } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'

import MyCampaignLayout from './MyCampaignLayout'
import BeingCreatedLayout from './BeingCreatedLayout'

import { useTranslation } from 'react-i18next'

const ParentLayout = () => {
  const { t } = useTranslation()

  const [currentSection, setCurrentSection] = useState('myCampaign')

  const renderSection = () => {
    switch (currentSection) {
      case 'myCampaign':
        return <MyCampaignLayout />
      case 'beignCreated':
        return <BeingCreatedLayout />
      default:
        return <MyCampaignLayout />
    }
  }

  return (
    <div>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="myCampaign" className="analytics-menuitem" onClick={() => setCurrentSection("myCampaign")}>
              <span className={currentSection === 'myCampaign' ? "underline font-weight-bold" : ""}> {t('menubar.my_campaign')}</span>
            </Menu.Item>
            <Menu.Item key="beignCreated" className="analytics-menuitem" onClick={() => setCurrentSection("beignCreated")}>
              <span className={currentSection === 'beignCreated' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.being_created')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </div>
  )
}

export default ParentLayout