import React, {useState} from 'react'
import { connect } from "react-redux";
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Modal, ModalHeader, ModalBody} from 'reactstrap'
import FormInput from '../common/FormInput'
import {openNotification} from '../../utils/notification'
import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'
import {verifyPhoneNumber} from '../../apis/apiCalls'

function PhoneVerificationModal(props) {
    const { open, onToggle, phone_number } = props
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)    
        verifyPhoneNumber(values.verify_code, phone_number)
          .then(response => response.text())
          .then(result => {
              setSubmitting(false)
              var json_rlt = JSON.parse(result)
              if (json_rlt.status == 200){
                openNotification('success', '', 'Verified!')
                onToggle()
              }
          })
          .catch(error => console.log('error', error));
    }
    return (<Modal isOpen={open} toggle={onToggle}>
            <ModalHeader className="modal-login-btn" style={{borderBottom: 'none'}}>
                <div className="modal-login-btn">Enter Verification Code</div>
            </ModalHeader>
            <ModalBody>
                <FinalForm
                    onSubmit={onSubmit}
                    render={({handleSubmit}) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Field
                                    name="verify_code"
                                    component={FormInput}
                                    className="custom-form-control"
                                    type="number"
                                    validate={required('Password required')}
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
                                Verify Code
                            </Button>

                        </Form>

                    )}
                />
            </ModalBody>
            
        </Modal>)
}

PhoneVerificationModal.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}
function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default compose(withRouter, connect(mapStateToProps))(PhoneVerificationModal);
