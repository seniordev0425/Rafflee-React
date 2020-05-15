import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import { Select, Button } from 'antd'
import ImageUploader from 'react-images-upload'
import ReactFlagsSelect from 'react-flags-select'
import { getCode, getName } from 'country-list'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteAccount from '../../modals/DeleteAccount'
import ImageCropModal from '../../modals/ImageCropModal'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import { DatePicker } from 'antd'
import FaceBookConnectBtn from '../../common/Buttons/FaceBookConnectBtn'
import TwitterConnectBtn from '../../common/Buttons/TwitterConnectBtn'
import TwitchConnectBtn from '../../common/Buttons/TwitchConnectBtn'
import YoutubeConnectBtn from '../../common/Buttons/YoutubeConnectBtn'
import InstagramConnectBtn from '../../common/Buttons/InstagramConnectBtn'
import SteamConnectBtn from '../../common/Buttons/SteamConnectBtn'
import { getUserProfile, sendSms, updateUserProfile } from '../../../actions/userInfo'
import moment from 'moment'
import { b64toBlob } from '../../../utils/others'
import {
    composeValidators,
    required,
    isEmail,
} from '../../../utils/validation'
import PhoneVerificationModal from '../../modals/PhoneVerificationModal';
import Loading from '../../common/Loading';
import { useTranslation } from 'react-i18next'

