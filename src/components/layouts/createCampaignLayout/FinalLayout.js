import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import PropTypes from 'prop-types'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'
import ImageUploader from 'react-images-upload'
import {Switch, DatePicker, Checkbox, Button as AntdButton} from 'antd'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import images from '../../../utils/images'
import {createCampaign} from '../../../apis/apiCalls'
import {openNotification} from '../../../utils/notification'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'

function FinalLayout(props){
    const {poll, firstFormData, createNewPromotion} = props

    const [submitting, setSubmitting] = useState(false)

    const onSubmit = () => {
        setSubmitting(true)
        createCampaign(firstFormData, poll)
        .then(response => response.text())
        .then(result => {
            setSubmitting(false)
            console.log(result)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){
                openNotification('success', 'Success', 'New campaign created successfully!')
            }
            createNewPromotion()
        })
        .catch(error => console.log('error', error));
    }
    return(
        <FinalForm
            onSubmit={onSubmit}
            render={({handleSubmit, pristine, values}) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={{size: 10, offset: 1}}>
                            <Row>
                                <Col xs="12" sm="6">
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Name</div>
                                                <Field
                                                    name="name"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required('Name is required')}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>      
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">CCV</div>
                                                <Field
                                                    name="ccv"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required('CCV is required')}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>      
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Card Number</div>
                                                <Field
                                                    name="card_number"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required('Card Number is required')}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row> 
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Date</div>
                                                <Field
                                                    name="date"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required('Date is required')}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>           
                                </Col>
                                <Col xs="12" sm="6">
                                    <Row>
                                        <Col xs="12" sm={{size:9, offset: 3}}>
                                            <Row>
                                                <div className="footer-link-bold mb-3 mt-4">Campaign Total</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3">Campaign :$5623</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3">IVA:$20</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3" style={{paddingTop:20, borderTop:"1px solid #DEE6E9"}}>Total:$5643</div>
                                            </Row>
                                            <Row>
                                                <Button className="btn blue-btn mt-3" color="primary" style={{width:200}} disabled={submitting} onClick={onSubmit}>CREATE CAMPAIGN</Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>                                              
                        </Col>
                    </Row>
                </Form>
            )}
        />
    )
}

export default FinalLayout;