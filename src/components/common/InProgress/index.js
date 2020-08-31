import React from 'react'
import AppLayout from '../../layouts/AppLayout'
import { useTranslation } from 'react-i18next'

const InProgress = () => {
  const { t } = useTranslation()
  return (
    <AppLayout>
      <div className="font-size-16 color-blue font-weight-bold d-flex justify-content-center align-items-center max-height-container">
        <span>
          {t('in_progress')}
        </span>
      </div>
    </AppLayout>
  )
}

export default InProgress