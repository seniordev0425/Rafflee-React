import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap'
import { Checkbox } from 'antd'
import { useTranslation } from 'react-i18next'

function ParticipateConfirmModal(props) {
    const { t } = useTranslation()

    const { open, onToggle } = props

    return (
        <Modal isOpen={open} toggle={onToggle} >
            <ModalBody>
    <div className="text-center font-size-19 mt-4 underline color-blue">{t('participate_confirm_modal.thanks_for_participating')}</div>
                <div className="mt-3">
                    <Checkbox>{t('participate_confirm_modal.checkbox1')}</Checkbox>
                </div>
                <div className="mt-3">
                    <Checkbox>{t('participate_confirm_modal.checkbox2')}</Checkbox>
                </div>
                <div className="d-flex justify-content-center">
                    <Button className="btn blue-btn mt-3 participate-btn-size" color="primary" >
                        {t('button_group.continue')}
                    </Button>
                </div>
            </ModalBody>
            
        </Modal>
    )
}

export default ParticipateConfirmModal;