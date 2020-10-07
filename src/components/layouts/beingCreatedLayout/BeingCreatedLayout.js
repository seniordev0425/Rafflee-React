import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Loading from '../../common/Loading'

import { getBeingCreatedCampaigns } from '../../../actions/campaign'

const BeingCreatedLayout = () => {

  const beingCreatedCampaigns = useSelector(state => state.campaign.beingCreatedCampaigns)
  const GET_BEING_CREATED_CAMPAIGNS_PROCESS = useSelector(state => state.userInfo.GET_BEING_CREATED_CAMPAIGNS)

  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getBeingCreatedCampaigns())
  }, [])

  if (GET_BEING_CREATED_CAMPAIGNS_PROCESS) {
    return <div className="min-height-container"><Loading /></div>
  }
  return (
    <div>

    </div>
  )
}

export default BeingCreatedLayout