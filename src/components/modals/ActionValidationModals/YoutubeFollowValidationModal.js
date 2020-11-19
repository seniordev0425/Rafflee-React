import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { campaignParticipateYoutubeFollowValidation } from '../../../actions/campaign'

function YoutubeFollowValidationModal(props) {
  const { t } = useTranslation()
  const { open, onToggle, promotion_id, closeModal } = props

  const CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION)
  const youtube_follow_validation = useSelector(state => state.campaign.youtube_follow_validation)

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
    if (youtube_follow_validation) {
      closeModal()
    }
  }, [youtube_follow_validation])

  const onSubmit = () => {
    dispatch(campaignParticipateYoutubeFollowValidation({ promotion_id: promotion_id }))
  }

  return (
    <Modal isOpen={open} toggle={onToggle}>
      <ModalBody>
        <div>
          <img src={(actionData || {}).url_img} width={50} height={50} className="rounded-circle" alt="" />
          <span className="font-size-10 font-weight-bold ml-3">{(actionData || {}).channel_title}</span>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="primary"
            className="ant-blue-btn promotion-list-item-btn"
            onClick={onSubmit}
            loading={CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION_PROCESS}
          >
            {!CAMPAIGN_PARTICIPATE_YOUTUBE_FOLLOW_VALIDATION_PROCESS && t('button_group.confirm')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default YoutubeFollowValidationModal
