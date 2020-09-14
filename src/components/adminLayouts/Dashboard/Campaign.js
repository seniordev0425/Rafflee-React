import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input } from 'reactstrap'
import * as _ from 'lodash'

import CampaignItem from './CampaignItem'

import { getCampaigns } from '../../../actions/admin/campaign'

import { useTranslation } from 'react-i18next'

const Campaign = () => {
  const { t } = useTranslation()

  const tempCampaigns = useSelector(state => state.adminCampaign.tempCampaigns)

  const ADMIN_GET_CAMPAIGNS_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_CAMPAIGNS)
  const dispatch = useDispatch()

  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [campaigns, setCampaigns] = useState([])

  useEffect(() => {
    dispatch(getCampaigns({ page: 1 }))
  }, [])

  useEffect(() => {
    if (!_.isEmpty(tempCampaigns)) {
      setCampaigns(campaigns.concat(tempCampaigns))
    }
  }, [tempCampaigns])

  const renderCampaignList = () => {
    return (
      campaigns.map((campaign, id) =>
        <div key={id} className="promotion-list-item-container">
          <CampaignItem item={campaign} />
        </div>
      )
    )
  }

  return (
    <React.Fragment>
      <div className="mt-0 py-3 d-flex justify-content-center">
        <div className="banner-search mt-0">
          <span className="font-size-13 font-weight-bold mt-2 mr-1 mr-sm-4 color-blue">{t('search_result_page.search')}:</span>
          <Input
            onChange={(e) => setSearchKey(e.target.value)}
            placeholder={t('admin_campaigns_page.search_placeholder')}
            className="banner-search-input"
            value={searchKey}
          />
        </div>
      </div>
      <div className="min-height-container">
        {renderCampaignList()}
      </div>
    </React.Fragment>
  )
}

export default Campaign