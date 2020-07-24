import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import ParticipationHistoryItem from './ParticipationHistoryItem'
import {
  getUserInventory,
  getParticipationHistory,
  getUserInProgress,
  getFollowing,
} from '../../../actions/userInfo'
import Loading from '../../common/Loading'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

function ParticipationHistoryLayout(props) {
  const { t } = useTranslation()

  const { history } = props

  const PARTICIPATION_RESULT_SUCCESS = useSelector(state => state.userInfo.SUCCESS_PARTICIPATION_RESULT)
  const GET_PARTICIPATION_HISTORY_PROCESS = useSelector(state => state.userInfo.GET_PARTICIPATION_HISTORY)
  const userParticipationHistory = useSelector(state => state.userInfo.userParticipationHistory)

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

  const [selectedId, setSelectedId] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInventory())
    dispatch(getParticipationHistory())
    dispatch(getUserInProgress())
    dispatch(getFollowing())
  }, [])

  useEffect(() => {
    if (PARTICIPATION_RESULT_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_PARTICIPATION_RESULT', data: false })
      history.push(`/participation-result/${selectedId}`)
    }
  }, [PARTICIPATION_RESULT_SUCCESS])

  const handlePagination = (value) => {
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderHistoryList = () => {
    return (
      userParticipationHistory.slice(minValue, maxValue).map((item, index) =>
        <div key={index} className="promotion-list-item-container">
          <ParticipationHistoryItem item={item} setSelectedId={(id) => setSelectedId(id)} />
        </div>
      )
    )
  }

  if (GET_PARTICIPATION_HISTORY_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <div className="min-height-container">
      {renderHistoryList()}
      {userParticipationHistory.length < 1 && (
        <div className="empty-result mt-5">
          <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
        </div>
      )}
      <Pagination
        responsive
        defaultCurrent={1}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={userParticipationHistory.length}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default withRouter(ParticipationHistoryLayout)