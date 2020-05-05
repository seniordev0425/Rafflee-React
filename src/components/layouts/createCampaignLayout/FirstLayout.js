import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import PropTypes from 'prop-types'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import ImageUploader from 'react-images-upload'
import { DatePicker, Radio, Select } from 'antd'
import ImageCropModal from '../../modals/ImageCropModal'
import FormInput from '../../common/FormInput'
import WinningItem from './WinningItem'
import CheckBoxButtonWithString from '../../common/Buttons/CheckBoxButtonWithString'
import { getCategories } from '../../../actions/homepage'
import moment from 'moment'
import images from '../../../utils/images'
import { required } from '../../../utils/validation'
import { b64toBlob } from '../../../utils/others'

import { useTranslation } from 'react-i18next'
import TwitterLikeModal from '../../modals/ActionFieldModals/TwitterLikeModal'
import TwitterFollowModal from '../../modals/ActionFieldModals/TwitterFollowModal'
import TwitterCommentModal from '../../modals/ActionFieldModals/TwitterCommentModal'
import TwitterRetweetModal from '../../modals/ActionFieldModals/TwitterRetweetModal'

function FirstLayout(props) {
    const { t } = useTranslation()

    const { gotoPollCreate, gotoFinalLayout, pollCreated, firstFormTempData } = props

    let tempCategories = [];
    ((firstFormTempData || {}).categories || []).map((item) => tempCategories.push({ name: item }))

    const { Option } = Select
    const [children, setChildren] = useState([])
    const [categories, setCategories] = useState(tempCategories)
    const [distribution, setDistribution] = useState((firstFormTempData || {}).distribution ? (firstFormTempData || {}).distribution : 'direct')
    const [winningArr, setWinningArr] = useState((firstFormTempData || {}).winningArr ? (firstFormTempData || {}).winningArr : [{ name: '', number_of_people: '', description: '', image: '' }])
    const [startDate, setStartDate] = useState((firstFormTempData || {}).startDate ? (firstFormTempData || {}).startDate : '')
    const [endDate, setEndDate] = useState((firstFormTempData || {}).endDate ? (firstFormTempData || {}).endDate : '')
    const [winStartDate, setWinStartDate] = useState((firstFormTempData || {}).winStartDate ? (firstFormTempData || {}).winStartDate : '')
    const [winEndDate, setWinEndDate] = useState((firstFormTempData || {}).winEndDate ? (firstFormTempData || {}).winEndDate : '')
    const [imgFormData, setImgFormData] = useState([])
    const [imgBase64Data, setImgBase64Data] = useState((firstFormTempData || {}).imgBase64Data ? (firstFormTempData || {}).imgBase64Data : '')
    const [socialActions, setSocialActions] = useState((firstFormTempData || {}).socialActions ? firstFormTempData.socialActions : {
        twitter: {
            tweet: false,
            tweet_model: '',
            like: false,
            like_id: '',
            retweet: false,
            retweet_id: '',
            follow: false,
            follow_type: '',
            follow_id: ''
        },
        facebook: {
            comment: false,
            like: false,
            follow: false
        },
        instagram: {
            comment: false,
            like: false,
            follow: false
        },
        youtube: {
            like: false,
            follow: false
        },
        twitch: {
            comment: false,
            like: false,
            follow: false
        },
    })

    const [openTwitterLikeModal, setOpenTwitterLikeModal] = useState(false)
    const [openTwitterFollowModal, setOpenTwitterFollowModal] = useState(false)
    const [openTwitterCommentModal, setOpenTwitterCommentModal] = useState(false)
    const [openTwitterRetweetModal, setOpenTwitterRetweetModal] = useState(false)


    const [tempData, setTempData] = useState(firstFormTempData)

    const categoryArr = useSelector(state => state.homepage.categories)
    const dispatch = useDispatch()

    const [openImageCropModal, setOpenImageCropModal] = useState(false)
    const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

    useEffect(() => {
        dispatch(getCategories())
    }, [])

    useEffect(() => {
        let temp = []
        categoryArr.map((item) =>
            temp.push(<Option key={item.name}>{item.name}</Option>)
        )
        setChildren(temp)
    }, [categoryArr])

    const handleActions = (category, action) => {
        // console.log(socialActions)
        let newActions = { ...socialActions }
        newActions[category][action] = !newActions[category][action]
        setSocialActions(newActions)
        setTempData({ ...tempData, socialActions: socialActions })
    }

    const handleActionValues = (category, action, val) => {
        let newActions = { ...socialActions }
        newActions[category][action] = val
        setSocialActions(newActions)
        setTempData({ ...tempData, socialActions: socialActions })
    }
    const onChangeStartDate = (date, dateString) => {
        setStartDate(dateString)
        setTempData({ ...tempData, startDate: dateString })
    }

    const onChangeEndDate = (date, dateString) => {
        setEndDate(dateString)
        setTempData({ ...tempData, endDate: dateString })
    }

    const onChangeWinStartDate = (date, dateString) => {
        setWinStartDate(dateString)
        setTempData({ ...tempData, winStartDate: dateString })
    }

    const onChangeWinEndDate = (date, dateString) => {
        setWinEndDate(dateString)
        setTempData({ ...tempData, winEndDate: dateString })
    }

    const onChangeDistribution = (e) => {
        setDistribution(e.target.value)
        setTempData({ ...tempData, distribution: e.target.value })
    }

    const setWinningVal = (e, id, type) => {
        let newArr = [...winningArr]
        if (type === 'image') {
            var file_read = new FileReader()
            file_read.addEventListener('load', (event) => {
                var block = event.target.result.split(";");
                var realData = block[1].split(",")[1];
                newArr[id][type] = realData
                setWinningArr(newArr)
            })
            file_read.readAsDataURL(e.target.files[0])
        } else {
            newArr[id][type] = e.target.value
            setWinningArr(newArr)
            setTempData({ ...tempData, winningArr: winningArr })
        }

    }

    const removeWinning = (id) => {
        setWinningArr(winningArr.filter((item, i) => (i !== id)))
        setTempData({ ...tempData, winningArr: winningArr.filter((item, i) => (i !== id)) })
    }

    const addWinning = () => {
        let newWinning = { name: '', number_of_people: '', description: '', image: '' }
        setWinningArr([...winningArr, newWinning])
        setTempData({ ...tempData, winningArr: winningArr })

    }
    const renderWinningItems = () => {
        return (
            winningArr.map((item, id) =>
                <WinningItem key={id} id={id} item={item} removeWinning={removeWinning} setWinningVal={setWinningVal} />
            )
        )
    }

    const setPromotionPicture = (picture) => {
        if (picture && picture[0]) {
            setImgFormData(picture[0])

            var file_read = new FileReader()
            file_read.addEventListener('load', (e) => {
                setImgBase64Data(e.target.result)
                setTempData({ ...tempData, imgBase64Data: e.target.result })
            })
            file_read.readAsDataURL(picture[0])
        }
    }

    const onSubmit = (values) => {
        let result = {}
        var blob = null
        if (imgBase64Data) {
            var block = imgBase64Data.split(";");
            var contentType = block[0].split(":")[1];
            var realData = block[1].split(",")[1];
            blob = b64toBlob(realData, contentType);
        }
        result.promotion_picture = blob
        result.promotion_name = values.campaign_name
        result.promotion_description = values.description
        result.winnings = winningArr
        result.promotion = 'public'
        result.distribution = distribution
        result.start_date = startDate
        result.end_date = endDate
        result.winnings_start_date = winStartDate
        result.winnings_expiration_date = winEndDate
        result.social_actions = socialActions
        result.categories = categories
        result.url_video = {
            "url": values.url_video,
            "video_name": values.video_name
        }
        result.url_website = {
            "url": values.url_website
        }
        // console.log(result)

        gotoFinalLayout(result)
    }

    const handleChange = (val) => {
        let temp = []
        val.map((item) =>
            temp.push({ name: item })
        )
        setCategories(temp)
        setTempData({ ...tempData, categories: val })

    }

    const createPoll = () => {
        gotoPollCreate(tempData)
    }

    return (
        <>
            <FinalForm
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={{ size: "10", offset: "1" }} className="pl-0 pr-0">
                                <div className="px-3 mt-4">
                                    <h2><span className="color-blue font-size-13 px-0"></span></h2>
                                </div>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.campaign_name')}</div>
                                                <Field
                                                    name="campaign_name"
                                                    defaultValue={(firstFormTempData || {}).campaign_name ? (firstFormTempData || {}).campaign_name : ''}
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    placeholder={t('create_campaign_page.campaign_name')}
                                                    validate={required(t('create_campaign_page.campaign_name_required'))}
                                                />
                                                <OnChange name="campaign_name">
                                                    {(value) => {
                                                        setTempData({ ...tempData, campaign_name: value })
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm={{ size: "4", offset: "2" }}>
                                        <div className="mt-4 half-width float-right">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.upload_image')}</div>
                                                {imgBase64Data &&
                                                    <>
                                                        <img className="profile-img" src={imgBase64Data} />
                                                        <div>
                                                            <Button
                                                                onClick={handleImageCropModal}
                                                                size="lg"
                                                                color="primary"
                                                                className="blue-btn mt-2"
                                                                style={{ width: 100, height: 30, fontSize: '1rem', lineHeight: 1 }}
                                                            >
                                                                {t('button_group.edit')}
                                                            </Button>
                                                        </div>
                                                    </>
                                                }
                                                <ImageUploader
                                                    buttonText={t('create_campaign_page.upload_image')}
                                                    onChange={setPromotionPicture}
                                                    withPreview={false}
                                                    className="upload-image-container"
                                                    fileContainerStyle={{ boxShadow: "none", border: "1px solid #DEE6E9" }}
                                                    singleImage={true}
                                                    withIcon={false}
                                                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                                    maxFileSize={5242880}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <div>
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.short_description')}</div>
                                                <Field
                                                    name="description"
                                                    defaultValue={(firstFormTempData || {}).description ? (firstFormTempData || {}).description : ''}
                                                    component={FormInput}
                                                    className="company-contact-form-text-area"
                                                    type="textarea"
                                                    row={5}
                                                    placeholder=""
                                                    validate={required(t('create_campaign_page.short_description_required'))}
                                                />
                                                <OnChange name="description">
                                                    {(value) => {
                                                        setTempData({ ...tempData, description: value })
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <Row className="multi-categories-selector">
                                    <Col>
                                        <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.categories')}</div>
                                        <Select
                                            defaultValue={(firstFormTempData || {}).categories ? (firstFormTempData || {}).categories : []}
                                            mode="multiple"
                                            className="w-100"
                                            placeholder={t('create_campaign_page.categories_placeholder')}
                                            onChange={handleChange}
                                            size="large"
                                        >
                                            {children}
                                        </Select>

                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.campaign_starts')}</div>
                                                <DatePicker
                                                    defaultValue={(firstFormTempData || {}).startDate ? moment((firstFormTempData || {}).startDate, 'YYYY-MM-DD') : null}
                                                    onChange={onChangeStartDate}
                                                    placeholder="YYYY-MM-DD"
                                                    className="ant-date-picker"
                                                    format="YYYY-MM-DD"
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width float-right">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.campaign_ends')}</div>
                                                <DatePicker
                                                    defaultValue={(firstFormTempData || {}).endDate ? moment((firstFormTempData || {}).endDate, 'YYYY-MM-DD') : null}
                                                    onChange={onChangeEndDate}
                                                    placeholder="YYYY-MM-DD"
                                                    className="ant-date-picker"
                                                    format="YYYY-MM-DD"
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="px-3 mt-4">
                                    <h2><span className="color-blue font-size-13 px-0"></span></h2>
                                </div>
                                {renderWinningItems()}
                                <Row>
                                    <Col><span className="pointer" onClick={addWinning}>{t('create_campaign_page.add_more')} <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}> +</span></span></Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.winning_starts')}</div>
                                                <DatePicker
                                                    defaultValue={(firstFormTempData || {}).winStartDate ? moment((firstFormTempData || {}).winStartDate, 'YYYY-MM-DD') : null}
                                                    onChange={onChangeWinStartDate}
                                                    placeholder="YYYY-MM-DD"
                                                    className="ant-date-picker"
                                                    format="YYYY-MM-DD"
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width float-right">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.winning_ends')}</div>
                                                <DatePicker
                                                    defaultValue={(firstFormTempData || {}).winEndDate ? moment((firstFormTempData || {}).winEndDate, 'YYYY-MM-DD') : null}
                                                    onChange={onChangeWinEndDate}
                                                    placeholder="YYYY-MM-DD"
                                                    className="ant-date-picker"
                                                    format="YYYY-MM-DD"
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <div className="footer-link-bold mb-3 mt-3">{t('create_campaign_page.results')}</div>
                                        <Radio.Group onChange={onChangeDistribution} value={distribution}>
                                            <Radio value="direct" />
                                            <div className={distribution === ('direct') ? "inline-div-active ml-sm-3" : "inline-div-inactive ml-sm-3"}>
                                                {t('create_campaign_page.direct')}
                                            </div>
                                            <Radio value="end_promotion" className="ml-sm-3 ml-1" />
                                            <div className={distribution === ('end_promotion') ? "inline-div-active ml-sm-3" : "inline-div-inactive ml-sm-3"}>
                                                {t('create_campaign_page.end_date')}
                                            </div>
                                            <Radio value="live_draw" className="ml-sm-3 ml-1" />
                                            <div className={distribution === ('live_draw') ? "inline-div-active ml-sm-3" : "inline-div-inactive ml-sm-3"}>
                                                {t('create_campaign_page.live_draw')}
                                            </div>
                                        </Radio.Group>

                                    </Col>
                                </Row>


                                <div className="px-3 mt-4">
                                    <h2><span className="color-blue font-size-13 px-0"></span></h2>
                                </div>

                            </Col>
                        </Row>
                        <Row className="mt-3 pt-3 pb-3">
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="fb-icon-container1" style={{ width: 50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem" }}>
                                    f
                                </div>
                                <div>
                                    <CheckBoxButtonWithString
                                        value={socialActions.facebook.like}
                                        btnString="like"
                                        handleActions={() => handleActions("facebook", "like")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.facebook.follow}
                                        btnString="follow"
                                        handleActions={() => handleActions("facebook", "follow")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.facebook.comment}
                                        btnString="comment"
                                        handleActions={() => handleActions("facebook", "comment")}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="twitter-icon-container1" style={{ width: 50, borderRadius: 6 }}>
                                    <img src={images.twitter_icon} />
                                </div>
                                <div>
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitter.like}
                                        btnString="like"
                                        handleActions={() => handleActions("twitter", "like")}
                                        openModal={() => setOpenTwitterLikeModal(true)}
                                        finishedName='TWITTER_LIKE_ID_FINISHED'
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitter.follow}
                                        btnString="follow"
                                        handleActions={() => handleActions("twitter", "follow")}
                                        openModal={() => setOpenTwitterFollowModal(true)}
                                        finishedName='TWITTER_FOLLOW_ID_FINISHED'
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitter.tweet}
                                        btnString="comment"
                                        handleActions={() => handleActions("twitter", "tweet")}
                                        openModal={() => setOpenTwitterCommentModal(true)}
                                        finishedName='TWITTER_COMMENT_MODEL_FINISHED'
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitter.retweet}
                                        btnString="retweet"
                                        handleActions={() => handleActions("twitter", "retweet")}
                                        openModal={() => setOpenTwitterRetweetModal(true)}
                                        finishedName='TWITTER_RETWEET_ID_FINISHED'
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="youtube-icon-container1" style={{ width: 50, borderRadius: 6 }}>
                                    <img src={images.youtube_icon} />
                                </div>
                                <div>
                                    <CheckBoxButtonWithString
                                        value={socialActions.youtube.like}
                                        btnString="like"
                                        handleActions={() => handleActions("youtube", "like")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.youtube.follow}
                                        btnString="follow"
                                        handleActions={() => handleActions("youtube", "follow")}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="instagram-icon-container1" style={{ width: 50, borderRadius: 6 }}>
                                    <img src={images.instagram_icon} />
                                </div>
                                <div>
                                    <CheckBoxButtonWithString
                                        value={socialActions.instagram.like}
                                        btnString="like"
                                        handleActions={() => handleActions("instagram", "like")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.instagram.follow}
                                        btnString="follow"
                                        handleActions={() => handleActions("instagram", "follow")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.instagram.comment}
                                        btnString="comment"
                                        handleActions={() => handleActions("instagram", "comment")}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="twitch-icon-container1" style={{ width: 50, borderRadius: 6 }}>
                                    <img src={images.twitch_icon} />
                                </div>
                                <div>
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitch.like}
                                        btnString="like"
                                        handleActions={() => handleActions("twitch", "like")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitch.follow}
                                        btnString="follow"
                                        handleActions={() => handleActions("twitch", "follow")}
                                    />
                                    <CheckBoxButtonWithString
                                        value={socialActions.twitch.comment}
                                        btnString="comment"
                                        handleActions={() => handleActions("twitch", "comment")}
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{ background: "rgba(191, 232, 254, 0.25)" }}>
                            <Col xs="12" sm={{ size: 10, offset: 1 }} className="d-flex justify-content-between">
                                <div className="other-icon-container" style={{ width: 50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem" }}>
                                    ?
                                </div>
                                {!pollCreated ? (
                                    <div className='inline-div-inactive pointer' onClick={createPoll}>
                                        {t('create_campaign_page.create_poll')}
                                    </div>
                                ) : (
                                        <div className='inline-div-active'>
                                            {t('create_campaign_page.poll_created')}
                                        </div>
                                    )}

                            </Col>
                        </Row>
                        <Row className="" >
                            <Col xs={{ size: "10", offset: "1" }} className="pl-0 pr-0">
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 w-100">
                                            <FormGroup>
                                                <Field
                                                    name="video_name"
                                                    defaultValue={(firstFormTempData || {}).video_name ? (firstFormTempData || {}).video_name : ''}
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    placeholder={t('create_campaign_page.video_name')}
                                                />
                                                <OnChange name="video_name">
                                                    {(value) => {
                                                        setTempData({ ...tempData, video_name: value })
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 w-100">
                                            <FormGroup>
                                                <Field
                                                    name="url_video"
                                                    defaultValue={(firstFormTempData || {}).url_video ? (firstFormTempData || {}).url_video : ''}
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    placeholder={t('create_campaign_page.url_video')}
                                                />
                                                <OnChange name="url_video">
                                                    {(value) => {
                                                        setTempData({ ...tempData, url_video: value })
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                    </Col>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 w-100">
                                            <FormGroup>
                                                <Field
                                                    name="url_website"
                                                    defaultValue={(firstFormTempData || {}).url_website ? (firstFormTempData || {}).url_website : ''}
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    placeholder={t('create_campaign_page.url_website')}
                                                />
                                                <OnChange name="url_website">
                                                    {(value) => {
                                                        setTempData({ ...tempData, url_website: value })
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-5">
                            <Col xs="12" sm={{ size: 10, offset: 1 }} >
                                <Button type="submit" className="btn blue-btn float-right" color="primary" style={{ width: 200 }}>{t('button_group.next')} </Button>
                            </Col>

                        </Row>
                    </Form>
                )}
            />
            <ImageCropModal
                open={openImageCropModal}
                onToggle={handleImageCropModal}
                setBase64Data={(value) => {
                    setImgBase64Data(value)
                    setTempData({ ...tempData, imgBase64Data: value })
                }}
                src={imgBase64Data}
            />
            <TwitterLikeModal
                open={openTwitterLikeModal}
                onToggle={() => setOpenTwitterLikeModal(!openTwitterLikeModal)}
                handleActionValues={(val) => handleActionValues('twitter', 'like_id', val)}
            />
            <TwitterFollowModal
                open={openTwitterFollowModal}
                onToggle={() => setOpenTwitterFollowModal(!openTwitterFollowModal)}
                handleActionValues={(val) => {
                    handleActionValues('twitter', 'follow_type', val.follow_type)
                    handleActionValues('twitter', 'follow_id', val.follow_id)
                }}
            />
            <TwitterCommentModal
                open={openTwitterCommentModal}
                onToggle={() => setOpenTwitterCommentModal(!openTwitterCommentModal)}
                handleActionValues={(val) => handleActionValues('twitter', 'tweet_model', val)}
            />
            <TwitterRetweetModal
                open={openTwitterRetweetModal}
                onToggle={() => setOpenTwitterRetweetModal(!openTwitterRetweetModal)}
                handleActionValues={(val) => handleActionValues('twitter', 'retweet_id', val)}
            />
        </>
    )
}
FirstLayout.propTypes = {
    gotoPollCreate: PropTypes.func.isRequired,
}
export default FirstLayout;