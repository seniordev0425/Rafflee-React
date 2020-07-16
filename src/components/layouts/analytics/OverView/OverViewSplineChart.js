import React, { useState, useEffect } from 'react'
import { Row, Col } from 'reactstrap'
import { Line } from 'react-chartjs-2'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function SplineChart(props) {
  const { t } = useTranslation()

  const { overviewFollowersArr, time } = props

  const getLabelArr = () => {
    let labelArr = []
    overviewFollowersArr[time].map((item) => {
      if (time === 'year') labelArr.push(moment(item.date).format('MMM'))
      else labelArr.push(moment(item.date).format('M.D'))
    })
    return labelArr
  }

  const getFollowers = (name) => {
    let followers = []
    overviewFollowersArr[time].map((item) => {
      followers.push(item[name])
    })
    return followers
  }

  const [data, setData] = useState({
    dataLine: {
      labels: getLabelArr(),
      datasets: [
        {
          label: t('analytics_page.rafflee'),
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 255,255, .3)",
          borderColor: "#aaaaaa",
          borderCapStyle: "butt",
          borderDash: [],
          borderWidth: isMobile ? 1 : 3,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#aaaaaa",
          pointBackgroundColor: "#aaaaaa",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#aaaaaa",
          pointHoverBorderColor: "#aaaaaa",
          pointHoverBorderWidth: 2,
          pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getFollowers('rafflee')
        },
        {
          label: t('analytics_page.twitter'),
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 255,255, .3)",
          borderColor: "#0091ff",
          borderCapStyle: "butt",
          borderDash: [],
          borderWidth: isMobile ? 1 : 3,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#0091ff",
          pointBackgroundColor: "#0091ff",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#0091ff",
          pointHoverBorderColor: "#0091ff",
          pointHoverBorderWidth: 2,
          pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getFollowers('twitter')
        },
        {
          label: t('analytics_page.twitch'),
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 255,255, .3)",
          borderColor: "#7e3aac",
          borderCapStyle: "butt",
          borderDash: [],
          borderWidth: isMobile ? 1 : 3,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#7e3aac",
          pointBackgroundColor: "#7e3aac",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#7e3aac",
          pointHoverBorderColor: "#7e3aac",
          pointHoverBorderWidth: 2,
          pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getFollowers('twitch')
        }
      ]
    }
  })

  useEffect(() => {
    setData({
      dataLine: {
        labels: getLabelArr(),
        datasets: [
          {
            label: t('analytics_page.rafflee'),
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(255, 255,255, .3)",
            borderColor: "#aaaaaa",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: isMobile ? 1 : 3,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#aaaaaa",
            pointBackgroundColor: "#aaaaaa",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#aaaaaa",
            pointHoverBorderColor: "#aaaaaa",
            pointHoverBorderWidth: 2,
            pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getFollowers('rafflee')
          },
          {
            label: t('analytics_page.twitter'),
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(255, 255,255, .3)",
            borderColor: "#0091ff",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: isMobile ? 1 : 3,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#0091ff",
            pointBackgroundColor: "#0091ff",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#0091ff",
            pointHoverBorderColor: "#0091ff",
            pointHoverBorderWidth: 2,
            pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getFollowers('twitter')
          },
          {
            label: t('analytics_page.twitch'),
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(255, 255,255, .3)",
            borderColor: "#4103a2",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: isMobile ? 1 : 3,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#4103a2",
            pointBackgroundColor: "#4103a2",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#4103a2",
            pointHoverBorderColor: "#4103a2",
            pointHoverBorderWidth: 2,
            pointRadius: overviewFollowersArr[time].length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getFollowers('twitch')
          }
        ]
      }
    })
  }, [time])

  return (
    <div className="default-border p-2 p-sm-4">
      <div className="mb-4">
        <Row>
          <Col xs="12" md="6" className="p-0">
            <div className="font-size-11 font-weight-bold">{t('analytics_page.followers')}</div>
          </Col>
          <Col xs="12" md="6" className="p-0 d-flex justify-content-start justify-content-md-end">
            <div className="font-size-9 font-weight-bold">
              <span style={{ width: 10, height: 10, background: "#aaaaaa", borderRadius: 3, display: "inline-block" }} />
              <span className="ml-2 mr-3 font-size-8">{t('analytics_page.rafflee')}</span>
              <span style={{ width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block" }} />
              <span className="ml-2 mr-3 font-size-8">{t('analytics_page.twitter')}</span>
              <span style={{ width: 10, height: 10, background: "#4103a2", borderRadius: 3, display: "inline-block" }} />
              <span className="ml-2 mr-3 font-size-8">{t('analytics_page.twitch')}</span>
              <span style={{ width: 10, height: 10, background: "#3b5999", borderRadius: 3, display: "inline-block" }} />
              <span className="ml-2 mr-3 font-size-8">{t('analytics_page.facebook')}</span>
              <span style={{ width: 10, height: 10, background: "#7e3aac", borderRadius: 3, display: "inline-block" }} />
              <span className="ml-2 font-size-8">{t('analytics_page.instagram')}</span>
            </div>
          </Col>
        </Row>
      </div>
      <Line
        data={data.dataLine}
        height={isMobile ? 150 : 100}
        options={
          {
            responsive: true,
            legend: false,
            scales: {
              xAxes: [{
                gridLines: { display: false }
              }],
              yAxes: [{
                ticks: {
                  beginAtZero: true,
                  userCallback: function (label, index, labels) {
                    if (Math.floor(label) === label) {
                      return label;
                    }

                  },
                }
              }],
            }
          }
        } />
    </div>
  )
}

export default SplineChart;
