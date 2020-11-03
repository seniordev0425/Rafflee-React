import React, { useState } from 'react'
import { Menu } from 'antd'
import { Row, Col } from 'reactstrap'

import Offers from './Offers'
import Requests from './Requests'
import CreateOffer from './CreateOffer'

import { useTranslation } from 'react-i18next'

function RecruitmentLayout() {
  const { t } = useTranslation()

  const [currentSection, setCurrentSection] = useState('offer')

  const renderSection = () => {
    switch (currentSection) {
      case 'offer':
        return <Offers />
      case 'request':
        return <Requests />
      case 'create-offer':
        return <CreateOffer />
      default:
        return <Offers />
    }
  }

  return (
    <div>
      <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
        <Col sm={{ size: 10, offset: 1 }} xs="12" className="padding-x">
          <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentSection]}>
            <Menu.Item key="offer" className="analytics-menuitem" onClick={() => setCurrentSection("offer")}>
              <span className={currentSection === 'offer' ? "underline font-weight-bold" : ""}> {t('menubar.offers')}</span>
            </Menu.Item>
            <Menu.Item key="request" className="analytics-menuitem" onClick={() => setCurrentSection("request")}>
              <span className={currentSection === 'request' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.requests')}</span>
            </Menu.Item>
            <Menu.Item key="create-offer" className="analytics-menuitem float-right" onClick={() => setCurrentSection("create-offer")}>
              <span className={currentSection === 'create-offer' ? "ml-3 underline font-weight-bold" : "ml-3"}> {t('menubar.create_offer')}</span>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
      {renderSection()}
    </div>
  )
}

export default RecruitmentLayout