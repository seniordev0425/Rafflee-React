import React, { useState } from 'react'
import { Line } from 'react-chartjs-2'

import { useTranslation } from 'react-i18next'

function AudienceSplineChart() {
    const { t } = useTranslation()

    const [data, setData] = useState({
        dataLine: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: t('analytics_page.users'),
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "rgba(255, 255,255, .3)",
                    borderColor: "#0091ff",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderWidth: 5,
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    pointBorderColor: "rgb(205, 130,1 58)",
                    pointBackgroundColor: "rgb(255, 255, 255)",
                    pointBorderWidth: 10,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: "#0091ff",
                    pointHoverBorderColor: "#0091ff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 0,
                    pointHitRadius: 10,
                    data: [65, 59, 80, 81, 56, 55, 40, 38, 49, 22, 14, 56]
                },

            ]
        }
    })
    return (
        <>
            <div className="d-flex justify-content-between mb-4">
                <div className="font-size-11 font-weight-bold">{t('analytics_page.audience_growth')}</div>
                <div>
                    <div className="font-size-9 font-weight-bold">
                        <span style={{ width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block" }} />
                        <span className="ml-2 font-size-8">{t('analytics_page.users')}</span>

                    </div>
                </div>
            </div>
            <Line data={data.dataLine} options={{ responsive: true, legend: false, scales: { xAxes: [{ gridLines: { display: false } }] } }} />
        </>
    )
}

export default AudienceSplineChart;
