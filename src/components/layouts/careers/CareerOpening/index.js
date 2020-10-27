import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import OpeningJob from './OpeningJob'
import SubmitForm from './SubmitForm'

import { getRecruitments } from '../../../../actions/homepage'

import { useTranslation } from 'react-i18next'

const CareerOpening = ({ currentPage, onChangeCurrentPage }) => {
  const { t } = useTranslation()

  const GET_RECRUITMENTS_PROCESS = useSelector(state => state.userInfo.GET_RECRUITMENTS)
  const recruitmentData = useSelector(state => state.homepage.recruitmentData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecruitments(currentPage))
  }, [currentPage])

  const handlePagination = (value) => {
    onChangeCurrentPage(value)
  }


  return (
    <div className="px-3">
      <div className="d-flex justify-content-between">
        <div className="shadow-text-blue font-size-16 font-weight-bold">
          {t('career_page.available_job_offers')}
        </div>
        <div className="color-gray font-size-12">
          {`${recruitmentData.nbr_of_recruitments} ${t('career_page.jobs')}`}
        </div>
      </div>
      {recruitmentData.recruitments.map((recruitment, index) => (
        <div key={index} className="mt-4">
          <OpeningJob
            recruitment={recruitment}
            loading={GET_RECRUITMENTS_PROCESS}
          />
        </div>
      ))}

      <Pagination
        responsive
        current={currentPage}
        defaultPageSize={2}
        onChange={handlePagination}
        total={recruitmentData.nbr_of_recruitments}
        className="py-5 d-flex justify-content-center"
      />

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