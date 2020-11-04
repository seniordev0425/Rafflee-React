import React, { useEffect } from 'react'
import { Pagination } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import Loading from '../../../../../common/Loading'
import Message from './Message'

import { getHomepageMessages } from '../../../../../../actions/admin/message'

import { NUMBER_PER_PAGE } from '../../../../../../utils/constants'

const ContactMessages = ({ onChangeSection, currentPage, onChangeCurrentPage }) => {
  const { t } = useTranslation()

  const ADMIN_GET_HOMEPAGE_MESSAGES_PROCESS = useSelector(state => state.userInfo.ADMIN_GET_HOMEPAGE_MESSAGES)
  const homepageFormData = useSelector(state => state.adminMessage.homepageFormData)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHomepageMessages(currentPage))
  }, [currentPage])

  const handlePagination = (value) => {
    onChangeCurrentPage(value)
  }

  return (
    <div>
      <div className="min-height-container">
        {homepageFormData.messages.map((message, index) => (
          <div key={index} className="promotion-list-item-container">
            <Message
              message={message}
              loading={ADMIN_GET_HOMEPAGE_MESSAGES_PROCESS}
              onChangeSection={onChangeSection}
            />
          </div>
        ))}
        {!ADMIN_GET_HOMEPAGE_MESSAGES_PROCESS && homepageFormData.messages.length < 1 && (
          <div className="empty-result mt-5">
            <span className="promotion-list-item-title">{t('empty_result_to_display')}</span>
          </div>
        )}
        {ADMIN_GET_HOMEPAGE_MESSAGES_PROCESS && homepageFormData.messages.length < 1 && (
          <Loading />
        )}
      </div>
      <Pagination
        responsive
        current={currentPage}
        defaultPageSize={NUMBER_PER_PAGE}
        onChange={handlePagination}
        total={homepageFormData.nbr_of_messages}
        className="py-5 d-flex justify-content-center"
      />
    </div>
  )
}

export default ContactMessages