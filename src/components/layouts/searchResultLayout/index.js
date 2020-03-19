import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import { Input } from 'reactstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import PromotionListItem from '../currentPromotionLayout/PromotionListItem'
import { NUMBER_PER_PAGE } from '../../../utils/constants'
import { getAllPromotions, getCategories } from '../../../actions/homepage'
import Loading from '../../common/Loading'

function SearchResultLayout(props){

    const { searchKey } = props
    const allPromotions = useSelector(state=>state.homepage.allPromotions)
    // const categories = useSelector(state=>state.homepage.categories)
    const isFetchingAll = useSelector(state=>state.userInfo.GET_ALL_PROMOTIONS_SUCCESS)
    const isFetchingCategories = useSelector(state=>state.userInfo.GET_CATEGORIES)
    const token = useSelector(state=>state.userInfo.token)

    const dispatch = useDispatch()
    
    const [currentKey, setCurrentKey] = useState(searchKey)
    const [tempKey, setTempKey] = useState(searchKey)
    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        dispatch(getAllPromotions({token: token}))
    }, [token])

    const filter = (list) => {

        let tempArr = []
        let flag = false
        for (let i = 0; i < list.length; i ++){
            if (list[i].campaign_name.toLowerCase().includes(currentKey.toLowerCase()) || list[i].description.toLowerCase().includes(currentKey.toLowerCase())) {
                tempArr.push(list[i])
                continue
            }
            if (!list[i].categories) continue
            for (let j = 0; j < list[i].categories.length; j ++){
                if (list[i].categories[j].toLowerCase().includes(currentKey.toLowerCase())) {
                    tempArr.push(list[i])
                    break
                }
            }
        }
        return tempArr
    }

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE) 
    }

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            gotoSearchResult()
        }
    }

    const renderPromotionList = () => {
        return(
            filter(allPromotions).slice(minValue, maxValue).map((item, index) => 
                <div key={index} className="promotion-list-item-container">        
                    <PromotionListItem item={item} menuname="all"/>
                </div>
            )
        )
    }

    const gotoSearchResult = () => {
        dispatch(getAllPromotions({token: token}))
        setCurrentKey(tempKey)
    }

    return(
        <>         
            <div className="menubar-container mt-0 py-3 d-flex justify-content-center" style={{marginTop: "30px"}}>
                <div className="banner-search mt-0">
                    <Input 
                        onChange={(e) => setTempKey(e.target.value)}
                        onKeyPress={handleOnKeyPress}
                        placeholder="Search for name, description, categories..." 
                        className="banner-search-input" 
                        value={tempKey} 
                        
                    />
                    <div className="banner-search-btn" onClick={gotoSearchResult}>
                        <FontAwesomeIcon icon={faSearch} className="banner-search-icon"/>
                    </div>
                </div>
            </div> 
            {(isFetchingAll || isFetchingCategories)
                ?
                <Loading/>
                :
                <>
                    {renderPromotionList()}

                    {filter(allPromotions).length < 1 && (
                        <div className="empty-result mt-5 mb-5">
                            <span className="promotion-list-item-title">There is no result to display.</span>
                        </div>
                    )}

                    <Pagination
                        defaultCurrent={1}
                        defaultPageSize={NUMBER_PER_PAGE}
                        onChange={handlePagination}
                        total={filter(allPromotions).length}
                        className="py-5 d-flex justify-content-center"
                    />   
                </>
            }
                        
        </>
    )
}

export default SearchResultLayout;