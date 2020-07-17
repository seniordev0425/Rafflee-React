import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'reactstrap'
import OverViewSplineChart from './OverViewSplineChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faSlidersH } from '@fortawesome/free-solid-svg-icons'
import images from '../../../../utils/images'
import ColorBar from '../../../common/ColorBar'
import Loading from '../../../common/Loading'
import { overviewFollowers } from '../../../../actions/analytics'

import { useTranslation } from 'react-i18next'

function OverView(props) {
  const { t } = useTranslation()

  const { time } = props

  const overviewDayFollowers = useSelector(state => state.analytics.overviewDayFollowers)
  const overviewWeekFollowers = useSelector(state => state.analytics.overviewWeekFollowers)
  const overviewMonthFollowers = useSelector(state => state.analytics.overviewMonthFollowers)
  const overviewYearFollowers = useSelector(state => state.analytics.overviewYearFollowers)

  const OVERVIEW_DAY_FOLLOWERS = useSelector(state => state.userInfo.OVERVIEW_DAY_FOLLOWERS)
  const OVERVIEW_WEEK_FOLLOWERS = useSelector(state => state.userInfo.OVERVIEW_WEEK_FOLLOWERS)
  const OVERVIEW_MONTH_FOLLOWERS = useSelector(state => state.userInfo.OVERVIEW_MONTH_FOLLOWERS)
  const OVERVIEW_YEAR_FOLLOWERS = useSelector(state => state.userInfo.OVERVIEW_YEAR_FOLLOWERS)

  const dispatch = useDispatch()

  const overviewFollowersArr = {
    day: overviewDayFollowers,
    week: overviewWeekFollowers,
    month: overviewMonthFollowers,
    year: overviewYearFollowers
  }

  useEffect(() => {
    dispatch(overviewFollowers('day'))
    dispatch(overviewFollowers('week'))
    dispatch(overviewFollowers('month'))
    dispatch(overviewFollowers('year'))
  }, [])

  const getIncreaseFollowerNumber = (socialName) => {
    let arr_len = overviewFollowersArr[time].length
    if (arr_len === 0) return 0
    else if (arr_len === 1) return overviewFollowersArr[time][0][socialName]
    else return (overviewFollowersArr[time][arr_len - 1][socialName] - overviewFollowersArr[time][0][socialName])
  }

  const getTotalFollowerNumber = (socialName) => {
    let arr_len = overviewFollowersArr[time].length
    if (arr_len === 0) return 0
    return overviewFollowersArr[time][arr_len - 1][socialName]
  }

  if (OVERVIEW_DAY_FOLLOWERS || OVERVIEW_WEEK_FOLLOWERS || OVERVIEW_MONTH_FOLLOWERS || OVERVIEW_YEAR_FOLLOWERS) {
    return <div className="min-height-container"><Loading /></div>
  }

  return (
    <div className="mx-0 mx-sm-3">
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x followers-container">
          <div className="follower-div">
            <div className="d-flex align-items-center">
              <img src={images.rafflee_icon} width="30px" height="30px" alt="" />
              <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.rafflee_followers')}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <span className="font-weight-bold font-size-11">{t('analytics_page.total')}{getTotalFollowerNumber('rafflee')}</span>
              <span
                className="font-size-11 mt-3"
                style={{ color: getIncreaseFollowerNumber('rafflee') >= 0 ? "#55C97B" : "rgb(255, 0, 24)" }}
              >
                ({getIncreaseFollowerNumber('rafflee') >= 0 ? `+${getIncreaseFollowerNumber('rafflee')}` : `${getIncreaseFollowerNumber('rafflee')}`})
              </span>
            </div>
            <ColorBar width={100} color="#0091ff" />
          </div>
          <div className="follower-div">
            <div className="d-flex align-items-center">
              <img src={images.twitter_icon} width="30px" height="30px" alt="" />
              <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.twitter_followers')}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <span className="font-weight-bold font-size-11">{t('analytics_page.total')}{getTotalFollowerNumber('twitter')}</span>
              <span
                className="font-size-11 mt-3"
                style={{ color: getIncreaseFollowerNumber('twitter') >= 0 ? "#55C97B" : "rgb(255, 0, 24)" }}
              >
                ({getIncreaseFollowerNumber('twitter') >= 0 ? `+${getIncreaseFollowerNumber('twitter')}` : `${getIncreaseFollowerNumber('twitter')}`})
              </span>
            </div>
            <ColorBar width={100} color="#0091ff" />
          </div>
          <div className="follower-div">
            <div className="d-flex align-items-center">
              <img src={images.twitch_icon} width="30px" height="30px" alt="" />
              <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.twitch_followers')}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <span className="font-weight-bold font-size-11">{t('analytics_page.total')}{getTotalFollowerNumber('twitch')}</span>
              <span
                className="font-size-11 mt-3"
                style={{ color: getIncreaseFollowerNumber('twitch') >= 0 ? "#55C97B" : "rgb(255, 0, 24)" }}
              >
                ({getIncreaseFollowerNumber('twitch') >= 0 ? `+${getIncreaseFollowerNumber('twitch')}` : `${getIncreaseFollowerNumber('twitch')}`})
              </span>
            </div>
            <ColorBar width={100} color="#0091ff" />
          </div>
          <div className="follower-div">
            <div className="d-flex align-items-center">
              <img src={images.facebook_icon} width="30px" height="30px" alt="" />
              <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.facebook_followers')}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <span className="font-weight-bold font-size-11">{t('analytics_page.total')}{getTotalFollowerNumber('facebook')}</span>
              <span
                className="font-size-11 mt-3"
                style={{ color: getIncreaseFollowerNumber('facebook') >= 0 ? "#55C97B" : "rgb(255, 0, 24)" }}
              >
                ({getIncreaseFollowerNumber('facebook') >= 0 ? `+${getIncreaseFollowerNumber('facebook')}` : `${getIncreaseFollowerNumber('facebook')}`})
              </span>
            </div>
            <ColorBar width={100} color="#0091ff" />
          </div>
          <div className="follower-div">
            <div className="d-flex align-items-center">
              <img src={images.instagram_icon} width="30px" height="30px" alt="" />
              <span className="font-weight-bold font-size-11 ml-3">{t('analytics_page.instagram_followers')}</span>
            </div>
            <div className="d-flex justify-content-between mt-3 align-items-center">
              <span className="font-weight-bold font-size-11">{t('analytics_page.total')}{getTotalFollowerNumber('instagram')}</span>
              <span
                className="font-size-11 mt-3"
                style={{ color: getIncreaseFollowerNumber('instagram') >= 0 ? "#55C97B" : "rgb(255, 0, 24)" }}
              >
                ({getIncreaseFollowerNumber('instagram') >= 0 ? `+${getIncreaseFollowerNumber('instagram')}` : `${getIncreaseFollowerNumber('instagram')}`})
              </span>
            </div>
            <ColorBar width={100} color="#0091ff" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x mt-5">
          <OverViewSplineChart overviewFollowersArr={overviewFollowersArr} time={time} />
        </Col>
      </Row>
      <Row className="my-5">
        <Col xs="12" sm={{ size: 10, offset: 1 }} className="padding-x">
          <div className="default-border">
            <Row className="justify-content-between p-2 p-sm-4">
              <div className="float-left font-weight-bold font-size-11">{t('analytics_page.most_active_users')}</div>
              <div className="float-right">
                <FontAwesomeIcon icon={faSearch} />
                <FontAwesomeIcon icon={faSlidersH} className="ml-3" />
              </div>
            </Row>
            <Row className="justify-content-between p-2 p-sm-4 responsive-font-size-11" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
              <div>Joe Fishman</div>
              <div>Joe24@gmail.com</div>
              <div className="view-profile-link">{t('analytics_page.view_profile')}</div>
            </Row>
            <Row className="justify-content-between p-2 p-sm-4 responsive-font-size-11">
              <div>Joe Fishman</div>
              <div>Joe24@gmail.com</div>
              <div className="view-profile-link">{t('analytics_page.view_profile')}</div>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default OverView;