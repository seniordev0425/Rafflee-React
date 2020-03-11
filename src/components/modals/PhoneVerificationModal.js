import React, {useState, useEffect} from 'react'
import { connect, useSelector, useDispatch } from "react-redux";
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import ReactCodeInput from 'react-verification-code-input'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Input, Modal, ModalHeader, ModalBody } from 'reactstrap'
import FormInput from '../common/FormInput'
import { openNotification } from '../../utils/notification'
import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'

import { resendSms, verifyPhoneNumber } from '../../actions/userInfo'

function PhoneVerificationModal(props) {
    const { open, onToggle, phone_number } = props

    const isVerifying = useSelector(state=>state.userInfo.VERIFY_PHONE_NUMBER_SUCCESS)
    const isVerified = useSelector(state=>state.userInfo.userProfile.phone_number_verification)

    const dispatch = useDispatch()

    const [verifyCode, setVerifyCode] = useState('')


    useEffect(() => {
        if (isVerified)
            onToggle()
    },[isVerified])

    const onSubmit = () => {
        var body = {
            number: `+${phone_number.phone_country}${phone_number.phone_number}`,
            code: verifyCode
        }
        dispatch(verifyPhoneNumber(body))
    }

    const resendCode = () => {
        var body = {
            number: `+${phone_number.phone_country}${phone_number.phone_number}`
        }
        dispatch(resendSms(body))
    }

    const handleVerifyCode = (values) => {
        setVerifyCode(values)
    }
    return (<Modal isOpen={open} toggle={onToggle}>
            <ModalHeader className="modal-login-btn" style={{borderBottom: 'none'}}>
                <div className="modal-login-btn">Enter Verification Code</div>
            </ModalHeader>
            <ModalBody>
                <ReactCodeInput 
                    className="m-auto"
                    onChange={handleVerifyCode}
                />
                <div className="d-flex justify-content-center">
                    <Button
                        color="primary"
                        className="blue-btn mt-4"
                        style={{width: 100, height: 40}}
                        onClick={onSubmit}
                        disabled={isVerifying}
                        type="submit"
                    >
                        Verify
                    </Button>
                </div>
                <div className="blue-link-btn d-flex justify-content-center mt-4">
                    <span onClick={resendCode}>
                        Resend verification code
                    </span>  
                </div>
                
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
