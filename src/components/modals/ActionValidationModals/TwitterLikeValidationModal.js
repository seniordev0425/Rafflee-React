import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { campaignParticipateTwitterLikeValidation } from '../../../actions/campaign'

function TwitterLikeValidationModal(props) {
  const { t } = useTranslation()
  const { open, onToggle, promotion_id, closeModal } = props

  const CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION)
  const twitter_like_validation = useSelector(state => state.campaign.twitter_like_validation)

  const tempActionData = useSelector(state => state.userInfo.tempActionData)
  const dispatch = useDispatch()
  const [actionData, setActionData] = useState(null)

  useEffect(() => {
    if (tempActionData) {
      setActionData(tempActionData)
      dispatch({ type: 'INIT_STATE', state: 'tempActionData', data: null })
    }
  }, [tempActionData])

  useEffect(() => {
    if (twitter_like_validation) {
      closeModal()
    }
  }, [twitter_like_validation])

  const onSubmit = () => {
    dispatch(campaignParticipateTwitterLikeValidation({ promotion_id: promotion_id }))
  }

  return (
    <Modal isOpen={open} toggle={onToggle}>
      <ModalBody>
        <div>
          <img src={(actionData || {}).profile_img} width={50} height={50} className="rounded-circle" alt="" />
          <span className="font-size-10 font-weight-bold ml-3">{(actionData || {}).name}</span>
        </div>
        <div className="mt-4">
          <span className="font-size-11 font-weight-bold">{(actionData || {}).text}</span>
        </div>
        <div className="mt-3">
          <span className="font-size-9 color-gray">{moment((actionData || {}).created_at).format("ddd MMM Do YYYY")}</span>
        </div>
        <div className="mt-3">
          <span className="font-size-9 color-gray">{t('create_campaign_page.like')}</span>
          <span className="font-size-9 font-weight-bold ml-2">{(actionData || {}).like}</span>
          <span className="font-size-9 color-gray ml-4">{t('create_campaign_page.retweet')}</span>
          <span className="font-size-9 font-weight-bold ml-2">{(actionData || {}).retweet}</span>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="primary"
            className="ant-blue-btn promotion-list-item-btn"
            onClick={onSubmit}
            loading={CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION_PROCESS}
          >
            {!CAMPAIGN_PARTICIPATE_TWITTER_LIKE_VALIDATION_PROCESS && t('button_group.confirm')}
          </Button>
        </div>

      </ModalBody>

    </Modal>
  )
}

export default TwitterLikeValidationModal
