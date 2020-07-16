import React, { useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { isMobile } from 'react-device-detect'
import moment from 'moment'

import { useTranslation } from 'react-i18next'

function SplineChart(props) {
  const { t } = useTranslation()

  const { clicksData, time, campaignID } = props

  const getLabelArr = () => {
    let labelArr = []
    clicksData.map((item) => {
      if (time === 'year') labelArr.push(moment(item.date).format('MMM'))
      else labelArr.push(moment(item.date).format('M.D'))
    })
    return labelArr
  }

  const getClicks = (name) => {
    let clicks = []
    clicksData.map((item) => {
      clicks.push(item[name])
    })
    return clicks
  }

  const [data, setData] = useState({
    dataLine: {
      labels: getLabelArr(),
      datasets: [
        {
          label: t('analytics_page.benefit_by_view'),
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
          pointRadius: clicksData.length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getClicks('product_benefit_by_view')
        },
        {
          label: t('analytics_page.benefit_by_action'),
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
          pointRadius: clicksData.length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getClicks('product_benefit_by_action')
        },
        {
          label: t('analytics_page.benefit_by_participation'),
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
          pointRadius: clicksData.length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getClicks('product_benefit_by_participations')
        },
        {
          label: t('analytics_page.benefit_by_total'),
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 255,255, .3)",
          borderColor: "#0dcde1",
          borderCapStyle: "butt",
          borderDash: [],
          borderWidth: isMobile ? 1 : 3,
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "#0dcde1",
          pointBackgroundColor: "#0dcde1",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "#0dcde1",
          pointHoverBorderColor: "#0dcde1",
          pointHoverBorderWidth: 2,
          pointRadius: clicksData.length === 1 ? 2 : 0,
          pointHitRadius: 10,
          data: getClicks('product_benefit_by_total')
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
            label: t('analytics_page.benefit_by_view'),
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
            pointRadius: clicksData.length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getClicks('product_benefit_by_view')
          },
          {
            label: t('analytics_page.benefit_by_action'),
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
            pointRadius: clicksData.length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getClicks('product_benefit_by_action')
          },
          {
            label: t('analytics_page.benefit_by_participation'),
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
            pointRadius: clicksData.length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getClicks('product_benefit_by_participations')
          },
          {
            label: t('analytics_page.benefit_by_total'),
            fill: true,
            lineTension: 0.3,
            backgroundColor: "rgba(255, 255,255, .3)",
            borderColor: "#0dcde1",
            borderCapStyle: "butt",
            borderDash: [],
            borderWidth: isMobile ? 1 : 3,
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "#0dcde1",
            pointBackgroundColor: "#0dcde1",
            pointBorderWidth: 10,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#0dcde1",
            pointHoverBorderColor: "#0dcde1",
            pointHoverBorderWidth: 2,
            pointRadius: clicksData.length === 1 ? 2 : 0,
            pointHitRadius: 10,
            data: getClicks('product_benefit_by_total')
          }
        ]
      }
    })
  }, [time, campaignID])

  return (
    <div className="default-border p-2 p-sm-4">
      <div className="d-sm-flex d-block justify-content-between mb-4">
        <div className="font-size-11 font-weight-bold">{t('analytics_page.product_benefit')}</div>
        <div>
          <div className="font-size-9 font-weight-bold">
            <span style={{ width: 10, height: 10, background: "#aaaaaa", borderRadius: 3, display: "inline-block" }} />
            <span className="ml-2 mr-3 font-size-8">{t('analytics_page.benefit_by_view')}</span>
            <span style={{ width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block" }} />
            <span className="ml-2 mr-3 font-size-8">{t('analytics_page.benefit_by_action')}</span>
            <span style={{ width: 10, height: 10, background: "#7e3aac", borderRadius: 3, display: "inline-block" }} />
            <span className="ml-2 mr-3 font-size-8">{t('analytics_page.benefit_by_participation')}</span>
            <span style={{ width: 10, height: 10, background: "#0dcde1", borderRadius: 3, display: "inline-block" }} />
            <span className="ml-2 font-size-8">{t('analytics_page.benefit_by_total')}</span>
          </div>
        </div>
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
                  beginAtZero: true
                }
              }],
            }
          }
        } />
    </div>
  )
}

export default SplineChart;
