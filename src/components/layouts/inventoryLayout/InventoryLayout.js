import React from 'react'
import InventoryItem from './InventoryItem'

function InventoryLayout(){
    return(
        <>
            <div className="promotion-list-item-container"> 
                <InventoryItem/>    
            </div>       
            <div className="promotion-list-item-container"> 
                <InventoryItem/>    
            </div>       
            <div className="promotion-list-item-container"> 
                <InventoryItem/>    
            </div>             
        </>
    )
}

export default InventoryLayout;