import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import { Checkbox, Button as AntdButton } from 'antd'
import FormInput from '../../common/FormInput'
import AnswerItem from './AnswerItem'
import {openNotification} from '../../../utils/notification'

import { required } from '../../../utils/validation'
import { useTranslation } from 'react-i18next'

function CreatePollLayout(props){
    const { t } = useTranslation()

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
        if (answerArr.length === 1)
            openNotification('warning', t('create_campaign_page.must_have_one_at_least'))
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
    }

    return(
        <FinalForm
            onSubmit={onSubmit}
            render={({handleSubmit, pristine, values}) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={{size: 10, offset: 1}}>
                            <Row className="mt-3">
                                <span className="policy-button color-blue" onClick={() => gotoFirstLayout(false, null)}>
                                    {t('create_campaign_page.back_to_create_campaign')}
                                </span>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.ask_question')}</div>
                                        <Field
                                            name="question"
                                            component={FormInput}
                                            className="custom-form-control"
                                            type="text"
                                            placeholder={t('create_campaign_page.type_here')}
                                            validate={required(t('create_campaign_page.question_required'))}
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="or-divider-container full-width">
                                    <h2><span className="or-divider-text">{t('create_campaign_page.choose_at_least_two_answer')}</span></h2>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.choose_answer')}</div>
                                    </FormGroup>
                                </div>
                            </Row>

                            {renderAnswerItems()}
                            
                            <Row>
                                    <Col className="pl-0 pr-0">
                                        <span className="pointer" onClick={addAnswer}>{t('create_campaign_page.add_more')} <span style={{fontSize:"1.3rem", fontWeight:"bold"}}> +</span></span>
                                    </Col>
                            </Row>
                            
                            <Row className="mt-3">
                                <Checkbox onChange={handleMultipleChoice} checked={multipleChoice}>{t('create_campaign_page.allow_multiple_choices')}</Checkbox>
                            </Row>
                            <Row className="mt-3">
                                <Checkbox>{t('create_campaign_page.allow_multiple_votes')}</Checkbox>
                            </Row>
                            <Row className="mt-3 mb-5" style={{justifyContent:"flex-end"}}>
                                <Button type="submit" className="btn blue-btn" color="primary" style={{width:200}}>{t('button_group.create_poll')}</Button>
                            </Row>

                        </Col>
                    </Row>
                </Form>
            )}
        />
    )
}

export default CreatePollLayout;