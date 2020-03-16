import React, { useState } from 'react'
import { Doughnut } from 'react-chartjs-2'

function FollowingPieChart() {

    const [data, setData] = useState({
        dataLine: {
            labels: ["Campaign", "Lost", "Circle"],
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
                <div className="font-size-11 font-weight-bold">Following Data</div>
            </div>            
            <Doughnut data={data.dataLine} height={210} options={{responsive: true, legend: false, cutoutPercentage: 70}}/>
        </div>
    )
}

export default FollowingPieChart;