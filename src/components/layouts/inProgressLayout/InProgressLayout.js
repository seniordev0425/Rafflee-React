import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../common/Loading'
import {
  getParticipationHistory,
  getUserInventory,
  getUserInProgress,
  getFollowing,
} from '../../../actions/userInfo'
import InProgressItem from './InProgressItem'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

function InProgressLayout() {
  const { t } = useTranslation()

  const GET_USER_IN_PROGRESS_PROCESS = useSelector(state => state.userInfo.GET_USER_IN_PROGRESS)
  const userInProgress = useSelector(state => state.userInfo.userInProgress)

  // min, max values are for pagination
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

  const dispatch = useDispatch()

  useEffect(() => {
    // After render method, call these 4 endpoints.
    dispatch(getUserInProgress())
    dispatch(getUserInventory())
    dispatch(getParticipationHistory())
    dispatch(getFollowing())
  }, [])

  const handlePagination = (value) => {
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderInProgressList = () => {
    return (
      userInProgress.slice(minValue, maxValue).map((item, index) =>
        <div key={index} className="promotion-list-item-container">
          <InProgressItem item={item} />
        </div>
      )
    )
  }

  if (GET_USER_IN_PROGRESS_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <div className="min-height-container">
      {renderInProgressList()}
      {userInProgress.length < 1 && (
        <div className="empty-result mt-5">
          <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
        </div>
      )}
      <Pagination
        responsive
        defaultCurrent={1}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={userInProgress.length}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default InProgressLayout