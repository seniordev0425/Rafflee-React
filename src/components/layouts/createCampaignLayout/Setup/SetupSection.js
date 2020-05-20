import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, FormGroup, Input } from 'reactstrap'
import { Button, DatePicker, Select } from 'antd'
import ImageUploader from 'react-images-upload'
import ImageCropModal from '../../../modals/ImageCropModal'
import WinningItem from './WinningItem'
import moment from 'moment'

import { getCategories } from '../../../../actions/homepage'
import { openNotification } from '../../../../utils/notification'

import { useTranslation } from 'react-i18next'

function SetupSection(props) {
    const { t } = useTranslation()

    const { params, setParams, setSection } = props

    const categoryArr = useSelector(state => state.homepage.categories)
    const dispatch = useDispatch()

    const { Option } = Select
    const [children, setChildren] = useState([])
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

    const handleCategories = (val) => {
        let temp = []
        val.map((item) => temp.push({ name: item }))
        setParams('categories', temp)
        setParams('temp_categories', val)
    }


    const setWinningVal = (e, id, type) => {
        let newArr = [...params.winnings]
        if (type === 'image') {
            newArr[id][type] = e
            setParams('winnings', newArr)
        } else {
            newArr[id][type] = e.target.value
            setParams('winnings', newArr)
        }
    }

    const removeWinning = (id) => {
        if (params.winnings.length === 1) {
            openNotification('warning', t('create_campaign_page.must_have_one_winning_at_least'))
            return
        }
        setParams('winnings', params.winnings.filter((item, i) => (i !== id)))
    }

    const addWinning = () => {
        let newWinning = { name: '', number_of_people: '', description: '', image: '' }
        setParams('winnings', [...params.winnings, newWinning])
    }

    const renderWinningItems = () => {
        return (
            params.winnings.map((item, id) =>
                <WinningItem key={id} id={id} item={item} removeWinning={removeWinning} setWinningVal={setWinningVal} />
            )
        )
    }

    const setPromotionPicture = (picture) => {
        if (picture && picture[0]) {
            var file_read = new FileReader()
            file_read.addEventListener('load', (e) => {
                setParams('promotion_picture', e.target.result)
            })
            file_read.readAsDataURL(picture[0])
        }
    }

    return (
        <Row>
            <Col sm={{ size: "10", offset: "1" }} xs="12" className="px-sm-3">
                <Row>
                    <Col xs="12" sm="6">
                        <div className="mt-5 half-width">
                            <FormGroup>
                                <div className="footer-link-bold mb-3">{t('create_campaign_page.campaign_name')}</div>
                                <Input
                                    type="text"
                                    className="custom-form-control"
                                    placeholder={t('create_campaign_page.campaign_name')}
                                    value={params.promotion_name}
                                    onChange={(e) => setParams('promotion_name', e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                    <Col xs="12" sm={{ size: "4", offset: "2" }}>
                        <div className="mt-4 half-width float-right">
                            <FormGroup>
                                <div className="footer-link-bold mb-3">{t('create_campaign_page.upload_image')}</div>
                                {params.promotion_picture &&
                                    <>
                                        <img className="profile-img" src={params.promotion_picture} />
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
                                    </>
                                }
                                <ImageUploader
                                    buttonText={t('create_campaign_page.upload_image')}
                                    onChange={setPromotionPicture}
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
                                <Input
                                    type="textarea"
                                    className="company-contact-form-text-area"
                                    value={params.promotion_description}
                                    onChange={(e) => setParams('promotion_description', e.target.value)}
                                />
                            </FormGroup>
                        </div>
                    </Col>
                </Row>
                <Row className="multi-categories-selector">
                    <Col>
                        <div className="footer-link-bold mb-3 mt-4">{t('create_campaign_page.categories')}</div>
                        <Select
                            value={params.temp_categories}
                            mode="multiple"
                            className="w-100"
                            placeholder={t('create_campaign_page.categories_placeholder')}
                            onChange={handleCategories}
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
                                    defaultValue={params.start_date ? moment(params.start_date, 'YYYY-MM-DD') : null}
                                    onChange={(date, dateString) => setParams('start_date', dateString)}
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
                                    defaultValue={params.end_date ? moment(params.end_date, 'YYYY-MM-DD') : null}
                                    onChange={(date, dateString) => setParams('end_date', dateString)}
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
                    <Col><span className="pointer" onClick={addWinning}>{t('create_campaign_page.add_more')} <span style={{ fontSize: "1.3rem", fontWeight: "bold" }}> +</span></span></Col>
                </Row>
                <Row>
                    <Col>
                        <Button
                            type="primary"
                            className="ant-blue-btn my-5"
                            style={{ width: 150 }}
                            onClick={() => setSection('campaign_type')}
                        >
                            {t('button_group.next')}
                        </Button>
                    </Col>
                </Row>
            </Col>
            <ImageCropModal
                open={openImageCropModal}
                onToggle={handleImageCropModal}
                setBase64Data={(value) => setParams('promotion_picture', value)}
                src={params.promotion_picture}
            />
        </Row>
    )
}

export default SetupSection