import React from 'react'
import * as _ from 'lodash'
import ImageGallery from 'react-image-gallery'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function PreviewWinningDetailModal(props) {
  const { t } = useTranslation()

  const { open, onToggle, winning } = props

  return (
    <Modal isOpen={open} toggle={onToggle} >
      <ModalHeader toggle={onToggle}><div className="text-center font-size-17 color-blue">{winning?.name}</div></ModalHeader>
      <ModalBody>

        <div>
          {!_.isEmpty(winning?.image) &&
            <ImageGallery
              items={winning.image.map(image => ({
                original: image,
                thumbnail: image
              }))}
              showPlayButton={false}
              showFullscreenButton={false}
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