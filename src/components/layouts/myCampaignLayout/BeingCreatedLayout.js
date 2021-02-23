import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'

import BeingCreatedItem from './BeingCreatedItem'
import Loading from '../../common/Loading'

import { NUMBER_PER_PAGE } from '../../../utils/constants'

import {
  getBeingCreatedCampaigns,
  deleteBeingCreatedCampaign,
  getCampaignBeingCreatedImages
} from '../../../actions/campaign'

const BeingCreatedLayout = () => {

  const beingCreatedCampaigns = useSelector(state => state.campaign.beingCreatedCampaigns)
  const GET_BEING_CREATED_CAMPAIGNS_PROCESS = useSelector(state => state.userInfo.GET_BEING_CREATED_CAMPAIGNS)

  const dispatch = useDispatch()

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)

  const [beingDeletedPK, setBeingDeletedPK] = useState('')
  const [beingUpdatedPK, setBeingUpdatedPK] = useState('')

  const handlePagination = (value) => {
    setCurrentPage(value)
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  useEffect(() => {
    dispatch(getBeingCreatedCampaigns())
  }, [])

  const deleteCampaign = (pk) => {
    setBeingDeletedPK(pk)
    dispatch(deleteBeingCreatedCampaign(pk))
  }

  const onPressUpdate = (pk) => {
    setBeingUpdatedPK(pk)
    dispatch(getCampaignBeingCreatedImages(pk))
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
            onPressUpdate={onPressUpdate}
            beingDeletedPK={beingDeletedPK}
            beingUpdatedPK={beingUpdatedPK}
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