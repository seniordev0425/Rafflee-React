import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../common/FormInput'
import {
    required,
} from '../../utils/validation'
import { closeCampaign } from '../../actions/campaign'

import { useTranslation } from 'react-i18next'

function CampaignCloseModal(props) {
    const { t } = useTranslation()
    const { open, onToggle, promotion_id, onClose } = props

    const CLOSE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.CLOSE_CAMPAIGN)
    const CLOSE_CAMPAIGN_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CLOSE_CAMPAIGN)
    const dispatch = useDispatch()

    useEffect(() => {
        if (CLOSE_CAMPAIGN_SUCCESS) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CLOSE_CAMPAIGN', data: false })
            onClose()
        }
    }, [CLOSE_CAMPAIGN_SUCCESS])

    const onSubmit = (values) => {
        var body = {
            password: values.password,
            promotion_id: promotion_id
        }
        dispatch(closeCampaign(body))
    }

    return (
        <Modal isOpen={open} toggle={onToggle}>
            <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
                <div className="modal-login-btn">{t('campaign_close_modal.close_campaign')}</div>
            </ModalHeader>
            <ModalBody>
                <FinalForm
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Field
                                    name="password"
                                    component={FormInput}
                                    className="custom-form-control"
                                    type="password"
                                    placeholder={t('delete_account_modal.password')}
                                    validate={required(t('delete_account_modal.password_required'))}
                                />
                            </FormGroup>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="ant-blue-btn mt-4"
                                loading={CLOSE_CAMPAIGN_PROCESS}
                            >
                                {!CLOSE_CAMPAIGN_PROCESS && t('button_group.confirm')}
                            </Button>
                        </Form>
                    )}
                />
            </ModalBody>
        </Modal>
    )
}

export default CampaignCloseModal
