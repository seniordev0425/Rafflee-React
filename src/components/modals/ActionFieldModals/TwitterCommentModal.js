import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import FormInput from '../../common/FormInput'
import {
    required,
} from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

function TwitterCommentModal(props) {
    const { t } = useTranslation()

    const { open, onToggle, handleActionValues } = props
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        handleActionValues(values.comment_model)
        dispatch({type: 'SET_ACTION_FILED_STATUS', name: 'TWITTER_COMMENT_MODEL_FINISHED'})
        onToggle()
    }

    return (<Modal isOpen={open} toggle={onToggle}>
        <ModalHeader className="modal-login-btn" style={{ borderBottom: 'none' }}>
            <div className="modal-login-btn">{t('twitter_comment_modal.header')}</div>
        </ModalHeader>
        <ModalBody>
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field
                                name="comment_model"
                                component={FormInput}
                                className="custom-form-control"
                                type="text"
                                placeholder={t('twitter_comment_modal.comment_model')}
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

export default TwitterCommentModal
