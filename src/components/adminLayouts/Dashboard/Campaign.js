import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Pagination, Select } from 'antd'
import * as _ from 'lodash'

import CampaignItem from './CampaignItem'

import { getCampaigns } from '../../../actions/admin/campaign'
import { getCompanyList } from '../../../actions/admin/company'

import { NUMBER_PER_PAGE } from '../../../utils/constants'

import { useTranslation } from 'react-i18next'

const { Option } = Select

const Campaign = () => {
  const { t } = useTranslation()

  const campaignData = useSelector(state => state.adminCampaign.campaignData)
  const companies = useSelector(state => state.adminCompany.companies)

  const ADMIN_GET_CAMPAIGNS_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_CAMPAIGNS)
  const dispatch = useDispatch()

  const [selectedCompany, setSelectedCompany] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    dispatch(getCampaigns(selectedCompany, currentPage))
    dispatch(getCompanyList())
  }, [selectedCompany, currentPage])

  const handlePagination = (value) => {
    setCurrentPage(value)
  }

  const renderCampaignList = () => {
    return (
      campaignData.promotions.map((campaign, id) =>
        <div key={id} className="promotion-list-item-container">
          <CampaignItem
            item={campaign}
            loading={ADMIN_GET_CAMPAIGNS_PROCESS}
          />
        </div>
      )
    )
  }

  return (
    <React.Fragment>
      <div className="mt-0 py-3 d-flex justify-content-center">
        <div className="d-flex align-items-center">
          <span className="font-size-13 font-weight-bold mt-2 mr-1 mr-sm-4 color-blue">{t('admin_campaigns_page.select_company')}:</span>
          <Select
            style={{ width: 200 }}
            onChange={(val) => setSelectedCompany(val)}
            size="large"
          >
            {companies.map((company, index) =>
              <Option key={index} value={company}>{company}</Option>
            )}
          </Select>
        </div>
      </div>
      <div className="min-height-container">
        {renderCampaignList()}
      </div>
      {!ADMIN_GET_CAMPAIGNS_PROCESS && campaignData.promotions.length < 1 && (
        <div className="empty-result mt-5">
          <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
        </div>
      )}
      <Pagination
        responsive
        current={currentPage}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={campaignData.nbr_of_promotions}
        className="py-5 d-flex justify-content-center"
      />
    </React.Fragment>
  )
}

export default Campaign