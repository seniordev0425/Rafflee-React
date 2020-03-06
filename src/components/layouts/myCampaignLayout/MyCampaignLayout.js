import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import MyCampaignItem from './MyCampaignItem'
import Loading from '../../common/Loading'

import {getMyCampaigns} from '../../../apis/apiCalls'
import LivePageLayout from './LivePageLayout'
import ParticipantListLayout from './ParticipantListLayout'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

function MyCampaignLayout(){

    const [isLoading, setIsLoading] = useState(false)
    const [campaignList, setCampaignList] = useState([])

    const [live_page_id, setLivePageId] = useState(null)
    const [participant_id, setParticipantId] = useState(null)
    
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)



    useEffect(() => {
        setIsLoading(true)

        getMyCampaigns()
        .then(response => response.text())
        .then(result => {
            setIsLoading(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){       
                setCampaignList(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));
    },[])

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
        return(
            <>
            {campaignList.slice(minValue, maxValue).map((item, index) => 
                <div key={index} className="promotion-list-item-container">        
                    <MyCampaignItem item={item} goToLivePage={goToLivePage} goToParticipatePage={goToParticipatePage}/>
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
        return <Loading/>
    }

    return(
        <>
            {live_page_id ? (<LivePageLayout id={live_page_id} goBack={goToLivePage}/>) : (participant_id ? <ParticipantListLayout goBack={goToParticipatePage}/> :  renderMyCampaignList())}
        </>
    )
}

export default MyCampaignLayout;