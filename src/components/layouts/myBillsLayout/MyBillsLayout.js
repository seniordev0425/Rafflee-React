import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination } from 'antd'
import MyBillsItem from './MyBillsItem'
import Loading from '../../common/Loading'

import { getMyBills } from '../../../actions/userInfo'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

function MyBillsLayout(){

    const isLoading = useSelector(state=>state.userInfo.GET_MY_BILLS_SUCCESS)
    const billsList = useSelector(state=>state.userInfo.myBills)
    const dispatch = useDispatch()
    
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)


    useEffect(() => {
        dispatch(getMyBills())
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