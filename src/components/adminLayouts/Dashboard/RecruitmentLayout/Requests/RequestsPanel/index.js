import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Loading from '../../../../../../components/common/Loading'
import Request from './Request'

import { getRecruitmentApplies } from '../../../../../../actions/admin/recruitment'

import { NUMBER_PER_PAGE } from '../../../../../../utils/constants'

const OffersPanel = ({ onChangeSection, currentPage, onChangeCurrentPage }) => {
  const { t } = useTranslation()

  const ADMIN_GET_RECRUITMENT_APPLIES_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_RECRUITMENT_APPLIES)
  const appliesData = useSelector(state => state.adminRecruitment.appliesData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecruitmentApplies(currentPage))
  }, [currentPage])

  const handlePagination = (value) => {
    onChangeCurrentPage(value)
  }

  return (
    <div>
      <div className="min-height-container">
        {appliesData.request_job.map((request, index) => (
          <div key={index} className="promotion-list-item-container">
            <Request
              request={request}
              loading={ADMIN_GET_RECRUITMENT_APPLIES_PROCESS}
              onChangeSection={onChangeSection}
            />
          </div>
        ))}
        {!ADMIN_GET_RECRUITMENT_APPLIES_PROCESS && appliesData.request_job.length < 1 && (
          <div className="empty-result mt-5">
            <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
          </div>
        )}
        {ADMIN_GET_RECRUITMENT_APPLIES_PROCESS && appliesData.request_job.length < 1 && (
          <Loading />
        )}
      </div>
      <Pagination
        responsive
        current={currentPage}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={appliesData.nbr_of_apply_job}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default OffersPanel