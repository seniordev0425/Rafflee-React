import React from 'react'
import { Pie } from 'react-chartjs-2'

import { useTranslation } from 'react-i18next'

const colors = { male: '#0091FF', female: '#0091ff69', unknown: '#cccccc' }

function AudiencePieChart({ activeGender }) {
  const { t } = useTranslation()

  return (
    <div>
      <div className="d-flex mb-4">
        <div className="font-size-11 font-weight-bold">{t('analytics_page.active_clients')}</div>
      </div>
      <Pie
        data={{
          labels: [t('analytics_page.male'), t('analytics_page.female'), t('analytics_page.unknown')],
          datasets: [
            {
              data: [activeGender.male_percentage, activeGender.female_percentage, activeGender.unknow_percentage],
              backgroundColor: [colors.male, colors.female, colors.unknown],
            },
          ]
        }}
        height={210}
        options={{
          responsive: true,
          legend: false,
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return data['labels'][tooltipItem['index']] + ': ' + data['datasets'][0]['data'][tooltipItem['index']] + '%';
              },
            }
          }
        }}
      />
      <div className="d-flex justify-content-between mt-5 font-weight-bold">
        <div>
          <div className="font-size-20 text-center" style={{ color: colors.male }}>{`${activeGender.male_percentage} %`}</div>
          <div className="font-size-10 text-center color-gray">{t('analytics_page.male')}</div>
        </div>
        <div>
          <div className="font-size-20 text-center" style={{ color: colors.female }}>{`${activeGender.female_percentage} %`}</div>
          <div className="font-size-10 text-center color-gray">{t('analytics_page.female')}</div>
        </div>
        <div>
          <div className="font-size-20 text-center" style={{ color: colors.unknown }}>{`${activeGender.unknow_percentage} %`}</div>
          <div className="font-size-10 text-center color-gray">{t('analytics_page.unknown')}</div>
        </div>
      </div>
    </div>
  )
}

export default AudiencePieChart