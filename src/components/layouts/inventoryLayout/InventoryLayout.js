import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import InventoryItem from './InventoryItem'
import { getUserInventory, getParticipationHistory, getFollowing, getFavoriteCompanies } from '../../../actions/userInfo'
import Loading from '../../common/Loading'
import { NUMBER_PER_PAGE } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

function InventoryLayout(props) {
    const { t } = useTranslation()

    const { history } = props

    const PARTICIPATION_RESULT_SUCCESS = useSelector(state => state.userInfo.SUCCESS_PARTICIPATION_RESULT)
    const isLoading = useSelector(state => state.userInfo.GET_USER_INVENTORY_SUCCESS)
    const userInventory = useSelector(state => state.userInfo.userInventory)

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    const [selectedId, setSelectedId] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserInventory())
        dispatch(getParticipationHistory())
        dispatch(getFollowing())
        dispatch(getFavoriteCompanies())
    }, [])

    useEffect(() => {
        if (PARTICIPATION_RESULT_SUCCESS) {
            dispatch({type: 'INIT_STATE', state: 'SUCCESS_PARTICIPATION_RESULT', data: false})
            history.push(`/participation-result/${selectedId}`)
        }
    }, [PARTICIPATION_RESULT_SUCCESS])

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE)
    }

    const renderInventoryList = () => {
        return (
            userInventory.slice(minValue, maxValue).map((item, index) =>
                <div key={index} className="promotion-list-item-container">
                    <InventoryItem item={item} setSelectedId = {(id) => setSelectedId(id)} />
                </div>
            )
        )
    }

    if (isLoading) return <Loading />

    return (
        <>
            {renderInventoryList()}
            {userInventory.length < 1 && (
                <div className="empty-result mt-5">
                    <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
                </div>
            )}
            <Pagination
                defaultCurrent={1}
                defaultPageSize={NUMBER_PER_PAGE}
                onChange={handlePagination}
                total={userInventory.length}
                className="py-5 d-flex justify-content-center"
            />
        </>
    )
}

export default withRouter(InventoryLayout)