import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import BeingCreatedItem from './BeingCreatedItem'
import Loading from '../../common/Loading'

import { NUMBER_PER_PAGE } from '../../../utils/constants'

import {
  getBeingCreatedCampaigns,
  deleteBeingCreatedCampaign
} from '../../../actions/campaign'

const BeingCreatedLayout = () => {

  const beingCreatedCampaigns = useSelector(state => state.campaign.beingCreatedCampaigns)
  const GET_BEING_CREATED_CAMPAIGNS_PROCESS = useSelector(state => state.userInfo.GET_BEING_CREATED_CAMPAIGNS)

  const dispatch = useDispatch()

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)

  const [beingDeletedPK, setBeingDeltedPK] = useState('')

  const handlePagination = (value) => {
    setCurrentPage(value)
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  useEffect(() => {
    dispatch(getBeingCreatedCampaigns())
  }, [])

  const deleteCampaign = (pk) => {
    setBeingDeltedPK(pk)
    dispatch(deleteBeingCreatedCampaign(pk))
  }

  if (GET_BEING_CREATED_CAMPAIGNS_PROCESS) {
    return <div className="min-height-container"><Loading /></div>
  }

  return (
    <div className="min-height-container">
      {beingCreatedCampaigns.slice(minValue, maxValue).map((item, index) =>
        <div key={index} className="promotion-list-item-container">
          <BeingCreatedItem
            item={item}
            onDeleteCampaign={deleteCampaign}
            beingDeletedPK={beingDeletedPK}
          />
        </div>
      )}
      <Pagination
        responsive
        defaultCurrent={currentPage}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={beingCreatedCampaigns.length}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default BeingCreatedLayout