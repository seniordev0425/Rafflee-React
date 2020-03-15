import React, { useState } from 'react'
import { Line, Bar } from 'react-chartjs-2'

function SplineChart() {
    
    const [data, setData] = useState({
        dataLine: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                label: "Views",
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
                {
                label: "Clicks",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(30, 30, 30, .05)",
                borderColor: "#ffffff",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgba(30, 30, 30, .05)",
                pointBackgroundColor: "rgba(30, 30, 30, .05)",
                pointBorderWidth: 10,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(30, 30, 30, .05)",
                pointHoverBorderColor: "rgba(30, 30, 30, .05)",
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                pointHitRadius: 10,
                data: [28, 48, 40, 19, 86, 27, 90, 87, 28, 47, 27, 34]
                }
            ]
        }
    })
    return (
        <div className="default-border p-4">
            <div className="d-flex justify-content-between mb-4">
                <div className="font-size-11 font-weight-bold">Total Views & Clicks</div>
                <div>
                    <div className="font-size-9 font-weight-bold">
                        <span style={{width: 10, height: 10, background: "#0091ff", borderRadius: 3, display: "inline-block"}}/>
                        <span className="ml-2 mr-5 font-size-8">Views</span>
                        <span style={{width: 10, height: 10, background: "rgba(30, 30, 30, .05)", borderRadius: 3, display: "inline-block"}}/>
                        <span className="ml-2 font-size-8">Clicks</span>
                    </div>
                </div>
            </div>
            
            <Line data={data.dataLine} height={100} options={{responsive: true, legend: false, scales:{xAxes:[{gridLines:{display: false}}]}}}/>
    
        </div>
    )
}

export default SplineChart;
