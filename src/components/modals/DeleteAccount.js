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
import {deleteAccountRequest} from '../../apis/apiCalls'

function DeleteAccount(props) {
    const { open, onToggle, dispatch, history } = props
    const [submitting, setSubmitting] = useState(false)

    const onSubmit = (values) => {
        setSubmitting(true)    
        deleteAccountRequest(values)
          .then(response => response.text())
          .then(result => {
              setSubmitting(false)
              var json_rlt = JSON.parse(result)
              if (json_rlt.status == 200){
                dispatch({type: "LOG_IN_SUCCESS", data: {token: null, company: false}})
                if (localStorage.length) localStorage.clear() 
                history.push('/')
                openNotification('success', 'Account was deleted.', '')
                
              }
          })
          .catch(error => console.log('error', error));
    }
    return (<Modal isOpen={open} toggle={onToggle}>
            <ModalHeader className="modal-login-btn" style={{borderBottom: 'none'}}>
                <div className="modal-login-btn">Delete Account</div>
            </ModalHeader>
            <ModalBody>
                <FinalForm
                    onSubmit={onSubmit}
                    render={({handleSubmit, pristine, values}) => (
                        <Form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Field
                                    name="password"
                                    component={FormInput}
                                    className="custom-form-control"
                                    type="password"
                                    validate={required('Password required')}
                                />
                            </FormGroup>
                            
                            <Button
                                type="submit"
                                size="lg"
                                color="danger"
                                className="red-btn"
                                disabled={submitting}
                                style={{marginTop: '20px'}}
                            >
                                Delete Account
                            </Button>

                        </Form>

                    )}
                />
            </ModalBody>
            
        </Modal>)
}

DeleteAccount.propTypes = {
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
export default compose(withRouter, connect(mapStateToProps))(DeleteAccount);
