import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import PropTypes from 'prop-types'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'
import ImageUploader from 'react-images-upload'
import {Switch, DatePicker, Checkbox, Radio} from 'antd'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import CheckBoxButtonWithString from '../../common/Buttons/CheckBoxButtonWithString'
import images from '../../../utils/images'

import WinningItem from './WinningItem'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'

function FirstLayout(props){
    const {gotoPollCreate, gotoFinalLayout, pollCreated} = props

    const [distribution, setDistribution] = useState('direct')
    const [winningArr, setWinningArr] = useState([{name: '', number_of_people: '', description: ''}])
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [winStartDate, setWinStartDate] = useState('')
    const [winEndDate, setWinEndDate] = useState('')
    const [imgFormData, setImgFormData] = useState([])
    const [socialActions, setSocialActions] = useState({
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

    const handleActions = (category, action) => {
        let newActions = {...socialActions}
        newActions[category][action] = !newActions[category][action]
        setSocialActions(newActions)
    }

    const onChangeStartDate = (date, dateString) => {
        setStartDate(dateString)
    }

    const onChangeEndDate = (date, dateString) => {
        setEndDate(dateString)
    }

    const onChangeWinStartDate = (date, dateString) => {
        setWinStartDate(dateString)
    }

    const onChangeWinEndDate = (date, dateString) => {
        setWinEndDate(dateString)
    }
    
    const onChangeDistribution = (e) => {
        setDistribution(e.target.value)
    }

    const setWinningVal = (e, id, type) => {

        let newArr = [...winningArr]
        newArr[id][type] = e.target.value
        setWinningArr(newArr)
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
    }

    const addWinning = () => {
        let newWinning = {name: '', number_of_people: '', description: ''}
        setWinningArr([...winningArr, newWinning])
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

        gotoFinalLayout(result)
        

    }
    return(
            <FinalForm
                onSubmit={onSubmit}
                render={({handleSubmit, pristine, values}) => (
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs={{size:"10", offset:"1"}} className="pl-0 pr-0">
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Campaign Name</div>
                                                <Field
                                                    name="campaign_name"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    placeholder="Campaign Name"
                                                    validate={required('Campaign Name is required')}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Col>
                                    <Col xs="12" sm={{size: "4", offset: "2"}}>
                                        <div className="mt-4 half-width float-right">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Upload Image</div>
                                                <ImageUploader
                                                    buttonText='Upload Image'
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
                                                <div className="footer-link-bold mb-3">Short Description</div>
                                                <Field
                                                    name="description"
                                                    component={FormInput}
                                                    className="company-contact-form-text-area"
                                                    type="textarea"
                                                    row={5}
                                                    placeholder=""
                                                    validate={required('Put your Description')}
                                                />
                                            </FormGroup>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Number of eligible people</div>
                                                <Field
                                                    name="eligible_number"
                                                    component={FormInput}
                                                    className="company-contact-form-text-area"
                                                    type="number"
                                                    placeholder=""
                                                    className="custom-form-control"
                                                    validate={required('Put your Description')}
                                                />
                                            </FormGroup>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Deal Starts</div>
                                                <DatePicker
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
                                                <div className="footer-link-bold mb-3">Deal Ends</div>
                                                <DatePicker
                                                    onChange={onChangeEndDate}
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
                                    <Col><span className="pointer" onClick={addWinning}>Add More <span style={{fontSize:"1.3rem", fontWeight:"bold"}}> +</span></span></Col>
                                </Row>
                                <Row>
                                    <Col xs="12" sm="6">
                                        <div className="mt-4 half-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">Validity Start Date of the Winnings (for coupons only)</div>
                                                <DatePicker
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
                                                <div className="footer-link-bold mb-3">Validity Expiration Date of the Winnings (for coupons only)</div>
                                                <DatePicker
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
                                        <div className="footer-link-bold mb-3">Results</div>
                                        <Radio.Group onChange={onChangeDistribution} value={distribution}>
                                            <Radio value="direct"/>
                                            <div className={distribution == ('direct') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>Direct  </div>
                                            <Radio value="live_draw" className="ml-3"/>
                                            <div className={distribution == ('live_draw') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>Live Draw</div>
                                            <Radio value="end_promotion" className="ml-3"/>
                                            <div className={distribution == ('end_promotion') ? "inline-div-active ml-3" : "inline-div-inactive ml-3"}>End Date</div>
                                        </Radio.Group>
                                        
                                    </Col>
                                    
                                </Row>
                                <Row>
                            <Col><div className="footer-link-bold mt-3">Actions</div></Col>
                        </Row>
                            </Col>
                        </Row>
                        <Row className="mt-3 pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="fb-icon-container1" style={{width: 50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem"}}>
                                    f
                                </div>
                                <div>
                                <CheckBoxButtonWithString btnString="LIKE" handleActions={() => handleActions("facebook", "like")}/>
                                <CheckBoxButtonWithString btnString="FOLLOW" handleActions={(val) => handleActions("facebook", "follow")}/>
                                <CheckBoxButtonWithString btnString="MESSAGE" handleActions={(val) => handleActions("facebook", "comment")}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="twitter-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.twitter_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString btnString="LIKE" handleActions={() => handleActions("twitter", "like")}/>
                                <CheckBoxButtonWithString btnString="FOLLOW" handleActions={() => handleActions("twitter", "follow")}/>
                                <CheckBoxButtonWithString btnString="MESSAGE" handleActions={() => handleActions("twitter", "comment")}/>
                                <CheckBoxButtonWithString btnString="RETWEET" handleActions={() => handleActions("twitter", "retweet")}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="youtube-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.youtube_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString btnString="LIKE" handleActions={() => handleActions("youtube", "like")}/>
                                <CheckBoxButtonWithString btnString="FOLLOW" handleActions={() => handleActions("youtube", "follow")}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}>
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="instagram-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.instagram_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString btnString="LIKE" handleActions={() => handleActions("instagram", "like")}/>
                                <CheckBoxButtonWithString btnString="FOLLOW" handleActions={() => handleActions("instagram", "follow")}/>
                                <CheckBoxButtonWithString btnString="MESSAGE" handleActions={() => handleActions("instagram", "comment")}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3">
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="twitch-icon-container1" style={{width:50, borderRadius: 6}}>
                                    <img src={images.twitch_icon}/>
                                </div>
                                <div>
                                <CheckBoxButtonWithString btnString="LIKE" handleActions={() => handleActions("twitch", "like")}/>
                                <CheckBoxButtonWithString btnString="FOLLOW" handleActions={() => handleActions("twitch", "follow")}/>
                                <CheckBoxButtonWithString btnString="MESSAGE" handleActions={() => handleActions("twitch", "comment")}/>
                                </div>
                            </Col>
                        </Row>
                        <Row className="pt-3 pb-3" style={{background:"rgba(191, 232, 254, 0.25)"}}> 
                            <Col xs="12" sm={{size: 10, offset: 1}} style={{display:"flex", justifyContent:"space-between"}}>
                                <div className="google-icon-container1" style={{width:50, borderRadius: 6, color: "white", fontWeight: "bold", fontSize: "1.4rem"}}>
                                    ?
                                </div>
                                {!pollCreated ? (
                                    <div className='inline-div-inactive pointer' onClick={() => gotoPollCreate()}>
                                        CREATE POLL
                                    </div>
                                ) : (
                                    <div className='inline-div-active'>
                                        POLL CREATED
                                    </div>
                                )}
                                
                            </Col>
                        </Row>
                        <Row className="mt-3 mb-5">
                            <Col xs="12" sm={{size: 10, offset: 1}} >
                                <Button type="submit" className="btn blue-btn float-right" color="primary" style={{width:200}}>NEXT</Button>
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