import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import { Progress, Tooltip } from 'antd'
import ColorBar from '../../../common/ColorBar'
import FollowingPieChart from './FollowingPieChart'
import { getFollowingGender } from '../../../../actions/analytics'

import { useTranslation } from 'react-i18next'
import { T } from 'antd/lib/upload/utils'

function Following() {
  const { t } = useTranslation()

  const followingGender = useSelector(state => state.analytics.followingGender)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFollowingGender())
  }, [])

  return (
    <div className="mx-0 mx-sm-3">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x followers-container justify-content-between">
          <div className="audience-bottom-div d-flex flex-column justify-content-between">
            <div className="default-border p-4">
              <div>
                <span className="font-weight-bold font-size-11">{t('analytics_page.campaign_followers')}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div className="font-weight-bold font-size-20">+3939</div>
                <div className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+348)</div>
              </div>
              <ColorBar width={156} color="#0091ff" />
            </div>
            <div className="default-border p-4 mt-3 mt-sm-0">
              <div>
                <span className="font-weight-bold font-size-11">{t('analytics_page.circle_followers')}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div className="font-weight-bold font-size-20">+3939</div>
                <div className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+348)</div>
              </div>
              <ColorBar width={156} color="#7479EE" />
            </div>
            <div className="default-border p-4 mt-3 mt-sm-0">
              <div>
                <span className="font-weight-bold font-size-11">{t('analytics_page.lost_followers')}</span>
              </div>
              <div className="mt-3 d-flex justify-content-between">
                <div className="font-weight-bold font-size-20">+3939</div>
                <div className="font-size-11 mt-3" style={{ color: "#55C97B" }}>(+348)</div>
              </div>
              <ColorBar width={156} color="#0DCDE1" />
            </div>
          </div>
          <div className="audience-bottom-div default-border p-4">
            <FollowingPieChart />
            <div className="d-flex justify-content-between mt-5">
              <div>
                <div className="font-weight-bold font-size-20 color-blue text-center">100</div>
                <div className="font-size-10 text-center">{t('analytics_page.campaign')}</div>
              </div>
              <div>
                <div className="font-weight-bold font-size-20 color-purple text-center">8456</div>
                <div className="font-size-10 text-center">{t('analytics_page.circle')}</div>
              </div>
              <div>
                <div className="font-weight-bold font-size-20 color-green text-center">5878</div>
                <div className="font-size-10 text-center">{t('analytics_page.lost')}</div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="default-border p-4 mb-5 d-flex justify-content-between flex-column">
            <div className="d-flex justify-content-between">
              <div className="font-size-13 font-weight-bold">{t('analytics_page.following_base')}</div>
              <div className="font-size-9 font-weight-bold">
                <span style={{ width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block" }} />
                <span className="ml-2 font-size-8">{t('analytics_page.users')}</span>
              </div>
            </div>
            <div className="d-flex font-size-10 mt-4">
              <div style={{ width: "25%" }}>{t('analytics_page.male')}</div>
              <div style={{ width: "75%" }}>
                <Tooltip title={`${t('analytics_page.male')}: ${followingGender.male}`} color='#0091ff'>
                  <Progress strokeWidth={10} percent={followingGender.percentage_male} status='normal' />
                </Tooltip>
              </div>
            </div>
            <div className="d-flex font-size-10 mt-4">
              <div style={{ width: "25%" }}>{t('analytics_page.female')}</div>
              <div style={{ width: "75%" }}>
                <Tooltip title={`${t('analytics_page.female')}: ${followingGender.female}`} color='#0091ff'>
                  <Progress strokeWidth={10} percent={followingGender.percentage_female} status='normal' />
                </Tooltip>
              </div>
            </div>
            <div className="d-flex font-size-10 mt-4">
              <div style={{ width: "25%" }}>{t('analytics_page.unknown')}</div>
              <div style={{ width: "75%" }}>
                <Tooltip title={`${t('analytics_page.unknown')}: ${followingGender.unknow}`} color='#0091ff'>
                  <Progress strokeWidth={10} percent={followingGender.percentage_unknow} status='normal' />
                </Tooltip>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Following;