import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import { Select } from 'antd'
import FormInput from '../../common/FormInput'
import {
    required,
} from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

function TwitterFollowModal(props) {
    const { t } = useTranslation()

    const { Option } = Select

    const { open, onToggle, handleActionValues } = props
    const dispatch = useDispatch()

    const [followType, setFollowType] = useState('screen_name')

    const onSubmit = (values) => {
        handleActionValues({ follow_type: followType, follow_id: values.id })
        dispatch({ type: 'SET_ACTION_FILED_STATUS', name: 'TWITTER_FOLLOW_ID_FINISHED' })
        onToggle()
    }

    return (<Modal isOpen={open} toggle={onToggle}>
        <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
            <div className="modal-login-btn">{t('twitter_follow_modal.header')}</div>
        </ModalHeader>
        <ModalBody>
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <div className="footer-link-bold mb-3">{t('twitter_follow_modal.select_type')}</div>
                            <Select
                                defaultValue='screen_name'
                                onChange={val => setFollowType(val)}
                                size="large"
                            >
                                <Option value="screen_name">{t('twitter_follow_modal.screen_name')}</Option>
                                <Option value="user_id">{t('twitter_follow_modal.user_id')}</Option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <div className="footer-link-bold mb-3">{t('twitter_follow_modal.enter_id')}</div>
                            <Field
                                name="id"
                                component={FormInput}
                                className="custom-form-control"
                                type="text"
                                placeholder={t('twitter_like_modal.id')}
                                validate={required(t('required'))}
                            />
                        </FormGroup>

                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="blue-btn"
                            style={{ marginTop: '20px' }}
                        >
                            {t('button_group.confirm')}
                        </Button>
                    </Form>
                )}
            />
        </ModalBody>

    </Modal>)
}

export default TwitterFollowModal
