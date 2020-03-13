import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Row } from 'reactstrap'
import FormInput from '../common/FormInput'
import FormPhoneInput from '../common/FormPhoneInput'
import { companyContact } from '../../actions/userInfo'
import { openNotification } from '../../utils/notification'
import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../utils/validation'


function CompanyModal(){

    const isLoading = useSelector(state=>state.userInfo.COMPANY_CONTACT_SUCCESS)
    const dispatch = useDispatch()

    const onSubmit = (values) => {
        var body = {
            email: values.email,
            phone_number: values.phonenumber.phone_number,
            company_name: values.company_name,
            message: values.message
        }
        dispatch(companyContact(body))
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
                                placeholder="Email Address"
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
                            disabled={isLoading}
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