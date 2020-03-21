import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { OnChange } from 'react-final-form-listeners'
import PropTypes from 'prop-types'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import ImageUploader from 'react-images-upload'
import { DatePicker, Radio, Select} from 'antd'
import FormInput from '../../common/FormInput'
import WinningItem from './WinningItem'
import CheckBoxButtonWithString from '../../common/Buttons/CheckBoxButtonWithString'
import images from '../../../utils/images'
import { getCategories } from '../../../actions/homepage'
import moment from 'moment'
import { required } from '../../../utils/validation'

import { useTranslation } from 'react-i18next'

function FirstLayout(props){
    const { t } = useTranslation()

    const {gotoPollCreate, gotoFinalLayout, pollCreated, firstFormTempData} = props

    let tempCategories = [];
    ((firstFormTempData || {}).categories || []).map((item) => tempCategories.push({name: item}))
    
    const {Option} = Select
    const [children, setChildren] = useState([])
    const [categories, setCategories] = useState(tempCategories)
    const [distribution, setDistribution] = useState((firstFormTempData || {}).distribution ? (firstFormTempData || {}).distribution :  'direct')
    const [winningArr, setWinningArr] = useState((firstFormTempData || {}).winningArr ? (firstFormTempData || {}).winningArr :  [{name: '', number_of_people: '', description: ''}])
    const [startDate, setStartDate] = useState((firstFormTempData || {}).startDate ?(firstFormTempData || {}).startDate : '')
    const [endDate, setEndDate] = useState((firstFormTempData || {}).endDate ?(firstFormTempData || {}).endDate : '')
    const [winStartDate, setWinStartDate] = useState((firstFormTempData || {}).winStartDate ?(firstFormTempData || {}).winStartDate : '')
    const [winEndDate, setWinEndDate] = useState((firstFormTempData || {}).winEndDate ?(firstFormTempData || {}).winEndDate : '')
    const [imgFormData, setImgFormData] = useState([])
    const [socialActions, setSocialActions] = useState((firstFormTempData || {}).socialActions ? firstFormTempData.socialActions : {
        twitter: {
            comment: false,
            like: false,
            retweet: false,
            follow: false
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

    const [tempData, setTempData] = useState(firstFormTempData)

    const categoryArr = useSelector(state=>state.homepage.categories)
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getCategories())
    },[])

    useEffect(() => {
        let temp = []
        categoryArr.map((item) => 
            temp.push(<Option key={item.name}>{item.name}</Option>)
        )
        setChildren(temp)
    }, [categoryArr])

    const handleActions = (category, action) => {
        let newActions = {...socialActions}
        newActions[category][action] = !newActions[category][action]
        setSocialActions(newActions)
        setTempData({...tempData, socialActions: socialActions})
    }

    const onChangeStartDate = (date, dateString) => {
        setStartDate(dateString)
        setTempData({...tempData, startDate: dateString})
    }

    const onChangeEndDate = (date, dateString) => {
        setEndDate(dateString)
        setTempData({...tempData, endDate: dateString})
    }

    const onChangeWinStartDate = (date, dateString) => {
        setWinStartDate(dateString)
        setTempData({...tempData, winStartDate: dateString})
    }

    const onChangeWinEndDate = (date, dateString) => {
        setWinEndDate(dateString)
        setTempData({...tempData, winEndDate: dateString})
    }
    
    const onChangeDistribution = (e) => {
        setDistribution(e.target.value)
        setTempData({...tempData, distribution: e.target.value})
    }

    const setWinningVal = (e, id, type) => {

        let newArr = [...winningArr]
        newArr[id][type] = e.target.value
        setWinningArr(newArr)
        setTempData({...tempData, winningArr: winningArr})
    }

    const renderWinningItems = () => {
        return (
            winningArr.map((item, id) => 
                <WinningItem key={id} id={id} item={item} removeWinning={removeWinning} setWinningVal={setWinningVal}/>
            )
        )
    }

    const removeWinning = (id) => {
        setWinningArr(winningArr.filter((item, i) => (i !== id)))
        setTempData({...tempData, winningArr: winningArr.filter((item, i) => (i !== id))})
    }

    const addWinning = () => {
        let newWinning = {name: '', number_of_people: '', description: ''}
        setWinningArr([...winningArr, newWinning])
        setTempData({...tempData, winningArr: winningArr})
        
    }

    const setPromotionPicture = (picture) => {
        if (picture && picture[0]) {
            setImgFormData(picture[0])
        }
    }

    const onSubmit = (values) => {
        let result = {}
        result.promotion_picture = imgFormData
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
        result.url_video = values.url_video

        gotoFinalLayout(result)
    }

    const handleChange = (val) => {
        let temp = []
        val.map((item) => 
            temp.push({name: item})
        )
        setCategories(temp)
        setTempData({...tempData, categories: val})
        
    }

    const createPoll = () => {
        gotoPollCreate(tempData)
    }

    return(
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit}) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={{size:"10", offset:"1"}} className="pl-0 pr-0">
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
                                                        setTempData({...tempData, campaign_name: value})
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm={{size: "4", offset: "2"}}>
                                        <div className="mt-4 half-width float-right">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.upload_image')}</div>
                                                <ImageUploader
                                                    buttonText={t('create_campaign_page.upload_image')}
                                                    onChange={setPromotionPicture}
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
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <div className="mt-4">
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
                                                        setTempData({...tempData, description: value})
                                                    }}
                                                </OnChange>
                                            </FormGroup>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
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
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 w-100">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.url_video')}</div>
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
                                                        setTempData({...tempData, url_video: value})
                                                    }}
                                                </OnChange>
                                            </FormGroup>
                                        </div>
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
                                {renderWinningItems()}
                                <Row>
                                    <Col><span className="pointer" onClick={addWinning}>{t('create_campaign_page.add_more')} <span style={{fontSize:"1.3rem", fontWeight:"bold"}}> +</span></span></Col>
                                </Row>
                                <Row>
                                    <Col xs="12">
                                        <div className="footer-link-bold mb-3 mt-3">{t('create_campaign_page.results')}</div>
                                        <Radio.Group onChange={onChangeDistribution} value={distribution}>
                                            <Radio value="direct"/>
                                            <div className={distribution === ('direct') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
                                                {t('create_campaign_page.direct')}
                                            </div>
                                            <Radio value="live_draw" className="ml-3"/>
                                            <div className={distribution === ('live_draw') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
                                                {t('create_campaign_page.live_draw')}
                                            </div>
                                            <Radio value="end_promotion" className="ml-3"/>
                                            <div className={distribution === ('end_promotion') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>
                                                {t('create_campaign_page.end_date')}
                                            </div>
                                        </Radio.Group>
                                        
                                    </Col>
                                </Row>
                               
                                <Row>
                                    <Col><div className="footer-link-bold mt-3">{t('create_campaign_page.actions')}</div></Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3 pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="fb-icon-container1" style={{width: 50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem"}}>
                                    f
                                </div>
                                <div>
                                <CheckBoxButtonWithString 
                                    value={socialActions.facebook.like}
                                    btnString={t('create_campaign_page.like')} 
                                    handleActions={() => handleActions("facebook", "like")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.facebook.follow}
                                    btnString={t('create_campaign_page.follow')} 
                                    handleActions={() => handleActions("facebook", "follow")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.facebook.comment}
                                    btnString={t('create_campaign_page.message')} 
                                    handleActions={() => handleActions("facebook", "comment")}
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="twitter-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.twitter_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitter.like}
                                    btnString={t('create_campaign_page.like')} 
                                    handleActions={() => handleActions("twitter", "like")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitter.follow}
                                    btnString={t('create_campaign_page.follow')} 
                                    handleActions={() => handleActions("twitter", "follow")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitter.comment}
                                    btnString={t('create_campaign_page.message')} 
                                    handleActions={() => handleActions("twitter", "comment")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitter.retweet}
                                    btnString={t('create_campaign_page.retweet')} 
                                    handleActions={() => handleActions("twitter", "retweet")}
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="youtube-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.youtube_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString 
                                    value={socialActions.youtube.like}
                                    btnString={t('create_campaign_page.like')} 
                                    handleActions={() => handleActions("youtube", "like")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.youtube.follow}
                                    btnString={t('create_campaign_page.follow')} 
                                    handleActions={() => handleActions("youtube", "follow")}
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="instagram-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.instagram_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString 
                                    value={socialActions.instagram.like}
                                    btnString={t('create_campaign_page.like')} 
                                    handleActions={() => handleActions("instagram", "like")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.instagram.follow}
                                    btnString={t('create_campaign_page.follow')} 
                                    handleActions={() => handleActions("instagram", "follow")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.instagram.comment}
                                    btnString={t('create_campaign_page.message')} 
                                    handleActions={() => handleActions("instagram", "comment")}
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="twitch-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.twitch_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitch.like}
                                    btnString={t('create_campaign_page.like')} 
                                    handleActions={() => handleActions("twitch", "like")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitch.follow}
                                    btnString={t('create_campaign_page.follow')} 
                                    handleActions={() => handleActions("twitch", "follow")}
                                />
                                <CheckBoxButtonWithString 
                                    value={socialActions.twitch.comment}
                                    btnString={t('create_campaign_page.message')} 
                                    handleActions={() => handleActions("twitch", "comment")}
                                />
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}> 
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="google-icon-container1" style={{width:50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem"}}>
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
                        <Row className="mt-3 mb-5">
                            <Col xs="12" sm={{size: 10, offset: 1}} >
                                <Button type="submit" className="btn blue-btn float-right" color="primary" style={{width:200}}>{t('button_group.next')} </Button>
                            </Col>
                            
                        </Row>
                    </Form>
                )}
            />
    )
}
FirstLayout.propTypes = {
    gotoPollCreate: PropTypes.func.isRequired,
}
export default FirstLayout;