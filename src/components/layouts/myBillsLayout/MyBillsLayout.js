import React, {useState, useEffect} from 'react'
import { Pagination } from 'antd'
import MyBillsItem from './MyBillsItem'
import Loading from '../../common/Loading'

import {getMyBills} from '../../../apis/apiCalls'
import { NUMBER_PER_PAGE } from '../../../utils/constants'
import { min } from 'moment'

function MyBillsLayout(){

    const [isLoading, setIsLoading] = useState(false)
    const [billsList, setBillsList] = useState([])
    
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)


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

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE) 
    }

    const renderMyBillsList = () => {
        return(
            billsList.slice(minValue, maxValue).map((item, index) => 
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

            <Pagination
            defaultCurrent={1}
            defaultPageSize={NUMBER_PER_PAGE}
            onChange={handlePagination}
            total={billsList.length}
            className="py-5 d-flex justify-content-center"
        />
        </>
    )
}

export default MyBillsLayout;