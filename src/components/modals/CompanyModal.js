import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Row} from 'reactstrap'
import FormInput from '../common/FormInput'
import FormPhoneInput from '../common/FormPhoneInput'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../utils/validation'


function CompanyModal(){

    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("email", values.email);
        urlencoded.append("phone_number", values.phonenumber.phone_number);
        urlencoded.append("company_name", values.company_name);
        urlencoded.append("message", values.message);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("https://rafflee.io/api/company/contact-form/", requestOptions)
        .then(response => response.text())
        .then(result => {
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200)
                alert('Successfully Submitted')
            
        })
        .catch(error => console.log('error', error));
    }
    return(
        
        <div style={{fontFamily:"sofiapro"}}>
            <Row style={{margin: 0}}>
                <div className="modal-company-btn">Company Form</div>
            </Row>
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
                                placeholder="Contact Address"
                                validate={required('Contact Address required')}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="phonenumber"
                                component={FormPhoneInput}
                                className="custom-form-control"
                                validate={requiredPhoneObj('Please enter your phone number')}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="company_name"
                                component={FormInput}
                                className="custom-form-control"
                                type="text"
                                placeholder="Company Name"
                                validate={required('Company Name required')}

                            />
                        </FormGroup>
                        <FormGroup>
                            <Field
                                name="message"
                                component={FormInput}
                                className="company-contact-form-text-area"
                                type="textarea"
                                row={10}
                                placeholder="Your Message"
                                validate={required('Put your message')}

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
                            SEND MESSAGE
                        </Button>
                        <div className="company-question-button-container">
                            Need help? Contact us <span className="company-question-button">here.</span>
                        </div>

                    </Form>
                )}
            />
        </div>
    );
}

export default CompanyModal;