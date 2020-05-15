import React, { useEffect } from 'react'
import { compose } from 'redux'
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup } from 'reactstrap'
import { Button } from 'antd'
import FormInput from '../components/common/FormInput'
import { resetPassword } from '../actions/userInfo'
import Header from '../components/layouts/HeaderLayout/Header'
import { required } from '../utils/validation'

import { useTranslation } from 'react-i18next'

function ResetPassword(props) {
    const { t } = useTranslation()

    const { match, history } = props

    const isLoading = useSelector(state => state.userInfo.RESET_PASSWORD)
    const RESET_PASSWORD_SUCCESS = useSelector(state => state.userInfo.RESET_PASSWORD_SUCCESS)
    const dispatch = useDispatch()

    useEffect(() => {
        if (RESET_PASSWORD_SUCCESS) {
            dispatch({ type: 'RESET_PASSWORD_SUCCESS', flag: false })
            history.push('/')
        }
    }, [RESET_PASSWORD_SUCCESS])

    const onSubmit = (values) => {
        var body = {
            token: match.params.token,
            id: match.params.id,
            password: values.password,
            password_confirmation: values.password_confirmation
        }
        dispatch(resetPassword(body))
    }

    return (
        <>
            <Header />
            <div className="reset-password-form">
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
                                    placeholder={t('signin_modal.password')}
                                    validate={required(t('signin_modal.password_required'))}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Field
                                    name="password_confirmation"
                                    component={FormInput}
                                    className="custom-form-control"
                                    type="password"
                                    placeholder={t('signin_modal.confirm_password')}
                                    validate={required(t('signin_modal.confirm_password_required'))}
                                />
                            </FormGroup>
                            <Button
                                htmlType="submit"
                                type="primary"
                                className="ant-blue-btn mt-4"
                                loading={isLoading}
                            >
                                {!isLoading && t('button_group.reset')}
                            </Button>
                        </Form>
                    )}
                />
            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default compose(withRouter, connect(mapStateToProps))(ResetPassword)