import React, {useState} from 'react'
import { connect, useSelector, useDispatch } from "react-redux";
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button} from 'reactstrap'
import FormInput from '../common/FormInput'
import FormCheckbox from '../common/FormCheckbox'
import ForgotPassword from './ForgotPassword'
import { logIn } from '../../actions/userInfo'


import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'

import { useTranslation } from 'react-i18next'

function LogInModal(props){
    const { t } = useTranslation()
    
    const { toggle } = props

    const isLoading = useSelector(state=>state.userInfo.LOG_IN_SUCCESS)
    const dispatch = useDispatch()

    const [openForgotModal, setOpenForgotModal] = useState(false)

    const handleForgotModal = () => setOpenForgotModal(!openForgotModal)

    const onSubmit = (values) => {
        var body = {
            username: values.username,
            password: values.password,
        }
        var rememberMe = values.remember
        dispatch(logIn(body, rememberMe))
    }
    return(
        
        <div>
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit, pristine, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field
                                name="username"
                                component={FormInput}
                                className="custom-form-control"
                                type="text"
                                placeholder={t('signin_modal.username')}
                                validate={required(t('signin_modal.username_required'))}

                            />
                        </FormGroup>
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
                                name="remember"
                                component={FormCheckbox}
                                type="checkbox"
                            />
                            <span> {t('login_modal.remember_me')}</span>
                            <span className="policy-button float-right" onClick={handleForgotModal}>{t('login_modal.forgot_password')}</span>
                        </FormGroup>
                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="blue-btn"
                            disabled={isLoading}
                            style={{marginTop: '20px'}}
                        >
                            {t('button_group.log_in')}
                        </Button>

                    </Form>

                )}
            />
            <ForgotPassword
                open={openForgotModal}
                onToggle={handleForgotModal}
                toggle={toggle}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default connect(mapStateToProps)(LogInModal);