import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Loading from '../../common/Loading'
import { getParticipationHistory, getUserInventory, getFollowing } from '../../../actions/userInfo'
import { NUMBER_PER_PAGE } from '../../../utils/constants'
import MyFollowingItem from './MyFollowingItem'

import { useTranslation } from 'react-i18next'

function MyFollowingLayout() {
    const { t } = useTranslation()

    const isLoading = useSelector(state => state.userInfo.GET_PARTICIPATION_HISTORY_SUCCESS)
    const myFollowing = useSelector(state => state.userInfo.myFollowing)

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getParticipationHistory())
        dispatch(getUserInventory())
        dispatch(getFollowing())
    }, [])

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE)
    }

    const renderHistoryList = () => {
        return (
            myFollowing.slice(minValue, maxValue).map((item, index) =>
                <div key={index} className="promotion-list-item-container">
                    <MyFollowingItem item={item} />
                </div>
            )
        )
    }

    if (isLoading)
        return <Loading />
    return (
        <>
            {renderHistoryList()}
            {myFollowing.length < 1 && (
                <div className="empty-result mt-5 mb-5">
                    <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
                </div>
            )}
            <Pagination
                defaultCurrent={1}
                defaultPageSize={NUMBER_PER_PAGE}
                onChange={handlePagination}
                total={myFollowing.length}
                className="py-5 d-flex justify-content-center"
            />
        </>
    )
}

export default MyFollowingLayout;