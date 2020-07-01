import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Row, Col } from 'reactstrap'
import { Button } from 'antd'
import ReactFlagsSelect from 'react-flags-select'
import { getCode, getName } from 'country-list'
import ImageUploader from 'react-images-upload'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import DeleteAccount from '../../modals/DeleteAccount'
import ImageCropModal from '../../modals/ImageCropModal'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import FaceBookConnectBtn from '../../common/Buttons/FaceBookConnectBtn'
import TwitterConnectBtn from '../../common/Buttons/TwitterConnectBtn'
import TwitchConnectBtn from '../../common/Buttons/TwitchConnectBtn'
import YoutubeConnectBtn from '../../common/Buttons/YoutubeConnectBtn'
import InstagramConnectBtn from '../../common/Buttons/InstagramConnectBtn'
import SnapchatConnectBtn from '../../common/Buttons/SnapchatConnectBtn'
import SteamConnectBtn from '../../common/Buttons/SteamConnectBtn'
import { updateCompanyProfile } from '../../../actions/userInfo'
import { getCompanyProfile } from '../../../actions/userInfo'
import { b64toBlob } from '../../../utils/others'
import { UPLOAD_MAX_SIZE } from '../../../utils/constants'
import {
    composeValidators,
    required,
    isEmail,
} from '../../../utils/validation'
import Loading from '../../common/Loading';

import { useTranslation } from 'react-i18next'


