import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Input, FormGroup } from 'reactstrap'
import { Button } from 'antd'
import { createCampaign } from '../../../../actions/campaign'
import images from '../../../../utils/images'
import { b64toBlob } from '../../../../utils/others'

import { useTranslation } from 'react-i18next'

function PaymentSection(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection } = props

    const CREATE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.CREATE_CAMPAIGN)
    const CREATE_CAMPAIGN_SUCCESS = useSelector(state => state.userInfo.SUCCESS_CREATE_CAMPAIGN)
    const dispatch = useDispatch()

    const [messages, setMessages] = useState([])

    useEffect(() => {
        if (CREATE_CAMPAIGN_SUCCESS) {
            dispatch({ type: 'INIT_STATE', state: 'SUCCESS_CREATE_CAMPAIGN', data: false })
            setSection('resume')
        }
    }, [CREATE_CAMPAIGN_SUCCESS])

    const onSubmit = () => {
        let required_messages = []
        
        let categories = []
        params.temp_categories.map((item) => categories.push({ name: item }))

        let twitter = []
        if (params.twitter.comment) {
            twitter.push({ action: 'tweet', model: params.twitter.comment_model, entries: params.twitter.comment_entries, mandatory: params.twitter.comment_mandatory })
        }
        if (params.twitter.like) {
            twitter.push({ action: 'like', id: params.twitter.like_id, entries: params.twitter.like_entries, mandatory: params.twitter.like_mandatory })
        }
        if (params.twitter.retweet) {
            twitter.push({ action: 'retweet', id: params.twitter.retweet_id, entries: params.twitter.retweet_entries, mandatory: params.twitter.retweet_mandatory })
        }
        if (params.twitter.follow) {
            twitter.push({ action: 'follow', type: params.twitter.follow_type, id: params.twitter.follow_id, entries: params.twitter.follow_entries, mandatory: params.twitter.follow_mandatory })
        }

        let instagram = []
        if (params.instagram.profile) {
            instagram.push({ action: 'instagram_profile', url: params.instagram.profile_url, entries: params.instagram.profile_entries, mandatory: params.instagram.profile_mandatory })
        }
        if (params.instagram.publication) {
            instagram.push({ action: 'instagram_publication', url: params.instagram.publication_url, entries: params.instagram.publication_entries, mandatory: params.instagram.publication_mandatory })
        }

        let twitch = []
        if (params.twitch.follow) {
            twitch.push({ action: 'follow', follow_name: params.twitch.follow_name, entries: params.twitch.follow_entries, mandatory: params.twitch.follow_mandatory })
        }

        let url_video = {}
        if (params.url_video.video) {
            url_video = { url: params.url_video.url, video_name: params.url_video.video_name, entries: params.url_video.entries, mandatory: params.url_video.mandatory }
        }

        let url_website = {}
        if (params.url_website.website) {
            url_website = { url: params.url_website.url, entries: params.url_website.entries, mandatory: params.url_website.mandatory }
        }

        if (params.promotion_name === '') required_messages.push(t('create_campaign_page.required_fields.campaign_name'))
        if (params.promotion_picture === '') required_messages.push(t('create_campaign_page.required_fields.campaign_image'))
        if (params.promotion_description === '') required_messages.push(t('create_campaign_page.required_fields.short_description'))
        if (params.start_date === '') required_messages.push(t('create_campaign_page.required_fields.start_date'))
        if (params.end_date === '') required_messages.push(t('create_campaign_page.required_fields.end_date'))
        if (!twitter.length && !twitch.length && !instagram.length && !params.url_video.video && !params.url_website.website && params.poll === 'false') {
            required_messages.push(t('create_campaign_page.required_fields.action'))
        }

        setMessages(required_messages)
        
        if (required_messages.length > 0) {
            return
        }

        let promotion_picture = null
        let block = params.promotion_picture.split(";")
        let contentType = block[0].split(":")[1]
        let realData = block[1].split(",")[1]
        promotion_picture = b64toBlob(realData, contentType)

        var formdata = new FormData()
        formdata.append('promotion_picture', promotion_picture)
        formdata.append('promotion_name', params.promotion_name)
        formdata.append('promotion_description', params.promotion_description)
        formdata.append('public_promotion', params.public_promotion)
        formdata.append('winnings', JSON.stringify(params.winnings))
        if (categories.length > 0) {
            formdata.append('categories', JSON.stringify(categories))
        } else {
            formdata.append('categories', null)
        }
        formdata.append('promotion_option', JSON.stringify({ live_draw: params.live_draw, limitation_participation: params.limitation_participation }))
        formdata.append('promotion_type', params.campaign_type)
        formdata.append('start_date', params.start_date)
        formdata.append('end_date', params.end_date)
        if (params.poll === 'false') {
            formdata.append('poll', null)
        } else {
            formdata.append('poll', JSON.stringify(params.poll))
        }
        formdata.append('facebook', JSON.stringify([]))
        formdata.append('youtube', JSON.stringify([]))
        formdata.append('twitter', JSON.stringify(twitter))
        formdata.append('instagram', JSON.stringify(instagram))
        formdata.append('twitch', JSON.stringify(twitch))
        formdata.append('url_website', JSON.stringify(url_website))
        formdata.append('url_video', JSON.stringify(url_video))
        dispatch(createCampaign(formdata))
    }

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <div className="mt-5 mb-3 ml-3">
                    <Row>
                        <Col xs="12" sm="6" className="p-0">
                            <Row>
                                <div className="full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.name')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.ccv')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.card_number')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                            <Row>
                                <div className="mt-4 full-width">
                                    <FormGroup>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.date')}</div>
                                        <Input
                                            type="text"
                                            className="custom-form-control"
                                        />
                                    </FormGroup>
                                </div>
                            </Row>
                        </Col>
                        <Col xs="12" sm="6" className="p-0">
                            <Row>
                                <Col xs="12" sm={{ size: 9, offset: 3 }}>
                                    <Row>
                                        <div className="footer-link-bold mb-3">{t('create_campaign_page.campaign_total')}</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3">{t('create_campaign_page.campaign')} :$5623</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3">{t('create_campaign_page.iva')}:$20</div>
                                    </Row>
                                    <Row>
                                        <div className="footer-link mb-3" style={{ paddingTop: 20, borderTop: "1px solid #DEE6E9" }}>
                                            {t('create_campaign_page.total')}:$5643
                                                </div>
                                    </Row>
                                    <Row>
                                        <Button
                                            onClick={onSubmit}
                                            className="ant-blue-btn mt-3"
                                            type="primary"
                                            style={{ width: 200 }}
                                            loading={CREATE_CAMPAIGN_PROCESS}
                                        >
                                            {!CREATE_CAMPAIGN_PROCESS && t('button_group.create_campaign')}
                                        </Button>
                                    </Row>
                                    <div>
                                        {messages.map((item, index) => 
                                            <div key={index} className="mt-3 font-size-9 color-red">
                                                {item}
                                            </div>
                                        )}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}

export default PaymentSection