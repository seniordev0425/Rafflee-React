import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Menu, Select } from 'antd'
import { Row, Col } from 'reactstrap'
import OverView from './OverView'
import Audience from './Audience'
import Engagement from './Engagement'
import Following from './Following'
import images from '../../../utils/images'

import { useTranslation } from 'react-i18next'

function AnalyticsLayout() {
    const { t } = useTranslation()

    const companyProfile = useSelector(state => state.userInfo.companyProfile)
    const [currentTab, setCurrentTab] = useState('overview')

    const [time, setTime] = useState('week')
    const [demographics_type, setDemographicsType] = useState('action')

    const { Option } = Select

    const renderBody = () => {
        switch (currentTab) {
            case 'overview':
                return <OverView time={time} />
            case 'audience':
                return <Audience time={time} demographics_type={demographics_type} />
            case 'engagement':
                return <Engagement />
            case 'clicks':
                return <OverView />
            case 'following':
                return <Following />
        }
    }
    return (
        <>
            <Row style={{ borderBottom: "1px solid rgba(126, 154, 168, 0.15)" }}>
                <Col sm={{ size: 10, offset: 1 }} xs="12" className="px-0">
                    <Menu mode="horizontal" className="menubar analytics-menu" selectedKeys={[currentTab]}>
                        <Menu.Item key="overview" className="analytics-menuitem" onClick={() => setCurrentTab("overview")}>
                            <span className={currentTab === 'overview' ? "ml-3 underline" : "ml-3"}> {t('menubar.overview')}</span>
                        </Menu.Item>
                        <Menu.Item key="audience" className="analytics-menuitem" onClick={() => setCurrentTab("audience")}>
                            <span className={currentTab === 'audience' ? "ml-3 underline" : "ml-3"}> {t('menubar.audience')}</span>
                        </Menu.Item>
                        <Menu.Item key="engagement" className="analytics-menuitem" onClick={() => setCurrentTab("engagement")}>
                            <span className={currentTab === 'engagement' ? "ml-3 underline" : "ml-3"}> {t('menubar.engagement')}</span>
                        </Menu.Item>
                        <Menu.Item key="clicks" className="analytics-menuitem" onClick={() => setCurrentTab("clicks")}>
                            <span className={currentTab === 'clicks' ? "ml-3 underline" : "ml-3"}> {t('menubar.clicks')}</span>
                        </Menu.Item>
                        <Menu.Item key="following" className="analytics-menuitem" onClick={() => setCurrentTab("following")}>
                            <span className={currentTab === 'following' ? "ml-3 underline" : "ml-3"}> {t('menubar.following')}</span>
                        </Menu.Item>
                    </Menu>
                </Col>
            </Row>
            <Row className="py-5">
                <Col sm={{ size: 10, offset: 1 }} xs="12">
                    <Row>
                        <Col lg="6" xs="12" className="d-flex">
                            <img src={companyProfile.logo || images.profile_img} width="100px" height="100px" className="mr-4 rounded-circle" />
                            <div className="ml-5">
                                <div className="font-weight-bold font-size-13">{companyProfile.company_name}</div>
                                <div className="color-blue mt-5 font-size-11">{companyProfile.email}</div>
                            </div>
                        </Col>
                        <Col lg="6" xs="12" className="d-flex justify-content-lg-end justify-content-between align-items-end mt-4">
                            <div className="mr-2">
                                <Select
                                    size="large"
                                    style={{ width: 140 }}
                                    defaultValue={demographics_type}
                                    onChange={val => setDemographicsType(val)}
                                >
                                    <Option value="action">Action</Option>
                                    <Option value="participation">Participation</Option>
                                </Select>
                            </div>
                            <div>
                                <Select
                                    size="large"
                                    style={{ width: 140 }}
                                    defaultValue={time}
                                    onChange={val => setTime(val)}
                                >
                                    <Option value="day">Today</Option>
                                    <Option value="week">This Week</Option>
                                    <Option value="month">This Month</Option>
                                    <Option value="year">This Year</Option>
                                </Select>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {renderBody()}
        </>
    )
}

export default AnalyticsLayout;