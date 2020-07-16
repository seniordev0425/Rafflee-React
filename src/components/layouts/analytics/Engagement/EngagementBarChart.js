import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { isMobile } from 'react-device-detect'

import { useTranslation } from 'react-i18next'

function EngagementBarChart() {
  const { t } = useTranslation()

  const [data, setData] = useState({
    dataLine: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: t('analytics_page.users'),
          backgroundColor: "#0091ff",
          borderColor: "#0091ff",
          data: [65, 59, 80, 81, 56, 55, 40, 38, 49, 22, 14, 560],
          borderWidth: 1
        },
      ]
    }
  })

  return (
    <div className="default-border p-1 p-sm-4">
      <div className="d-flex mb-4">
        <div className="font-size-11 font-weight-bold">{t('analytics_page.engagement_score_by_day')}</div>
      </div>

      <Bar data={data.dataLine} height={isMobile ? 150 : 100} options={{ responsive: true, legend: false, scales: { xAxes: [{ gridLines: { display: false }, barPercentage: 0.1 }] } }} />

    </div>
  )
}

export default EngagementBarChart;