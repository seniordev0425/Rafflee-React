import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
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

    const [containSpecial, setContainSpecial] = useState(false)
    const [containLowercase, setContainLowercase] = useState(false)
    const [containCapital, setContainCapital] = useState(false)
    const [containNumber, setContainNumber] = useState(false)
    const [containEnoughLen, setContainEnoughLen] = useState(false)

    useEffect(() => {
        if (signUpSuccess){
            dispatch({type: 'SIGN_UP_SUCCESS', data: false})
            toggle()
        } 
    },[signUpSuccess])
    
    const onSubmit = (values) => {
        if (!containCapital || !containSpecial || !containLowercase || !containCapital || !containNumber) return
        var body = {
            username: values.username,
            email: values.email,
            password1: values.password1,
            password2: values.password2
        }

        dispatch(signUp(body))
    }

    const validatePassword = (val) => {
        let specialFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        let lowercaseFormat = /[a-z]/
        let uppercaseFormat = /[A-Z]/
        let numberFormat = /\d/
        setContainSpecial(specialFormat.test(val))
        setContainLowercase(lowercaseFormat.test(val))
        setContainCapital(uppercaseFormat.test(val))
        setContainNumber(numberFormat.test(val))
        setContainEnoughLen(val.length >= 8)
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
                            <OnChange name="password1">
                                {(value) => {
                                    validatePassword(value)
                                }}
                            </OnChange>
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
                            
                            <div className="mt-3" style={containSpecial ? {color: "green"} : {color: "#dc3545"}}>
                                Password must contain a special character
                            </div>
                            <div className="mt-2" style={containLowercase ? {color: "green"} : {color: "#dc3545"}}>
                                Password must contain lowercase letter
                            </div>
                            <div className="mt-2" style={containCapital ? {color: "green"} : {color: "#dc3545"}}>
                                Password must contain a capital letter
                            </div>
                            <div className="mt-2" style={containNumber ? {color: "green"} : {color: "#dc3545"}}>
                                Password must contain a number
                            </div>
                            <div className="mt-2" style={containEnoughLen ? {color: "green"} : {color: "#dc3545"}}>
                                Password must have a minimum length of 8
                            </div>
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