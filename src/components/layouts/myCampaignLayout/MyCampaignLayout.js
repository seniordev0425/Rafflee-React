import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import MyCampaignItem from './MyCampaignItem'
import Loading from '../../common/Loading'

import { getMyCampaigns } from '../../../actions/userInfo'
import LivePageLayout from './LivePageLayout'
import ParticipantListLayout from './ParticipantListLayout'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

function MyCampaignLayout() {

  const isLoading = useSelector(state => state.userInfo.GET_MY_CAMPAIGNS)
  const campaignList = useSelector(state => state.userInfo.myCampaigns)
  const dispatch = useDispatch()

  const [live_page_id, setLivePageId] = useState(null)
  const [participant_id, setParticipantId] = useState(null)

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // This action is to load my campaigns
    dispatch(getMyCampaigns())
  }, [])

  const goToLivePage = (val) => {
    // Set live page as current page
    setLivePageId(val)
    setParticipantId(null)
  }

  const goToParticipatePage = (val) => {
    // Set participant page as current page
    setLivePageId(null)
    setParticipantId(val)
  }

  const handlePagination = (value) => {
    setCurrentPage(value)
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderMyCampaignList = () => {
    return (
      <>
        {campaignList.slice(minValue, maxValue).map((item, index) =>
          <div key={index} className="promotion-list-item-container">
            <MyCampaignItem item={item} goToLivePage={goToLivePage} goToParticipatePage={goToParticipatePage} />
          </div>
        )}
        <Pagination
          responsive
          defaultCurrent={currentPage}
          defaultPageSize={NUMBER_PER_PAGE}
          onChange={handlePagination}
          total={campaignList.length}
          className="py-5 d-flex justify-content-center"
        />
      </>
    )
  }

  if (isLoading) {
    return <div className="min-height-container"><Loading /></div>
  }

  return (
    <div className="min-height-container">
      {live_page_id
        ?
        (<LivePageLayout id={live_page_id} goBack={goToLivePage} />)
        :
        (participant_id ? <ParticipantListLayout id={participant_id} goBack={goToParticipatePage} /> : renderMyCampaignList())
      }
    </div>
  )
}

export default MyCampaignLayout