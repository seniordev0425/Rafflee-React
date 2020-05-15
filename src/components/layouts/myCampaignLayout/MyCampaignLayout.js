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

    const isLoading = useSelector(state => state.userInfo.GET_MY_CAMPAIGNS_SUCCESS)
    const campaignList = useSelector(state => state.userInfo.myCampaigns)
    const dispatch = useDispatch()

    const [live_page_id, setLivePageId] = useState(null)
    const [participant_id, setParticipantId] = useState(null)

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    useEffect(() => {
        dispatch(getMyCampaigns())
    }, [])

    const goToLivePage = (val) => {
        setLivePageId(val)
        setParticipantId(null)
    }

    const goToParticipatePage = (val) => {
        setLivePageId(null)
        setParticipantId(val)
    }

    const handlePagination = (value) => {
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
                    defaultCurrent={1}
                    defaultPageSize={NUMBER_PER_PAGE}
                    onChange={handlePagination}
                    total={campaignList.length}
                    className="py-5 d-flex justify-content-center"
                />
            </>
        )
    }

    if (isLoading) {
        return <Loading />
    }

    return (
        <>
            {live_page_id
                ?
                (<LivePageLayout id={live_page_id} goBack={goToLivePage} />)
                :
                (participant_id ? <ParticipantListLayout id={participant_id} goBack={goToParticipatePage} /> : renderMyCampaignList())
            }
        </>
    )
}

export default MyCampaignLayout