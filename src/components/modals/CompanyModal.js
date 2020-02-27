import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Row} from 'reactstrap'
import FormInput from '../common/FormInput'
import FormPhoneInput from '../common/FormPhoneInput'
import {companyContact} from '../../apis/apiCalls'
import {openNotification} from '../../utils/notification'
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

        companyContact(values)
        .then(response => response.text())
        .then(result => {
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200)
                openNotification('success', 'Successfully submitted.')
            
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