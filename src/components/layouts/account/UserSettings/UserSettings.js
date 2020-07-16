import React, { useState } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'
import WallSection from './WallSection'
import PasswordSection from './PasswordSection'
import DeactivateSection from './DeactivateSection'

import { useTranslation } from 'react-i18next'

function UserSettings() {
  const { t } = useTranslation()

  const [currentSection, setCurrentSection] = useState('wall')

  const renderSection = () => {
    switch (currentSection) {
      case 'wall':
        return <WallSection />
      case 'password':
        return <PasswordSection />
      case 'deactivate':
        return <DeactivateSection />
      default:
        return <WallSection />
    }
  }

  return (
    <div>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="wall" className="analytics-menuitem" onClick={() => setCurrentSection("wall")}>
              <span className={currentSection === 'wall' ? "underline font-weight-bold" : ""}> {t('menubar.wall')}</span>
            </Menu.Item>
            <Menu.Item key="password" className="analytics-menuitem" onClick={() => setCurrentSection("password")}>
              <span className={currentSection === 'password' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.password')}</span>
            </Menu.Item>
            <Menu.Item key="deactivate" className="analytics-menuitem" onClick={() => setCurrentSection("deactivate")}>
              <span className={currentSection === 'deactivate' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.deactivate')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </div>
  )
}

export default UserSettings