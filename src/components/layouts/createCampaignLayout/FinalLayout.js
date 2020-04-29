import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import FormInput from '../../common/FormInput'
import { createCampaign } from '../../../actions/campaign'
import { useTranslation } from 'react-i18next'

import { required } from '../../../utils/validation'

function FinalLayout(props) {
    const { t } = useTranslation()

    const { poll, firstFormData, createNewPromotion } = props

    const isLoading = useSelector(state => state.userInfo.CREATE_CAMPAIGN)
    const SUCCESS_CREATE_CAMPAIGN = useSelector(state => state.userInfo.SUCCESS_CREATE_CAMPAIGN)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (SUCCESS_CREATE_CAMPAIGN) {
            createNewPromotion()
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CREATE_CAMPAIGN', data: false })
        }
    }, [SUCCESS_CREATE_CAMPAIGN])

    const onSubmit = () => {
        var formdata = new FormData();
        formdata.append("promotion_picture", firstFormData.promotion_picture);
        formdata.append("promotion_name", firstFormData.promotion_name);
        formdata.append("promotion_description", firstFormData.promotion_description);
        formdata.append("promotion", firstFormData.promotion);
        formdata.append("distribution", firstFormData.distribution);
        formdata.append("start_date", firstFormData.start_date);
        formdata.append("end_date", firstFormData.end_date);
        formdata.append("winnings_start_date", firstFormData.winnings_start_date);
        formdata.append("winnings_expiration_date", firstFormData.winnings_expiration_date);
        formdata.append("winnings", JSON.stringify(firstFormData.winnings));
        if (poll)
            formdata.append("poll", JSON.stringify(poll));
        else formdata.append("poll", "false");
        formdata.append("twitter", JSON.stringify(firstFormData.social_actions.twitter));
        formdata.append("facebook", JSON.stringify(firstFormData.social_actions.facebook));
        formdata.append("instagram", JSON.stringify(firstFormData.social_actions.instagram));
        formdata.append("youtube", JSON.stringify(firstFormData.social_actions.youtube));
        formdata.append("twitch", JSON.stringify(firstFormData.social_actions.twitch));
        if (firstFormData.categories)
            formdata.append("categories", JSON.stringify(firstFormData.categories));
        else formdata.append("categories", "false");
        formdata.append("url_video", JSON.stringify(firstFormData.url_video));
        formdata.append("url_website", JSON.stringify(firstFormData.url_website));
        dispatch(createCampaign(formdata))
    }

    return (
        <FinalForm
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={{ size: 10, offset: 1 }}>
                            <Row>
                                <Col xs="12" sm="6">
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.name')}</div>
                                                <Field
                                                    name="name"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required(t('create_campaign_page.name_required'))}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.ccv')}</div>
                                                <Field
                                                    name="ccv"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required(t('create_campaign_page.ccv_required'))}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.card_number')}</div>
                                                <Field
                                                    name="card_number"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required(t('create_campaign_page.card_number_required'))}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                    <Row>
                                        <div className="mt-4 full-width">
                                            <FormGroup>
                                                <div className="footer-link-bold mb-3">{t('create_campaign_page.date')}</div>
                                                <Field
                                                    name="date"
                                                    component={FormInput}
                                                    className="custom-form-control"
                                                    type="text"
                                                    validate={required(t('create_campaign_page.date_required'))}
                                                />
                                            </FormGroup>
                                        </div>
                                    </Row>
                                </Col>
                                <Col xs="12" sm="6">
                                    <Row>
                                        <Col xs="12" sm={{ size: 9, offset: 3 }}>
                                            <Row>
                                                <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.campaign_total')}</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3">{t('create_campaign_page.campaign')} :$5623</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3">{t('create_campaign_page.IVA')}:$20</div>
                                            </Row>
                                            <Row>
                                                <div className="footer-link mb-3" style={{ paddingTop: 20, borderTop: "1px solid #DEE6E9" }}>
                                                    {t('create_campaign_page.total')}:$5643
                                                </div>
                                            </Row>
                                            <Row>
                                                <Button className="btn blue-btn mt-3" color="primary" style={{ width: 200 }} disabled={isLoading} onClick={onSubmit}>
                                                    {t('button_group.create_campaign')}
                                                </Button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            )}
        />
    )
}

export default FinalLayout;