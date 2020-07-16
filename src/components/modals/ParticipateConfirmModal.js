import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, ModalBody } from 'reactstrap'
import { Checkbox, Button } from 'antd'
import { campaignSubscribe } from '../../actions/campaign'
import { useTranslation } from 'react-i18next'

function ParticipateConfirmModal(props) {
  const { t } = useTranslation()
  const { open, onToggle, promotion_id, company_name } = props

  const CAMPAIGN_SUBSCRIPTION_PROCESS = useSelector(state => state.userInfo.CAMPAIGN_SUBSCRIPTION)
  const CAMPAIGN_SUBSCRIPTION_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CAMPAIGN_SUBSCRIPTION)
  const dispatch = useDispatch()

  const [joinCircle, setJoinCircle] = useState(false)
  const [newsletter, setNewsletter] = useState(false)


  useEffect(() => {
    if (CAMPAIGN_SUBSCRIPTION_SUCCESS) {
      dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CAMPAIGN_SUBSCRIPTION', data: false })
      onToggle()
    }

  }, [CAMPAIGN_SUBSCRIPTION_SUCCESS])

  const subscribe = () => {
    var body = {
      joign_cercle: joinCircle,
      newsletter: newsletter
    }
    dispatch(campaignSubscribe(body, promotion_id))
  }

  return (
    <Modal isOpen={open} toggle={onToggle} >
      <ModalBody>
        <div className="text-center font-size-19 mt-4 underline color-blue">{t('participate_confirm_modal.thanks_for_participating')}</div>
        <div className="mt-3">
          <Checkbox checked={joinCircle} onChange={() => setJoinCircle(!joinCircle)}>{`${t('participate_confirm_modal.checkbox1')}${company_name}?`}</Checkbox>
        </div>
        <div className="mt-3">
          <Checkbox checked={newsletter} onChange={() => setNewsletter(!newsletter)}>{t('participate_confirm_modal.checkbox2')}</Checkbox>
        </div>
        <div className="d-flex justify-content-center">
          <Button
            onClick={subscribe}
            className="ant-blue-btn mt-3 participate-btn-size"
            type="primary"
            loading={CAMPAIGN_SUBSCRIPTION_PROCESS}
          >
            {!CAMPAIGN_SUBSCRIPTION_PROCESS && t('button_group.continue')}
          </Button>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default ParticipateConfirmModal