import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Offer from './Offer'

import { getRecruitments } from '../../../../../../actions/homepage'

import { NUMBER_PER_PAGE } from '../../../../../../utils/constants'

const OffersPanel = ({ onChangeSection, currentPage, onChangeCurrentPage }) => {
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
    <div>
      <div className="min-height-container">
        {recruitmentData.recruitments.map((recruitment, index) => (
          <div key={index} className="promotion-list-item-container">
            <Offer
              recruitment={recruitment}
              loading={GET_RECRUITMENTS_PROCESS}
              onChangeSection={onChangeSection}
            />
          </div>
        ))}
        {!GET_RECRUITMENTS_PROCESS && recruitmentData.recruitments.length < 1 && (
          <div className="empty-result mt-5">
            <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
          </div>
        )}
      </div>
      <Pagination
        responsive
        current={currentPage}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={recruitmentData.nbr_of_recruitments}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default OffersPanel