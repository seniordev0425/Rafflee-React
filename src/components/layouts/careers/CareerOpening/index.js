import React from 'react'
import OpeningJob from './OpeningJob'
import SubmitForm from './SubmitForm'

import { useTranslation } from 'react-i18next'

const CareerOpening = () => {
  const { t } = useTranslation()

  return (
    <div className="px-3">
      <div className="d-flex justify-content-between">
        <div className="shadow-text-blue font-size-16 font-weight-bold">
          {t('career_page.available_job_offers')}
        </div>
        <div className="color-gray font-size-12">
          {`2 ${t('career_page.jobs')}`}
        </div>
      </div>

      <div className="mt-5">
        <OpeningJob title="Live Chat Specialist - APAC" />
      </div>
      <div className="mt-4">
        <OpeningJob title="Live Chat Specialist - APAC" />
      </div>

      <div className="color-blue font-size-14 font-weight-bold mt-5 text-center">
        {t('career_page.dont_have_job')}
      </div>
      <div className="color-gray font-size-10 mt-2 text-center">
        {t('career_page.suprise_us')}
      </div>

      <div className="mt-5">
        <SubmitForm />
      </div>
    </div>
  )
}

export default CareerOpening