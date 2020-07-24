import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import InventoryItem from './InventoryItem'
import {
  getUserInventory,
  getParticipationHistory,
  getUserInProgress,
  getFollowing
} from '../../../actions/userInfo'
import Loading from '../../common/Loading'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

function InventoryLayout() {
  const { t } = useTranslation()

  const GET_USER_INVENTORY_PROCESS = useSelector(state => state.userInfo.GET_USER_INVENTORY)
  const userInventory = useSelector(state => state.userInfo.userInventory)

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserInventory())
    dispatch(getParticipationHistory())
    dispatch(getUserInProgress())
    dispatch(getFollowing())
  }, [])

  const handlePagination = (value) => {
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderInventoryList = () => {
    return (
      userInventory.slice(minValue, maxValue).map((item, index) =>
        <div key={index} className="promotion-list-item-container">
          <InventoryItem item={item} />
        </div>
      )
    )
  }

  if (GET_USER_INVENTORY_PROCESS) return <div className="min-height-container"><Loading /></div>

  return (
    <div className="min-height-container">
      {renderInventoryList()}
      {userInventory.length < 1 && (
        <div className="empty-result mt-5">
          <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
        </div>
      )}
      <Pagination
        responsive
        defaultCurrent={1}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={userInventory.length}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default withRouter(InventoryLayout)