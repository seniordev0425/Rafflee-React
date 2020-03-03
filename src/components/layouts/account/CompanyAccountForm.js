import React, {useState, useEffect, useRef} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'
import {getCode, getName} from 'country-list'
import ImageUploader from 'react-images-upload'
import DeleteAccount from '../../modals/DeleteAccount'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import FaceBookConnectBtn from '../../common/Buttons/FaceBookConnectBtn'
import TwitterConnectBtn from '../../common/Buttons/TwitterConnectBtn'
import TwitchConnectBtn from '../../common/Buttons/TwitchConnectBtn'
import YoutubeConnectBtn from '../../common/Buttons/YoutubeConnectBtn'
import InstagramConnectBtn from '../../common/Buttons/InstagramConnectBtn'
import {getCompanyProfile, updateCompanyProfile} from '../../../apis/apiCalls'
import {openNotification} from '../../../utils/notification'


import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'

function CompanyAccountForm(props){

    const userFlag = useRef(null)
    const [submitting, setSubmitting] = useState(false)

    const [initialPhoneNum, setInitialPhoneNum] = useState({phone_number:null, phone_country:null})
    const [countryName, setCountryName] = useState('')
    const [imgBase64Data, setImgBase64Data] = useState('')
    const [imgFormData, setImgFormData] = useState([])
    
    const {dispatch} = props

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal)

    useEffect(() => {
        getCompanyProfile(props.token)
        .then(response => response.text())
        .then(result => {
            var json_rlt = JSON.parse(result)
            if (json_rlt.msg == 'COMPANY_INFORMATION_RETRIEVED'){
                var tmpNum = {}
                tmpNum.phone_country = json_rlt.user_informations.country_code
                tmpNum.phone_number = json_rlt.user_informations.national_number
                setInitialPhoneNum(tmpNum)

                if (json_rlt.user_informations.logo != '') setImgBase64Data('data:image/png;base64,' + json_rlt.user_informations.logo)
                if (json_rlt.user_informations.country != '') userFlag.current.updateSelected(getCode(json_rlt.user_informations.country))

                setCountryName(json_rlt.user_informations.country)

                dispatch({type: "setMyInfo", data: json_rlt.user_informations})
            }
        })
        .catch(error => console.log('error', error));
    }, [])

    const onSubmit = (values) => {
        setSubmitting(true)
        updateCompanyProfile(values, countryName, imgFormData)
        .then(response => response.text())
        .then(result => {
            console.log(result)
            setSubmitting(false)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status == 200){
                openNotification('success', 'Success', 'Successfully Updated')
            }
        })
        .catch(error => console.log('error', error));
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

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit, pristine, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width" >
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Admin Email</div>
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
                            
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Phone Number</div>
                                        <Field
                                            name="phonenumber"
                                            defaultValue={initialPhoneNum}  
                                            component={FormPhoneInput}
                                            className="custom-form-control"
                                            validate={requiredPhoneObj('Please enter your phone number')}
                                        />
                                    </FormGroup>
                                </div>
                        
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Company Name</div>
                                        <Field
                                            name="company_name"
                                            defaultValue={props.myInfo ? props.myInfo.company_name : ''}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Company Name"
                                            validate={required('Company Name is required')}
                                        />
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
                                        {imgBase64Data && (<img src={imgBase64Data}/>)}
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
                                <Row style={{justifyContent:"flex-end"}}>
                                    <div className="mt-4 half-width">
                                        <div className="footer-link-bold mb-3">Youtube</div>
                                        <YoutubeConnectBtn/>

                                    </div>
                                </Row>
                                <Row style={{justifyContent:"flex-end"}}>
                                    <div className="mt-4 half-width">
                                        <div className="footer-link-bold mb-3">Instagram</div>
                                        <InstagramConnectBtn/>

                                    </div>
                                </Row>
                                <Row style={{justifyContent:"flex-end"}}>
                                    <div className="mt-4 half-width">
                                        <Button
                                            type="submit"
                                            size="lg"
                                            color="primary"
                                            className="blue-btn mt-2"
                                            style={{width:"45%", marginRight:"5%"}}
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
export default connect(mapStateToProps)(CompanyAccountForm);