import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input} from 'reactstrap'
import FormInput from '../common/FormInput'
import {Switch} from 'antd'
import {ApiRoute} from '../../utils/constants'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'
// import { Input } from 'semantic-ui-react'

function SignUpModal(props){

    const {dispatch, showCompanyModal} = props
    const [agree, setAgree] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    
    const onSubmit = (values) => {
        setSubmitting(true)
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Basic cmFmZmxlZTpKM1N1aXNMM1A0c3NXb3JkUg==");

        var urlencoded = new URLSearchParams();
        urlencoded.append("username", values.username);
        urlencoded.append("email", values.email);
        urlencoded.append("password1", values.password1);
        urlencoded.append("password2", values.password2);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://rafflee.io/api/account/register/", requestOptions)
        .then(response => response.text())
        .then(result => {
            // console.log(result)
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){
                localStorage.setItem('myInfo', JSON.stringify(values))
                dispatch({type: "setMyInfo", data: values})
                
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
                            disabled={submitting || !agree}
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
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo
    }
}
export default connect(mapStateToProps)(SignUpModal);