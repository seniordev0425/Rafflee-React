import React, { useState } from 'react'
import { compose } from 'redux'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Input } from 'reactstrap'
import FormInput from '../components/common/FormInput'
import FormCheckbox from '../components/common/FormCheckbox'
import { resetPassword } from '../apis/apiCalls'
import { openNotification } from '../utils/notification'

import Header from '../components/layouts/HeaderLayout/Header'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../utils/validation'

function ResetPassword(props){
    const { match, history } = props

    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        
        resetPassword(values, match.params.token, match.params.id)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status === 200){
                
                openNotification('success', 'Success', 'Password Updated!')
                history.push('/')
            }
        })
        .catch(error => console.log('error', error));
    }
    return(
        <>
        <Header/>
        <div className="reset-password-form">
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <FormGroup>
                            <Field
                                name="password"
                                component={FormInput}
                                className="custom-form-control"
                                type="password"
                                placeholder="Password"
                                validate={required('Password required')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="password_confirmation"
                                component={FormInput}
                                className="custom-form-control"
                                type="password"
                                placeholder="Confirm Password"
                                validate={required('Confirm password required')}
                            />
                        </FormGroup>
                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="blue-btn"
                            disabled={submitting}
                            style={{marginTop: '20px'}}
                        >
                            RESET
                        </Button>

                    </Form>

                )}
            />
        </div>
        </>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default compose(withRouter, connect(mapStateToProps))(ResetPassword);