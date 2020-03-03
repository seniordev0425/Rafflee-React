import React, {useState} from 'react'
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
import {resetPasswordRequest} from '../../apis/apiCalls'

function ForgotPassword(props) {
  const { open, onToggle } = props
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = (values) => {
        setSubmitting(true)    
        resetPasswordRequest(values)
          .then(response => response.text())
          .then(result => {
              var json_rlt = JSON.parse(result)
              if (json_rlt.status == 200){
                  onToggle();
                  openNotification('success', 'Success', 'Confirm your Email to reset a password.')
              }
          })
          .catch(error => console.log('error', error));
  }
  return <Modal isOpen={open} toggle={onToggle}>
            <ModalHeader className="modal-login-btn" style={{borderBottom: 'none'}}>
                <div className="modal-login-btn">Forgot Password?</div>
            </ModalHeader>
            <ModalBody>
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
                            
                            <Button
                                type="submit"
                                size="lg"
                                color="primary"
                                className="blue-btn"
                                disabled={submitting}
                                style={{marginTop: '20px'}}
                            >
                                Reset Password
                            </Button>

                        </Form>

                    )}
                />
            </ModalBody>
            
        </Modal>
}

ForgotPassword.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
}

export default ForgotPassword