function CompanyAccountForm(props) {
    const { t } = useTranslation()

    const companyProfile = useSelector(state => state.userInfo.companyProfile)
    const isLoading = useSelector(state => state.userInfo.GET_COMPANY_PROFILE_SUCCESS)
    const isUpdating = useSelector(state => state.userInfo.UPDATE_COMPANY_PROFILE)
    const UPDATE_COMPANY_PROFILE_SUCCESS = useSelector(state => state.userInfo.SUCCESS_UPDATE_COMPANY_PROFILE)

    const dispatch = useDispatch()

    const [initialPhoneNum, setInitialPhoneNum] = useState({ phone_number: null, phone_country: null })
    const [countryName, setCountryName] = useState('')
    const [imgBase64Data, setImgBase64Data] = useState('')
    const [imgFormData, setImgFormData] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openImageCropModal, setOpenImageCropModal] = useState(false)

    const handleDeleteModal = () => setOpenDeleteModal(!openDeleteModal)
    const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

    const { logo, country_code, national_number, country } = companyProfile

    useEffect(() => {
        dispatch(getCompanyProfile())
    }, [])

    useEffect(() => {
        var tmpNum = {}
        tmpNum.phone_country = country_code
        tmpNum.phone_number = national_number
        setInitialPhoneNum(tmpNum)
        setCountryName(country)
    }, [companyProfile])

    useEffect(() => {
        if (UPDATE_COMPANY_PROFILE_SUCCESS) {
            if (imgBase64Data) {
                dispatch({ type: 'UPDATE_COMPANY_LOGO', data: imgBase64Data })
                dispatch({ type: 'INIT_STATE', state: 'SUCCESS_UPDATE_COMPANY_PROFILE', data: false })
            }
        }
    }, [UPDATE_COMPANY_PROFILE_SUCCESS])

    const onSubmit = (values) => {
        var formdata = new FormData()

        var blob = null
        if (imgBase64Data) {
            var block = imgBase64Data.split(";");
            var contentType = block[0].split(":")[1];
            var realData = block[1].split(",")[1];
            blob = b64toBlob(realData, contentType);
        }

        formdata.append("logo", blob)
        formdata.append("phone_number", values.phonenumber.phone_number)
        formdata.append("prefix_number", values.phonenumber.phone_country)
        formdata.append("country", countryName || '')
        formdata.append("region", values.postal_code || '')
        formdata.append("address", values.address || '')
        formdata.append("city", values.street || '')

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
        return <div className="min-height-container"><Loading /></div>

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit, pristine, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        {(imgBase64Data || logo) &&
                                            <>
                                                <img className="profile-img" src={imgBase64Data ? imgBase64Data : logo} alt="" />
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
                                            buttonText={t('button_group.upload_profile_picture')}
                                            buttonStyles={{ borderRadius: 6 }}
                                            onChange={onDrop}
                                            className="upload-image-container"
                                            fileContainerStyle={{ boxShadow: "none", alignItems: 'flex-start' }}
                                            singleImage={true}
                                            withIcon={false}
                                            withLabel={false}
                                            maxFileSize={UPLOAD_MAX_SIZE}
                                            fileSizeError='file size is too big. Max 1MB'
                                        />
                                    </FormGroup>
                                </div>


                                <div className="mt-4 half-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.company_name')}</div>
                                        <Field
                                            name="company_name"
                                            defaultValue={companyProfile.company_name}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Company Name"
                                            validate={required(t('account_page.company_name_required'))}
                                        />
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

                            </Col>
                            <Col xs="12" sm="6">
                                <div className="mt-4" style={{ width: "100%" }}>
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.address')}</div>
                                        <Field
                                            name="address"
                                            defaultValue={companyProfile.address}
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
                                            defaultValue={companyProfile.city}
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
                                            defaultValue={companyProfile.region}
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('account_page.region')}
                                        />
                                    </FormGroup>
                                </div>
                                <div className="mt-4 w-100" >
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('account_page.admin_email')}</div>
                                        <Field
                                            name="email"
                                            defaultValue={companyProfile.email}
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
                                        <Field
                                            name="phonenumber"
                                            defaultValue={initialPhoneNum}
                                            component={FormPhoneInput}
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12" sm="6">
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3 d-flex align-items-center">
                                        <span>Facebook</span>
                                        {companyProfile.facebook &&
                                            <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                                        }
                                    </div>
                                    <FaceBookConnectBtn connected={companyProfile.facebook} />
                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3 d-flex align-items-center">
                                        <span>Twitter</span>
                                        {companyProfile.twitter &&
                                            <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                                        }
                                    </div>
                                    <TwitterConnectBtn connected={companyProfile.twitter} />
                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3 d-flex align-items-center">
                                        <span>Twitch</span>
                                        {companyProfile.twitch &&
                                            <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                                        }
                                    </div>
                                    <TwitchConnectBtn connected={companyProfile.twitch} />
                                </div>
                                <div className="mt-4 half-width">
                                    <div className="footer-link-bold mb-3 d-flex align-items-center">
                                        <span>Snapchat</span>
                                        {companyProfile.snapchat &&
                                            <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                                        }
                                    </div>
                                    <SnapchatConnectBtn connected={companyProfile.snapchat} />
                                </div>
                            </Col>
                            <Col xs="12" sm="6">
                                <Row style={{ justifyContent: "flex-end" }}>
                                    <div className="mt-4 half-width">
                                        <div className="footer-link-bold mb-3">Youtube</div>
                                        <YoutubeConnectBtn />
                                    </div>
                                </Row>
                                <Row style={{ justifyContent: "flex-end" }}>
                                    <div className="mt-4 half-width">
                                        <div className="footer-link-bold mb-3 d-flex align-items-center">
                                            <span>Instagram</span>
                                            {companyProfile.instagram &&
                                                <FontAwesomeIcon icon={faCheckCircle} className="color-blue font-size-12 ml-3" />
                                            }
                                        </div>
                                        <InstagramConnectBtn connected={companyProfile.instagram} />
                                    </div>
                                </Row>
                                <Row style={{ justifyContent: "flex-end" }}>
                                    <div className="mt-4 half-width">
                                        <div className="footer-link-bold mb-3">Steam</div>
                                        <SteamConnectBtn />
                                    </div>
                                </Row>
                                <Row className="justify-content-sm-end justify-content-start mt-4">
                                    <Button
                                        htmlType='submit'
                                        type="primary"
                                        className="ant-blue-btn mt-2"
                                        style={{ width: 200 }}
                                        loading={isUpdating}
                                    >
                                        {!isUpdating && t('button_group.update')}
                                    </Button>
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
            <ImageCropModal
                open={openImageCropModal}
                onToggle={handleImageCropModal}
                setBase64Data={(value) => setImgBase64Data(value)}
                src={imgBase64Data}
            />
        </>
    )
}

export default CompanyAccountForm