import React from 'react'
import { Row, Col, Input, FormGroup } from 'reactstrap'
import { Tooltip, Checkbox } from 'antd'
import AnswerItem from './AnswerItem'
import images from '../../../../../utils/images'
import { openNotification } from '../../../../../utils/notification'

import { useTranslation } from 'react-i18next'

function PollField(props) {
    const { t } = useTranslation()

    const { params, setAction, setParams } = props

    const renderAnswerItems = () => {
        return (
            params.poll.response.map((item, id) =>
                <AnswerItem key={id} id={id} item={item} removeAnswer={removeAnswer} setAnswerVal={setAnswerVal} />
            )
        )
    }

    const setAnswerVal = (e, id) => {
        let newArr = [...params.poll.response]
        newArr[id] = e.target.value
        setAction('poll', 'response', newArr)
    }

    const addAnswer = () => {
        setAction('poll', 'response', [...params.poll.response, ""])
    }

    const removeAnswer = (id) => {
        if (params.poll.response.length === 1)
            openNotification('warning', t('create_campaign_page.must_have_one_at_least'))
        else setAction('poll', 'response', params.poll.response.filter((item, i) => i !== id))
    }



    return (
        <div className="mt-3 mt-sm-5">
            <div
                className="d-flex justify-content-between align-items-center px-2 px-sm-4"
                style={{ height: 50, backgroundColor: '#22B9A7', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
            >
                <div className="d-flex align-items-center">
                    <div className="font-size-13 font-weight-bold">?</div>
                    <span className="ml-3">{t('create_campaign_page.create_poll')}</span>
                </div>
                <div>
                    <Tooltip title="Tooltip will show on mouse enter.">
                        <img src={images.question_mark_white_icon} width={22} />
                    </Tooltip>
                    <span
                        className="ml-3 pointer"
                        onClick={() => setParams('poll', 'false')}
                    >
                        {t('button_group.remove')}
                    </span>
                </div>
            </div>
            <div
                className="p-2 p-sm-4"
                style={{ borderColor: '#E6ECEE', borderWidth: 1, borderStyle: 'solid', borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
            >
                <Row>
                    <div className="full-width">
                        <FormGroup>
                            <div className="footer-link-bold mb-3">{t('create_campaign_page.ask_question')}</div>
                            <Input
                                type="text"
                                className="custom-form-control"
                                placeholder={t('create_campaign_page.type_here')}
                                value={params.poll.question}
                                onChange={(e) => setAction('poll', 'question', e.target.value)}
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
                    <div className="mt-2 full-width">
                        <FormGroup>
                            <div className="footer-link-bold mb-3">{t('create_campaign_page.choose_answer')}</div>
                        </FormGroup>
                    </div>
                </Row>

                {renderAnswerItems()}

                <Row>
                    <Col className="pl-0 pr-0">
                        <span className="pointer footer-link" onClick={addAnswer} >{t('create_campaign_page.add_more')} <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}> +</span></span>
                    </Col>
                </Row>

                <Row className="mt-3">
                    <Checkbox
                        onChange={e => setAction('poll', 'mutiples_choices', e.target.checked)}
                        checked={params.poll.mutiples_choices}
                    >
                        {t('create_campaign_page.allow_multiple_choices')}
                    </Checkbox>
                </Row>
                <Row className="mt-3">
                    <Checkbox>{t('create_campaign_page.allow_multiple_votes')}</Checkbox>
                </Row>

            </div>
        </div>
    )
}

export default PollField