function UserAccountForm() {
    const { t } = useTranslation()

    const userProfile = useSelector(state => state.userInfo.userProfile)
    const phone_number_verified = useSelector(state => state.userInfo.phone_number_verified)
    const isLoading = useSelector(state => state.userInfo.GET_USER_PROFILE_SUCCESS)
    const isUpdating = useSelector(state => state.userInfo.UPDATE_USER_PROFILE)
    const UPDATE_USER_PROFILE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_UPDATE_USER_PROFILE)
    const isSendingSms = useSelector(state => state.userInfo.SEND_SMS)
    const toggleVerificationModal = useSelector(state => state.userInfo.SUCCESS_SEND_SMS)


    const dispatch = useDispatch()

    const { Option } = Select

    const [countryName, setCountryName] = useState('')

    const [initialPhoneNum, setInitialPhoneNum] = useState({ phone_number: null, phone_country: null })

    const [verifyPhoneNumber, setVerifyPhoneNumber] = useState('')

    const [initialDate, setInitialDate] = useState('1970-01-01')

    const [imgFormData, setImgFormData] = useState([])

    const [genderState, setGenderState] = useState('')

    const [imgBase64Data, setImgBase64Data] = useState('')

    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    const [openImageCropModal, setOpenImageCropModal] = useState(false)

    const [openVerificationModal, setOpenVerificationModal] = useState(false)

    const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal)
    const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)
    const handleVerificationModal = () => setOpenVerificationModal(!openVerificationModal)


    const { country_code, national_number, profile_picture, birth_date, country, gender } = userProfile

    useEffect(() => {
        dispatch(getUserProfile())
    }, [])

    useEffect(() => {
        if (toggleVerificationModal) {
            handleVerificationModal()
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_SEND_SMS', data: false })
        }
    }, [toggleVerificationModal])

    useEffect(() => {
        var tmpNum = {}
        tmpNum.phone_country = country_code
        tmpNum.phone_number = national_number
        setInitialPhoneNum(tmpNum)
        setVerifyPhoneNumber(tmpNum)

        if (birth_date) setInitialDate(birth_date)
        setCountryName(country)
        setGenderState(gender)
    }, [userProfile])

    useEffect(() => {
        if (UPDATE_USER_PROFILE_SUCCESS) {
            if (imgBase64Data) {
                dispatch({ type: 'UPDATE_USER_PICTURE', data: imgBase64Data })
                dispatch({ type: 'INIT_STATE', state: 'SUCCESS_UPDATE_USER_PROFILE', data: false })
            }
        }
    }, [UPDATE_USER_PROFILE_SUCCESS])

    const onSubmit = (values) => {
        var formdata = new FormData()

        var blob = null
        if (imgBase64Data) {
            var block = imgBase64Data.split(";");
            var contentType = block[0].split(":")[1];
            var realData = block[1].split(",")[1];
            blob = b64toBlob(realData, contentType);
        }

        formdata.append("profile_picture", blob)
        formdata.append("phone_number", values.phonenumber.phone_number)
        formdata.append("prefix_number", values.phonenumber.phone_country)
        formdata.append("country", countryName)
        formdata.append("birth_date", initialDate)
        formdata.append("first_name", values.first_name)
        formdata.append("last_name", values.last_name)
        formdata.append("address", values.address !== undefined ? values.address : '')
        formdata.append("city", values.street !== undefined ? values.street : '')
        formdata.append("region", values.postal_code !== undefined ? values.postal_code : '')
        formdata.append("gender", genderState)
        dispatch(updateUserProfile(formdata))
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
        var body = {
            number: `+${verifyPhoneNumber.phone_country}${verifyPhoneNumber.phone_number}`
        }
        dispatch(sendSms(body))
    }

    if (isLoading)
        return <Loading />

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        {(imgBase64Data || profile_picture) &&
                                            <>
                                                <img className="profile-img" src={imgBase64Data ? imgBase64Data : profile_picture} />
                                                {imgBase64Data &&
                                                    <div>
                                                        <Button
                                                            onClick={handleImageCropModal}
                                                            type="primary"
                                                            className="ant-blue-btn mt-2"
                                                            style={{ width: 100, height: 30, fontSize: '1rem', lineHeight: 1 }}
                                                        >
                                                            {t('button_group.edit')}
                                                        </Button>
                                                    </div>
                                                }
                                            </>
                                        }
                                        <ImageUploader
                                            buttonText={t('button_group.upload_image')}
                                            onChange={onDrop}
                                            className="upload-image-container"
                                            fileContainerStyle={{ boxShadow: "none", border: "1px solid #DEE6E9" }}
                                            singleImage={true}
                                            withIcon={false}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width" >
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.first_name')}</div>
                                        <Field
                                            defaultValue={userProfile.firstname}
                                            name="first_name"
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.first_name')}
                                            validate={required(t('account_page.first_name_required'))}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.last_name')}</div>
                                        <Field
                                            name="last_name"
                                            defaultValue={userProfile.lastname}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.last_name')}
                                            validate={required(t('account_page.last_name_required'))}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.gender')}</div>
                                        <Select
                                            defaultValue={gender ? gender : 'male'}
                                            onChange={val => setGenderState(val)}
                                            size="large"
                                        >
                                            <Option value="male">{t('account_page.male')}</Option>
                                            <Option value="female">{t('account_page.female')}</Option>
                                        </Select>
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.country')}</div>
                                        <ReactFlagsSelect
                                            onSelect={onSelectFlag}
                                            defaultCountry={getCode(country || 'France')}
                                            searchable={true}
                                            className="menu-flags"
                                            name="country"
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.birth_date')}</div>
                                        <DatePicker
                                            onChange={onChangeInitialDate}
                                            name="birth_date"
                                            value={moment(initialDate, 'YYYY-MM-DD')}
                                            className="ant-date-picker"
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                            <Col xs="12" sm="6">
                                <div className="mt-4" style={{ width: "100%" }}>
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.address')}</div>
                                        <Field
                                            name="address"
                                            defaultValue={userProfile.address}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.address')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4" style={{ width: "100%" }}>
                                    <FormGroup>
                                        <Field
                                            name="street"
                                            defaultValue={userProfile.city}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.city')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <Field
                                            name="postal_code"
                                            defaultValue={userProfile.region}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.region')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 w-100">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.email')}</div>
                                        <Field
                                            name="email"
                                            defaultValue={userProfile.email}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="email"
                                            placeholder="name@example.com"
                                            validate={composeValidators(
                                                required(t('account_page.enter_valid_email')),
                                                isEmail(t('account_page.enter_valid_email'))
                                            )}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 w-100">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.phone_number')}</div>
                                        <div className="d-flex justify-content-between">
                                            <div style={{ width: "70%" }}>
                                                <Field
                                                    name="phonenumber"
                                                    defaultValue={initialPhoneNum}
                                                    component={FormPhoneInput}
                                                    className="custom-form-control"
                                                />
                                                <OnChange name="phonenumber">
                                                    {(value) => {
                                                        setVerifyPhoneNumber(value)
                                                    }}
                                                </OnChange>
                                            </div>
                                            <div className="d-flex justify-content-end align-items-center w-25">
                                                {!phone_number_verified
                                                    ?
                                                    <Button
                                                        type="primary"
                                                        className="ant-blue-btn mt-1"
                                                        onClick={sendSMS}
                                                        loading={isSendingSms}
                                                    >
                                                        {!isSendingSms && t('button_group.verify')}
                                                    </Button>
                                                    :
                                                    <FontAwesomeIcon icon={faCheckCircle} className="phone-verified-icon" />
                                                }
                                            </div>
                                        </div>
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Facebook</div>
                                    <FaceBookConnectBtn />

                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Twitter</div>

                                    <TwitterConnectBtn connected={userProfile.twitter} />

                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3">Twitch</div>
                                    <TwitchConnectBtn connected={userProfile.twitch} />

                                </div>
                            </Col>
                            <Col xs="12" sm="6">
                                <div className="mt-4 d-flex justify-content-end">
                                    <div className="half-width">
                                        <div className="footer-link-bold mb-3">Youtube</div>
                                        <YoutubeConnectBtn />
                                    </div>
                                </div>

                                <div className="mt-4 d-flex justify-content-end">
                                    <div className="half-width">
                                        <div className="footer-link-bold mb-3">Instagram</div>
                                        <InstagramConnectBtn />
                                    </div>
                                </div>
                                <div className="mt-4 d-flex justify-content-end">
                                    <div className="half-width">
                                        <div className="footer-link-bold mb-3">Steam</div>
                                        <SteamConnectBtn />
                                    </div>
                                </div>

                                <div className="mt-4 d-flex justify-content-end">
                                    <div className="mt-4 half-width">
                                        <Button
                                            htmlType='submit'
                                            type="primary"
                                            className="ant-blue-btn mt-2"
                                            style={{ width: "45%", marginRight: "5%" }}
                                            loading={isUpdating}
                                        >
                                            {!isUpdating && t('button_group.update')}
                                        </Button>
                                        <Button
                                            type="danger"
                                            className="ant-red-btn mt-2"
                                            onClick={handleDeleteModal}
                                            style={{ width: "45%", marginLeft: "5%" }}
                                        >
                                            {t('button_group.delete')}
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Form>
                )}
            />
            <DeleteAccount
                open={openDeleteModal}
                onToggle={handleDeleteModal}
            />
            <ImageCropModal
                open={openImageCropModal}
                onToggle={handleImageCropModal}
                setBase64Data={(value) => setImgBase64Data(value)}
                src={imgBase64Data}
            />
            <PhoneVerificationModal
                open={openVerificationModal}
                onToggle={handleVerificationModal}
                phone_number={verifyPhoneNumber}
            />
        </>
    )
}

export default UserAccountForm