import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../../../../components/common/FormInput'
import { deleteAccount } from '../../../../actions/userInfo'
import { required } from '../../../../utils/validation'

import { useTranslation } from 'react-i18next'

function DeactivateSection() {
    const { t } = useTranslation()

    const DELETE_ACCOUNT_PROCESS = useSelector(state => state.userInfo.DELETE_ACCOUNT)
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        // console.log(values)
        dispatch(deleteAccount({ password: values.password }))
    }

    return (
        <div className="reset-password-form min-height-container">
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
                            type="danger"
                            className="ant-red-btn mt-4"
                            loading={DELETE_ACCOUNT_PROCESS}
                        >
                            {!DELETE_ACCOUNT_PROCESS && t('button_group.delete_account')}
                        </Button>
                    </Form>
                )}
            />
        </div>
    )
}

export default DeactivateSection