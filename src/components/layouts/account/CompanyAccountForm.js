import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'
import { getCode, getName } from 'country-list'
import ImageUploader from 'react-images-upload'
import DeleteAccount from '../../modals/DeleteAccount'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import FaceBookConnectBtn from '../../common/Buttons/FaceBookConnectBtn'
import TwitterConnectBtn from '../../common/Buttons/TwitterConnectBtn'
import TwitchConnectBtn from '../../common/Buttons/TwitchConnectBtn'
import YoutubeConnectBtn from '../../common/Buttons/YoutubeConnectBtn'
import InstagramConnectBtn from '../../common/Buttons/InstagramConnectBtn'
import { updateCompanyProfile } from '../../../actions/userInfo'
import { getCompanyProfile } from '../../../actions/userInfo'



import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'
import Loading from '../../common/Loading';

function CompanyAccountForm(props){

    const companyProfile = useSelector(state=>state.userInfo.companyProfile)
    const isLoading = useSelector(state=>state.userInfo.GET_COMPANY_PROFILE_SUCCESS)
    const isUpdating = useSelector(state=>state.userInfo.UPDATE_COMPANY_PROFILE_SUCCESS)

    const dispatch = useDispatch()

    const [initialPhoneNum, setInitialPhoneNum] = useState({phone_number:null, phone_country:null})
    const [countryName, setCountryName] = useState('')
    const [imgBase64Data, setImgBase64Data] = useState('')
    const [imgFormData, setImgFormData] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal)

    const { logo, country_code, national_number, country } = companyProfile

    useEffect(() => {
        dispatch(getCompanyProfile())
    },[])

    useEffect(() => {
        var tmpNum = {}
        tmpNum.phone_country = country_code
        tmpNum.phone_number = national_number
        setInitialPhoneNum(tmpNum)

        if (logo != '') setImgBase64Data('data:image/png;base64,' + logo)
        setCountryName(country)
    }, [companyProfile])

    const onSubmit = (values) => {
        var formdata = new FormData()
        formdata.append("logo", imgFormData)
        formdata.append("phone_number", values.phonenumber.phone_number)
        formdata.append("prefix_number", values.phonenumber.phone_country)
        formdata.append("country", countryName)
        formdata.append("region", values.postal_code)
        formdata.append("address", values.address)
        formdata.append("city", values.street)
        dispatch(updateCompanyProfile(formdata))
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

    if (isLoading)
        return <Loading/>

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
                                        <div className="footer-link-bold mb-3">Admin Email</div>
                                        <Field
                                            name="email"
                                            defaultValue={ companyProfile.email }
                                            component={ FormInput }
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
                                            defaultValue={ initialPhoneNum }  
                                            component={ FormPhoneInput }
                                            className="custom-form-control"
                                            validate={ requiredPhoneObj('Please enter your phone number') }
                                        />
                                    </FormGroup>
                                </div>
                        
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Company Name</div>
                                        <Field
                                            name="company_name"
                                            defaultValue={ companyProfile.company_name }
                                            component={ FormInput }
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Company Name"
                                            validate={ required('Company Name is required') }
                                        />
                                    </FormGroup>
                                    
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Country</div>
                                        <ReactFlagsSelect
                                            onSelect={ onSelectFlag }
                                            defaultCountry={ getCode(country || 'France') }
                                            searchable={true}
                                            className="menu-flags"
                                            name="country"
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
                                            defaultValue={ companyProfile.address }
                                            component={ FormInput }
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Address"
                                            validate={ required('Address is required') }
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4" style={{width: "100%"}}>
                                    <FormGroup>
                                        <Field
                                            name="street"
                                            defaultValue={ companyProfile.city }
                                            component={ FormInput }
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="City"
                                            validate={ required('Street is required') }
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 float-right half-width">
                                    <FormGroup>
                                        <Field
                                            name="postal_code"
                                            defaultValue={ companyProfile.region }
                                            component={ FormInput }
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Region"
                                            validate={ required('Postal code is required') }
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
                                            disabled={isUpdating}
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

export default CompanyAccountForm;