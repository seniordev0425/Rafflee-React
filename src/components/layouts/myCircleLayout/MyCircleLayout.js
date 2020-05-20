import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from 'antd'
import MyCircleItem from './MyCircleItem'
import DetailLayout from './DetailLayout'
import Loading from '../../common/Loading'
import { 
    getFavoriteCompanies, 
    getUserInventory, 
    getParticipationHistory, 
    getFollowing 
} from '../../../actions/userInfo'
import { NUMBER_PER_PAGE } from '../../../utils/constants'
import { useTranslation } from 'react-i18next'

function MyCircleLayout() {
    const { t } = useTranslation()

    const GET_FAVORITE_COMPANIES_PROCESS = useSelector(state => state.userInfo.GET_FAVORITE_COMPANIES)
    const myFavoriteCompanies = useSelector(state => state.userInfo.myFavoriteCompanies)
    const dispatch = useDispatch()

    const [minValue, setMinValue] = useState(0)
    const [maxValue, setMaxValue] = useState(NUMBER_PER_PAGE)

    const [companyId, setCompanyId] = useState(null)

    useEffect(() => {
        dispatch(getFavoriteCompanies())
        dispatch(getUserInventory())
        dispatch(getParticipationHistory())
        dispatch(getFollowing())
    }, [])

    const handlePagination = (value) => {
        setMinValue((value - 1) * NUMBER_PER_PAGE)
        setMaxValue((value) * NUMBER_PER_PAGE)
    }

    const goToDetailPage = (val) => {
        setCompanyId(val)
    }

    const goBack = () => {
        setCompanyId(null)
    }

    const renderMyFavoriteCompanies = () => {
        return (
            <>
                {(myFavoriteCompanies || []).slice(minValue, maxValue).map((item, index) =>
                    <div key={index} className="promotion-list-item-container">
                        <MyCircleItem item={item} goToDetailPage={goToDetailPage} />
                    </div>
                )}
                {(myFavoriteCompanies || []).length < 1 && (
                    <div className="empty-result mt-5">
                        <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
                    </div>
                )}
                <Pagination
                    defaultCurrent={1}
                    defaultPageSize={NUMBER_PER_PAGE}
                    onChange={handlePagination}
                    total={(myFavoriteCompanies || []).length}
                    className="py-5 d-flex justify-content-center"
                />
            </>
        )
    }

    if (GET_FAVORITE_COMPANIES_PROCESS) {
        return <div className="min-height-container"><Loading /></div>
    }

    return (
        <div className="min-height-container">
            {companyId
                ?
                <DetailLayout id={companyId} goBack={goBack} />
                :
                renderMyFavoriteCompanies()
            }
        </div>
    )
}

export default MyCircleLayout