import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Input } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import MyCircleItem from './MyCircleItem'
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

  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    dispatch(getFavoriteCompanies())
    // dispatch(getUserInventory())
    // dispatch(getParticipationHistory())
    // dispatch(getFollowing())
  }, [])

  const handlePagination = (value) => {
    setMinValue((value - 1) * NUMBER_PER_PAGE)
    setMaxValue((value) * NUMBER_PER_PAGE)
  }

  const renderMyFavoriteCompanies = () => {
    return (
      <>
        {((myFavoriteCompanies || []).filter((item, index) => item.company_name.toLowerCase().includes(keyword))).slice(minValue, maxValue).map((item, index) =>
          <div key={index} className="promotion-list-item-container">
            <MyCircleItem item={item} />
          </div>
        )}
        {((myFavoriteCompanies || []).filter((item, index) => item.company_name.toLowerCase().includes(keyword))).length < 1 && (
          <div className="empty-result mt-5">
            <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
          </div>
        )}
        <Pagination
          responsive
          defaultCurrent={1}
          defaultPageSize={NUMBER_PER_PAGE}
          onChange={handlePagination}
          total={((myFavoriteCompanies || []).filter((item, index) => item.company_name.toLowerCase().includes(keyword))).length}
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
      <div className="d-flex justify-content-center mt-3">
        <Input
          onChange={e => setKeyword(e.target.value.toLowerCase())}
          size="large"
          placeholder={t('my_circle_page.search_for_circle_name')}
          prefix={<FontAwesomeIcon icon={faSearch} />}
          className="mycircle-searchbox"
        />
      </div>
      {renderMyFavoriteCompanies()}
    </div>
  )
}

export default MyCircleLayout