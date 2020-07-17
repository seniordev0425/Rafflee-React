import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Loading from '../common/Loading'
import { useTranslation } from 'react-i18next'

function WinningDetailModal(props) {
  const { t } = useTranslation()
  const { open, onToggle } = props

  const winningData = useSelector(state => state.campaign.winningData)
  const GET_WINNING_DATA_PROCESS = useSelector(state => state.userInfo.GET_WINNING_DATA)

  return (
    <Modal isOpen={open} toggle={onToggle} >
      <ModalHeader toggle={onToggle}><div className="text-center font-size-17 color-blue">{winningData.name}</div></ModalHeader>
      <ModalBody>
        {GET_WINNING_DATA_PROCESS
          ?
          <Loading />
          :
          <div>
            {winningData.image_url &&
              <img src={winningData.image_url} width="100%" style={{ objectFit: 'contain' }} alt="" />
            }
            <div className="mt-4">
              <div className="font-size-11">
                {t('winning_detail_modal.description')}
              </div>
              <div className="mt-1 font-size-10 color-gray">
                {winningData.description}
              </div>
            </div>
            <div className="mt-4">
              <div className="font-size-11">
                {t('winning_detail_modal.number_of_eligible_people')}
              </div>
              <div className="mt-1 font-size-10 color-gray">
                {winningData.number_of_eligible_people}
              </div>
            </div>
          </div>
        }
      </ModalBody>
    </Modal>
  )
}

export default WinningDetailModal