import React from 'react'
import { useSelector } from 'react-redux'
import { Img } from 'react-image'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import Loading from '../common/Loading'
import { useTranslation } from 'react-i18next'

function PreviewWinningDetailModal(props) {
  const { t } = useTranslation()

  const { open, onToggle, winning } = props

  return (
    <Modal isOpen={open} toggle={onToggle} >
      <ModalHeader toggle={onToggle}><div className="text-center font-size-17 color-blue">{winning?.name}</div></ModalHeader>
      <ModalBody>

        <div>
          {winning?.image &&
            <Img
              src={`data:image/png;base64,${winning.image}`}
              width="100%"
              style={{ objectFit: 'contain' }}
            />
          }
          <div className="mt-4">
            <div className="font-size-11">
              {t('winning_detail_modal.description')}
            </div>
            <div className="mt-1 font-size-10 color-gray">
              {winning?.description}
            </div>
          </div>
          <div className="mt-4">
            <div className="font-size-11">
              {t('winning_detail_modal.number_of_eligible_people')}
            </div>
            <div className="mt-1 font-size-10 color-gray">
              {winning?.number_of_people}
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

export default PreviewWinningDetailModal