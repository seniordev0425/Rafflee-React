import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { campaignParticipateYoutubeCommentValidation } from '../../../actions/campaign'

function YoutubeCommentValidationModal(props) {
  const { t } = useTranslation()
  const { pk, open, onToggle, promotion_id, closeModal } = props

  const CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION)
  const youtube_comment_validation = useSelector(state => state.campaign[`youtube_comment_validation_${pk}`])

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
    if (youtube_comment_validation) {
      closeModal()
    }
  }, [youtube_comment_validation])

  const onSubmit = () => {
    dispatch(campaignParticipateYoutubeCommentValidation({ promotion_id: promotion_id }, pk))
  }

  return (
    <Modal isOpen={open} toggle={onToggle}>
      <ModalBody>
        <div>
          <img src={(actionData || {}).url_img} width={50} height={50} className="rounded-circle" alt="" />
          <span className="font-size-10 font-weight-bold ml-3">{(actionData || {}).video_title}</span>
        </div>
        <div className="mt-4">
          <span className="font-size-11 font-weight-bold">{t('campaign_detail_page.account') + (actionData || {}).channel_title}</span>
        </div>
        <div className="mt-4">
          <span className="font-size-11 font-weight-bold">{(actionData || {}).comment_template}</span>
        </div>
        <div className="mt-3">
          <span className="font-size-9 color-gray">{moment((actionData || {}).published_at).format("ddd MMM Do YYYY")}</span>
        </div>
        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="primary"
            className="ant-blue-btn promotion-list-item-btn"
            onClick={onSubmit}
            loading={CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION_PROCESS}
          >
            {!CAMPAIGN_PARTICIPATE_YOUTUBE_COMMENT_VALIDATION_PROCESS && t('button_group.confirm')}
          </Button>
        </div>

      </ModalBody>

    </Modal>
  )
}

export default YoutubeCommentValidationModal
