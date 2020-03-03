import React, {useState, useEffect} from 'react'
import MyBillsItem from './MyBillsItem'
import Loading from '../../common/Loading'

import {getMyBills} from '../../../apis/apiCalls'

function MyBillsLayout(){

    const [isLoading, setIsLoading] = useState(false)
    const [billsList, setBillsList] = useState([])

    useEffect(() => {
        setIsLoading(true)

        getMyBills()
        .then(response => response.text())
        .then(result => {
            setIsLoading(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){       
                setBillsList(json_rlt.result_data)
            }
        })
        .catch(error => console.log('error', error));
    },[])

    const renderMyBillsList = () => {
        return(
            billsList.map((item, index) => 
                <div key={index} className="promotion-list-item-container">        
                    <MyBillsItem item={item}/>
                </div>
            )
        )        
    }

    if (isLoading) {
        return <Loading/>
    }

    return(
        <>
            {renderMyBillsList()}
        </>
    )
}

export default MyBillsLayout;