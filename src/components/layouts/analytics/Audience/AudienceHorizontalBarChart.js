import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { HorizontalBar } from 'react-chartjs-2'
import { isMobile } from 'react-device-detect'
import { Select } from 'antd'
import { getParticipantsByAge } from '../../../../actions/analytics'
import { useTranslation } from 'react-i18next'

const { Option } = Select



function AudienceHorizontalBarChart({ campaignID }) {
  const { t } = useTranslation()

  const GET_PARTICIPANTS_BY_AGE_PROCESS = useSelector(state => state.userInfo.GET_PARTICIPANTS_BY_AGE)
  const participantsRangeByAge = useSelector(state => state.analytics.participantsRangeByAge)
  const dispatch = useDispatch()

  const [gender, setGender] = useState("all")

  useEffect(() => {
    //Reload participants range data whenever gender or campaignID changes
    dispatch(getParticipantsByAge(campaignID, gender))
  }, [gender, campaignID])

  const [data, setData] = useState({
    dataLine: {
      labels: ["13-17", "18-24", "25-34", "35-44", "45-54", "55-65", "65+"],
      datasets: [
        {
          label: t('analytics_page.users'),
          backgroundColor: "#0091ff",
          borderColor: "#0091ff",
          data: [
            participantsRangeByAge.range_percentage['13_17'],
            participantsRangeByAge.range_percentage['18_24'],
            participantsRangeByAge.range_percentage['25_34'],
            participantsRangeByAge.range_percentage['35_44'],
            participantsRangeByAge.range_percentage['45_54'],
            participantsRangeByAge.range_percentage['55_65'],
            participantsRangeByAge.range_percentage['65']
          ],
          users: [
            participantsRangeByAge.range['13_17'],
            participantsRangeByAge.range['18_24'],
            participantsRangeByAge.range['25_34'],
            participantsRangeByAge.range['35_44'],
            participantsRangeByAge.range['45_54'],
            participantsRangeByAge.range['55_65'],
            participantsRangeByAge.range['65']
          ],
          borderWidth: 1
        },
      ]
    }
  })

  return (
    <div>
      <div className="d-block d-sm-flex justify-content-between align-items-center mb-4 mt-2 mt-sm-0">
        <div className="font-size-11 font-weight-bold">{t('analytics_page.engagement_score_by_day')}</div>
        <Select
          size="large"
          style={{ width: 140 }}
          defaultValue="all"
          onChange={val => setGender(val)}
        >
          <Option value="all">{t('analytics_page.all')}</Option>
          <Option value="male">{t('analytics_page.male')}</Option>
          <Option value="female">{t('analytics_page.female')}</Option>
        </Select>
      </div>

      <HorizontalBar
        data={data.dataLine}
        height={isMobile ? 150 : 250}
        options={{
          responsive: true,
          legend: false,
          scales: {
            xAxes: [{ 
              gridLines: { display: false }, 
              barPercentage: 0.1,
              ticks: {
                userCallback: (label) => {
                  return `${label}%`
                }
              } 
            }],
            yAxes: [{ gridLines: { display: false } }]
          },
          tooltips: {
            callbacks: {
              title: (tooltipItem, data) => {
                return data.labels[tooltipItem[0].index] + ': ' + data.datasets[0]['users'][tooltipItem[0].index] + ' users';
              },
              label: (tooltipItem, data) => {
                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
              },
            }
          }
        }}
      />
    </div>
  )
}

export default AudienceHorizontalBarChart