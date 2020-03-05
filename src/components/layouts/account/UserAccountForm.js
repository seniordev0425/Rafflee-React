import React, {useState, useEffect, useRef} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'
import ImageUploader from 'react-images-upload'
import ReactFlagsSelect from 'react-flags-select'
import {getCode, getName} from 'country-list'
import DeleteAccount from '../../modals/DeleteAccount'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import {Switch, DatePicker} from 'antd'
import FaceBookConnectBtn from '../../common/Buttons/FaceBookConnectBtn'
import TwitterConnectBtn from '../../common/Buttons/TwitterConnectBtn'
import TwitchConnectBtn from '../../common/Buttons/TwitchConnectBtn'
import YoutubeConnectBtn from '../../common/Buttons/YoutubeConnectBtn'
import InstagramConnectBtn from '../../common/Buttons/InstagramConnectBtn'
import {getUserProfile, updateUserProfile, sendSmsToUser} from '../../../apis/apiCalls'
import {openNotification} from '../../../utils/notification'
import moment from 'moment'


import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'
import PhoneVerificationModal from '../../modals/PhoneVerificationModal';

function UserAccountForm(props){

    const userFlag = useRef(null)
    
    const [isVerify, setIsVerify] = useState(false)

    const [countryName, setCountryName] = useState('')

    const [submitting, setSubmitting] = useState(false)

    const [initialPhoneNum, setInitialPhoneNum] = useState({phone_number:null, phone_country:null})

    const [initialDate, setInitialDate] = useState('1901-01-01')

    const [imgFormData, setImgFormData] = useState([])

    const [imgBase64Data, setImgBase64Data] = useState('')

    const {dispatch} = props

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [openVerificationModal, setOpenVerificationModal] = useState(false)

    const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal)
    const handleVerificationModal = () => setOpenVerificationModal(!openVerificationModal)

    useEffect(() => {
        getUserProfile(props.token)
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.msg == 'USER_INFORMATION_RETRIEVED'){
                var tmpNum = {}
                tmpNum.phone_country = json_rlt.user_informations.country_code
                tmpNum.phone_number = json_rlt.user_informations.national_number

                if (json_rlt.user_informations.profile_picture != '') setImgBase64Data('data:image/png;base64,' + json_rlt.user_informations.profile_picture)
                if (json_rlt.user_informations.birth_date) setInitialDate(json_rlt.user_informations.birth_date)
                if (json_rlt.user_informations.country != '') userFlag.current.updateSelected(getCode(json_rlt.user_informations.country))

                setCountryName(json_rlt.user_informations.country)
                setInitialPhoneNum(tmpNum)
                
                dispatch({type: "setMyInfo", data: json_rlt.user_informations})
            }
        })
        .catch(error => console.log('error', error));
    }, [])

    const onSubmit = (values) => {
        if (isVerify){
            sendSmsToUser(values)
            .then(response => response.text())
            .then(result => {
                var json_rlt = JSON.parse(result)
                if (json_rlt.status == 200){
                    handleVerificationModal()
                }
            })
            .catch(error => console.log('error', error));
            
        }
        else {
            setSubmitting(true)
            updateUserProfile(values, initialDate, imgFormData, countryName)
            .then(response => response.text())
            .then(result => {
                setSubmitting(false)
                var json_rlt = JSON.parse(result)
                if (json_rlt.status == 200){
                    openNotification('success', 'Success', 'Successfully Updated')
                }
            })
            .catch(error => console.log('error', error));
        }
        
    }

    const onChangeInitialDate = (date, dateString) => {
        setInitialDate(dateString)
    }

    const onSelectFlag = (countryCode) => {
        setCountryName(getName(countryCode))
    }

    const onDrop = (picture) => {
        if (picture && picture[0]) {
            setImgFormData(picture[0])
            
            var file_read = new FileReader()
            file_read.addEventListener('load', (e) => {
                setImgBase64Data(e.target.result)
            })
            file_read.readAsDataURL(picture[0])
        }
    }

    const sendSMS = () => {
        setIsVerify(true)
    }
    const submit = () => {
        setIsVerify(false)
    }

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit, pristine, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="12" sm="6">

                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        {imgBase64Data && (<img className="profile-img" src={imgBase64Data}/>)}
                                        <ImageUploader
                                            buttonText='Upload Image'
                                            onChange={onDrop}
                                            withPreview={true}
                                            className="upload-image-container"
                                            fileContainerStyle={{boxShadow:"none", border:"1px solid #DEE6E9"}}
                                            singleImage={true}
                                            withIcon={false}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                        />
                                    </FormGroup>  
                                </div>
                                <div className="mt-4 half-width" >
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">First Name</div>
                                        <Field
                                            defaultValue={props.myInfo ? props.myInfo.firstname : ''}
                                            name="first_name"
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="First Name"
                                            validate={required('First Name is required')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Last Name</div>
                                        <Field
                                            name="last_name"
                                            defaultValue={props.myInfo ? props.myInfo.lastname : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Last Name"
                                            validate={required('Last Name is required')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Gender</div>
                                        <Field
                                            name="gender"
                                            defaultValue={props.myInfo ? props.myInfo.gender : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Gender"
                                            validate={required('Gender is required')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Phone Number</div>
                                        <div style={{display: "flex", justifyContent: "space-between"}}>
                                            <div style={{width: "70%"}}>
                                                <Field
                                                    name="phonenumber"
                                                    defaultValue={initialPhoneNum}                    
                                                    component={FormPhoneInput}
                                                    className="custom-form-control"
                                                    validate={requiredPhoneObj(' Please enter your phone number')}
                                                />
                                            </div>
                                            {props.myInfo && !props.myInfo.phone_number_verification && (
                                                <div style={{width: "25%"}}>
                                                <Button
                                                        color="primary"
                                                        className="blue-btn mt-1"
                                                        style={{width: "100%", height: 40}}
                                                        onClick={sendSMS}
                                                        type="submit"
                                                    >
                                                        Verify
                                                </Button>
                                            </div>
                                            )}
                                            
                                        </div>
                                        
                                        
                                    </FormGroup>

                                    
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Country</div>
                                        <ReactFlagsSelect
                                            onSelect={onSelectFlag}
                                            ref={userFlag}
                                            searchable={true}
                                            className="menu-flags"
                                            name="country"
                                        />
                                    </FormGroup>  
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Birth Date</div>
                                        <DatePicker
                                            onChange={onChangeInitialDate}
                                            name="birth_date"
                                            value={moment(initialDate, 'YYYY-MM-DD')}
                                            className="ant-date-picker"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Email</div>
                                        <Field
                                            name="email"
                                            defaultValue={props.myInfo ? props.myInfo.email : ''}
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
                                </div>
                            </Col>
                            <Col xs="12" sm="6">
                                <div className="mt-4" style={{width: "100%"}}>
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Address</div>
                                        <Field
                                            name="address"
                                            defaultValue={props.myInfo ? props.myInfo.address : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Address"
                                            validate={required('Address is required')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4" style={{width: "100%"}}>
                                    <FormGroup>
                                        <Field
                                            name="street"
                                            defaultValue={props.myInfo ? props.myInfo.city : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="City"
                                            validate={required('Street is required')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 float-right half-width">
                                    <FormGroup>
                                        <Field
                                            name="postal_code"
                                            defaultValue={props.myInfo ? props.myInfo.region : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Region"
                                            validate={required('Postal code is required')}
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Facebook</div>
                                    <FaceBookConnectBtn/>

                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Twitter</div>
                                    <TwitterConnectBtn/>

                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Twitch</div>
                                    <TwitchConnectBtn/>

                                </div>
                            </Col>
                            <Col xs="12" sm="6">
                                <Row>
                                    <Col xs="12" sm={{size:"6", offset:"6"}} className="pl-0 pr-0">
                                        <div className="mt-4">
                                        
                                        <div className="footer-link-bold mb-3">Youtube</div>
                                        <YoutubeConnectBtn/>

                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm={{size:"6", offset:"6"}} className="pl-0 pr-0">
                                        <div className="mt-4">
                                        
                                        <div className="footer-link-bold mb-3">Instagram</div>
                                        <InstagramConnectBtn/>

                                        </div>
                                    </Col>
                                </Row>
                                <Row style={{justifyContent:"flex-end"}}>
                                    <div className="mt-4 half-width">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            color="primary"
                                            className="blue-btn mt-2"
                                            style={{width:"45%", marginRight:"5%"}}
                                            onClick={submit}
                                            disabled={submitting}
                                        >
                                            Update
                                        </Button>
                                        <Button
                                            size="lg"
                                            color="danger"
                                            className="red-btn mt-2"
                                            onClick={handleDeleteModal}
                                            style={{width:"45%", marginLeft:"5%"}}
                                        >
                                            Delete
                                        </Button>

                                    </div>
                                </Row>
                                
                               
                            </Col>
                        </Row>

                    </Form>
                )}
            />
            <DeleteAccount
                open={openDeleteModal}
                onToggle={handleDeleteModal}
            />
            <PhoneVerificationModal
                open={openVerificationModal}
                onToggle={handleVerificationModal}
                phone_number={initialPhoneNum}
            />
        </>
    )
}

function mapStateToProps(state) {
    return {
        myInfo: state.userInfo.myInfo,
        token: state.userInfo.token,
        company: state.userInfo.company,
    }
}
export default connect(mapStateToProps)(UserAccountForm);