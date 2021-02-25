import React from 'react'
import * as _ from 'lodash'
import ImageGallery from 'react-image-gallery'
import { Modal, ModalHeader, ModalBody } from 'reactstrap'
import { useTranslation } from 'react-i18next'

function CampaignRulesModal(props) {
  const { t } = useTranslation()

  const { open, onToggle, rules } = props

  return (
    <Modal isOpen={open} toggle={onToggle} size="lg" >
      <ModalHeader toggle={onToggle}>
        <div className="text-center font-size-17 color-blue">
          {t('create_campaign_page.rules')}
        </div>
      </ModalHeader>
      <ModalBody>
        <div>
          {!_.isEmpty(rules) &&
            <ImageGallery
              items={rules.map(image => ({
                original: image,
                thumbnail: image
              }))}
              showPlayButton={false}
              showFullscreenButton={false}
            />
          }
        </div>
      </ModalBody>
    </Modal>
  )
}

export default CampaignRulesModal