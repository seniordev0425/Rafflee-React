import React, { useState } from 'react'
import { Form as FinalForm, Field } from 'react-final-form'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap'
import FormInput from '../../common/FormInput'
import { createCampaign } from '../../../apis/apiCalls'
import { openNotification } from '../../../utils/notification'
import { useTranslation } from 'react-i18next'

import { required } from '../../../utils/validation'

function FinalLayout(props){
    const { t } = useTranslation()

    const {poll, firstFormData, createNewPromotion} = props

    const [submitting, setSubmitting] = useState(false)

    const onSubmit = () => {
        setSubmitting(true)
        createCampaign(firstFormData, poll)
        .then(response => response.text())
        .then(result => {
            setSubmitting(false)
            console.log(result)
            var json_rlt = JSON.parse(result)
            if (json_rlt.status === 200){
                openNotification('success', 'Success', 'New campaign created successfully!')
            }
            createNewPromotion()
        })
        .catch(error => console.log('error', error));
    }
    return(
        <FinalForm
            onSubmit={onSubmit}
            render={({handleSubmit}) => (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={{size: 10, offset: 1}}>
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
                                        <Col xs="12" sm={{size:9, offset: 3}}>
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
                                                <div className="footer-link mb-3" style={{paddingTop:20, borderTop:"1px solid #DEE6E9"}}>
                                                    {t('create_campaign_page.total')}:$5643
                                                </div>
                                            </Row>
                                            <Row>
                                                <Button className="btn blue-btn mt-3" color="primary" style={{width:200}} disabled={submitting} onClick={onSubmit}>
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