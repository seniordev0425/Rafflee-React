import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody, Input } from 'reactstrap'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
import { campaignParticipateTwitterCommentValidation } from '../../../actions/campaign'

function TwitterCommentValidationModal(props) {
  const { t } = useTranslation()
  const { pk, open, onToggle, promotion_id, closeModal } = props

  const CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION)
  const twitter_comment_tweet_validation = useSelector(state => state.campaign[`twitter_comment_tweet_validation_${pk}`])

  const tempActionData = useSelector(state => state.userInfo.tempActionData)
  const dispatch = useDispatch()

  const [actionData, setActionData] = useState(null)
  const [tweet, setTweet] = useState('')

  useEffect(() => {
    if (tempActionData) {
      setActionData(tempActionData)
      dispatch({ type: 'INIT_STATE', state: 'tempActionData', data: null })
    }
  }, [tempActionData])

  useEffect(() => {
    if (twitter_comment_tweet_validation) {
      closeModal()
    }
  }, [twitter_comment_tweet_validation])

  const onSubmit = () => {
    dispatch(campaignParticipateTwitterCommentValidation({ promotion_id: promotion_id }, pk))
  }

  return (
    <Modal isOpen={open} toggle={onToggle}>
      <ModalBody>
        <div className="text-center">
          <span className="font-size-10 font-weight-bold">{`${(actionData || {}).tweet_template}`}</span>
        </div>
        {/* <div className="mt-3">
          <span className="font-size-10 font-weight-bold">{t('twitter_comment_validation_modal.comment')}</span>
          <Input
            className="custom-form-control"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
        </div> */}
        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="primary"
            className="ant-blue-btn promotion-list-item-btn"
            onClick={onSubmit}
            loading={CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION_PROCESS}
          >
            {!CAMPAIGN_PARTICIPATE_TWITTER_COMMENT_VALIDATION_PROCESS && t('button_group.confirm_tweet')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default TwitterCommentValidationModal
