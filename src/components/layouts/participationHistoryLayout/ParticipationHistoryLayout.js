import React from 'react'
import ParticipationHistoryItem from './ParticipationHistoryItem'

function ParticipationHistoryLayout(){
    return(
        <>
            <div className="promotion-list-item-container"> 
                <ParticipationHistoryItem/>    
            </div>       
            <div className="promotion-list-item-container"> 
                <ParticipationHistoryItem/>    
            </div>       
            <div className="promotion-list-item-container"> 
                <ParticipationHistoryItem/>    
            </div>             
        </>
    )
}

export default ParticipationHistoryLayout;