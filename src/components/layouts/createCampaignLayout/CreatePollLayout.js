import React, {useState} from 'react'
import { connect } from "react-redux";
import {Link} from 'react-router-dom'
import {Form as FinalForm, Field} from 'react-final-form'
import PropTypes from 'prop-types'
import {Form, FormGroup, Button, Input, Row, Col} from 'reactstrap'
import ImageUploader from 'react-images-upload'
import {Switch, DatePicker, Checkbox, Button as AntdButton} from 'antd'
import FormInput from '../../common/FormInput'
import FormPhoneInput from '../../common/FormPhoneInput'
import images from '../../../utils/images'
import AnswerItem from './AnswerItem'
import {openNotification} from '../../../utils/notification'

import {
    composeValidators, 
    required, 
    isEmail, 
    minLength, 
    maxLength,
    requiredPhoneObj
} from '../../../utils/validation'

function CreatePollLayout(props){
    const {gotoFirstLayout} = props
    const [answerArr, setAnswerArr] = useState([""])
    const [multipleChoice, setMultipleChoice] = useState(false)

    const renderAnswerItems = () => {
        return (
            answerArr.map((item, id) => 
                <AnswerItem key={id} id={id} item={item} removeAnswer={removeAnswer} setAnswerVal={setAnswerVal}/>
            )
        )
    }

    const setAnswerVal = (e, id) => {
        let newArr = [...answerArr]
        newArr[id] = e.target.value
        setAnswerArr(newArr)
    }

    const addAnswer = () => {
        let newAnswer = ""
        setAnswerArr([...answerArr, newAnswer])
    }

    const removeAnswer = (id) => {
        if (answerArr.length == 1)
            openNotification('warning', 'Warning', 'Must have one answer at least')
        else setAnswerArr(answerArr.filter((item, i) => i !== id))
    }

    const handleMultipleChoice = () => {
        setMultipleChoice(!multipleChoice)
    }

    const onSubmit = (values) => {
        let poll = {
            question: values.question,
            response: answerArr,
            mutiples_choices: multipleChoice
        }
        gotoFirstLayout(true, poll)
        // console.log(poll)
    }
    return(
        <FinalForm
            onSubmit={onSubmit}
            render={({handleSubmit, pristine, values}) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={{size: 10, offset: 1}}>
                            <Row className="mt-3">
                                <span className="policy-button color-blue" onClick={() => gotoFirstLayout(false, null)}>Back to Create Campaign</span>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Ask Question</div>
                                        <Field
                                            name="question"
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder="Type Here"
                                            validate={required('Question is required')}
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="or-divider-container full-width">
                                    <h2><span className="or-divider-text">AND CHOOSE AT LEAST TWO ANSWERS</span></h2>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">Choose an Answer</div>
                                    </FormGroup>
                                </div>
                            </Row>

                            {renderAnswerItems()}
                            
                            <Row>
                                    <Col className="pl-0 pr-0">
                                        <span className="pointer" onClick={addAnswer}>Add More <span style={{fontSize:"1.3rem", fontWeight:"bold"}}> +</span></span>
                                    </Col>
                            </Row>
                            
                            <Row className="mt-3">
                                <Checkbox onChange={handleMultipleChoice} checked={multipleChoice}>Allow Multiple Choices</Checkbox>
                            </Row>
                            <Row className="mt-3">
                                <Checkbox>Allow Multiple Votes from one IP</Checkbox>
                            </Row>
                            <Row className="mt-3 mb-5" style={{justifyContent:"flex-end"}}>
                                <Button type="submit" className="btn blue-btn" color="primary" style={{width:200}}>CREATE POLL</Button>
                            </Row>

                        </Col>
                    </Row>
                </Form>
            )}
        />
    )
}

export default CreatePollLayout;