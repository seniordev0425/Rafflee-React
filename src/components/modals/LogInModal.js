import React, {useState} from 'react'
import { connect, useSelector, useDispatch } from "react-redux";
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button} from 'reactstrap'
import FormInput from '../common/FormInput'
import FormCheckbox from '../common/FormCheckbox'
import ForgotPassword from './ForgotPassword'
import { logIn } from '../../actions/userInfo'


import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength
} from '../../utils/validation'

function LogInModal(props){
    
    const { toggle } = props

    const isLoading = useSelector(state=>state.userInfo.LOG_IN_SUCCESS)
    const dispatch = useDispatch()

    const [openForgotModal, setOpenForgotModal] = useState(false)

    const handleForgotModal = () => setOpenForgotModal(!openForgotModal)

    const onSubmit = (values) => {
        var body = {
            username: values.username,
            password: values.password
        }
        dispatch(logIn(body))
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
                            disabled={isLoading}
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
                toggle={toggle}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default connect(mapStateToProps)(LogInModal);