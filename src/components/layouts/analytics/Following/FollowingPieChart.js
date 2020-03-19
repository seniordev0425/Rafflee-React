import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

import { useTranslation } from 'react-i18next'

function FollowingPieChart() {
    const { t } = useTranslation()

    const [data, setData] = useState({
        dataLine: {
            labels: [t('analytics_page.campaign'), t('analytics_page.lost'), t('analytics_page.circle')],
            datasets: [
                {
                    data: [100, 200, 300],
                    backgroundColor: ["#0091FF", "#0DCDE1", "#7479EE"],
                    weight: 2
                },  
            ]
        }
    })

    return(
        <div>
            <div className="d-flex mb-4">
                <div className="font-size-11 font-weight-bold">{t('analytics_page.following_data')}</div>
            </div>            
            <Doughnut data={data.dataLine} height={210} options={{responsive: true, legend: false, cutoutPercentage: 70}}/>
        </div>
    )
}

export default FollowingPieChart;