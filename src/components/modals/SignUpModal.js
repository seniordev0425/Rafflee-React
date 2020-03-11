import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Input } from 'reactstrap'
import FormInput from '../common/FormInput'
import { Switch } from 'antd'
import { signUp } from '../../actions/userInfo'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'

function SignUpModal(props){

    const { showCompanyModal, toggle } = props

    const isLoading = useSelector(state=>state.userInfo.SIGN_UP_SUCCESS)
    const signUpSuccess = useSelector(state=>state.userInfo.signUpSuccess)

    const dispatch = useDispatch()
    const [agree, setAgree] = useState(false)

    useEffect(() => {
        if (signUpSuccess){
            dispatch({type: 'SIGN_UP_SUCCESS', data: false})
            toggle()
        } 
    },[signUpSuccess])
    
    const onSubmit = (values) => {
        var body = {
            username: values.username,
            email: values.email,
            password1: values.password1,
            password2: values.password2
        }

        dispatch(signUp(body))
    }
    
    return(
        <div>
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit, pristine, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field
                                name="email"
                                component={FormInput}
                                className="custom-form-control"
                                type="email"
                                placeholder="name@example.com"
                                validate={composeValidators(
                                    required('Enter a valid email address'),
                                    isEmail('Enter a valid email address')
                                )}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="username"
                                component={FormInput}
                                className="custom-form-control"
                                type="text"
                                placeholder="Username"
                                validate={required('Username required')}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="password1"
                                component={FormInput}
                                className="custom-form-control"
                                type="password"
                                placeholder="Password"
                                validate={required('Password required')}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="password2"
                                component={FormInput}
                                className="custom-form-control"
                                type="password"
                                placeholder="Confirm Password"
                                validate={required('Confirm Password')}
                                
                            />
                        </FormGroup>
                        <FormGroup>
                            <Switch onChange={() => setAgree(!agree)} />
                            <span className="agree-container">I agree to the 
                                <span className="policy-button">Terms of Use</span> and 
                                <span className="policy-button">Privacy Policy</span>
                            </span>
                        </FormGroup>
                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="blue-btn"
                            disabled={isLoading || !agree}
                            style={{marginTop: '20px'}}
                        >
                            CREATE ACCOUNT
                        </Button>
                        <div className="company-question-button-container" onClick={showCompanyModal}>
                            <span className="company-question-button">Are you a company?</span>
                        </div>

                    </Form>
                )}
            />
        </div>
    );
}

export default SignUpModal;