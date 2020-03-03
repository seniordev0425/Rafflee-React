import React, { useState, useEffect } from 'react'
import MyCampaignItem from './MyCampaignItem'
import Loading from '../../common/Loading'

import {getMyCampaigns} from '../../../apis/apiCalls'
import LivePageLayout from './LivePageLayout'
import ParticipantListLayout from './ParticipantListLayout'

function MyCampaignLayout(){

    const [isLoading, setIsLoading] = useState(false)
    const [campaignList, setCampaignList] = useState([])

    const [live_page_id, setLivePageId] = useState(null)
    const [participant_id, setParticipantId] = useState(null)


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

    const renderMyCampaignList = () => {
        return(
            campaignList.map((item, index) => 
                <div key={index} className="promotion-list-item-container">        
                    <MyCampaignItem item={item} goToLivePage={goToLivePage} goToParticipatePage={goToParticipatePage}/>
                </div>
            )
        )        
    }

    if (isLoading) {
        return <Loading/>
    }

    return(
        <>
            {live_page_id ? (<LivePageLayout goBack={goToLivePage}/>) : (participant_id ? <ParticipantListLayout goBack={goToParticipatePage}/> :  renderMyCampaignList())}
        </>
    )
}

export default MyCampaignLayout;