import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input} from 'reactstrap'
import FormInput from '../common/FormInput'
import FormCheckbox from '../common/FormCheckbox'
import ForgotPassword from './ForgotPassword'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'

function LogInModal(props){
    const {dispatch} = props

    const [submitting, setSubmitting] = useState(false)
    const [openForgotModal, setOpenForgotModal] = useState(false)

    const handleForgotModal = () => setOpenForgotModal(!openForgotModal)

    const onSubmit = (values) => {
        setSubmitting(true)
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", values.username);
        urlencoded.append("password", values.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://rafflee.io/api/login/", requestOptions)
        .then(response => response.text())
        .then(result => {
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.token){
                localStorage.setItem('token', json_rlt.token)
                localStorage.setItem('company', json_rlt.company)
                localStorage.setItem('myInfo', JSON.stringify(values))
                dispatch({type: "setToken", data: json_rlt.token})
                dispatch({type: "setMyInfo", data: values})
            }
            if (json_rlt.status == 400 && json_rlt.msg == 'MSG_USER_NOT_ACTIVE'){
                // localStorage.setItem('myInfo', JSON.stringify(values))
            }
        })
        .catch(error => console.log('error', error));
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
                                placeholder="Username"
                                validate={required('Username required')}

                            />
                        </FormGroup>
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
                                name="remember"
                                component={FormCheckbox}
                            />
                            <span> Remember Me</span>
                            <span className="policy-button float-right" onClick={handleForgotModal}>Forgot Password?</span>
                        </FormGroup>
                        <Button
                            type="submit"
                            size="lg"
                            color="primary"
                            className="blue-btn"
                            disabled={submitting}
                            style={{marginTop: '20px'}}
                        >
                            LOGIN
                        </Button>

                    </Form>

                )}
            />
            <ForgotPassword
                open={openForgotModal}
                onToggle={handleForgotModal}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token
    }
}
export default connect(mapStateToProps)(LogInModal);