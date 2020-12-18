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
import { UPLOAD_MAX_SIZE } from '../../../../utils/constants'

function SetupSection(props) {
  const { t } = useTranslation()

  const { params, setParams, setSection, onSaveCampaign } = props

  // Following Redux state is defined in reducer with comments
  const categoryArr = useSelector(state => state.homepage.categories)
  const SAVE_CAMPAIGN_PROCESS = useSelector(state => state.userInfo.SAVE_CAMPAIGN)
  const dispatch = useDispatch()

  const { Option } = Select

  // This state is option children of category select
  const [children, setChildren] = useState([])
  const [openImageCropModal, setOpenImageCropModal] = useState(false)

  const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

  useEffect(() => {
    // Load categories
    dispatch(getCategories())
  }, [])

  useEffect(() => {
    // Generate option component array using cagetory list
    let temp = []
    categoryArr.forEach((item) =>
      temp.push(<Option key={item.name}>{item.name}</Option>)
    )
    setChildren(temp)
  }, [categoryArr])

  // Update categories
  const handleCategories = (val) => {
    setParams('temp_categories', val)
  }

  // Update prize
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

  // Remove prize
  const removeWinning = (id) => {
    if (params.winnings.length === 1) {
      openNotification('warning', t('create_campaign_page.must_have_one_winning_at_least'))
      return
    }
    setParams('winnings', params.winnings.filter((item, i) => (i !== id)))
  }

  // Add prize
  const addWinning = () => {
    let newWinning = { name: '', number_of_people: '', description: '', image: '' }
    setParams('winnings', [...params.winnings, newWinning])
  }

  // Render winning items based on winnings array (winning item is equal to prize)
  const renderWinningItems = () => {
    return (
      params.winnings.map((item, id) =>
        <WinningItem key={id} id={id} item={item} removeWinning={removeWinning} setWinningVal={setWinningVal} />
      )
    )
  }

  // Update promotion picture
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
      <Col sm={{ size: "10", offset: "1" }} xs="12" className="padding-x">
        <Row>
          <Col xs="12" sm="6">
            <div className="mt-5 half-width">
              <FormGroup>
                <div className="footer-link-bold mb-3">
                  <span>{t('create_campaign_page.campaign_name')}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
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
            <div className="mt-5 half-width float-right">
              <FormGroup>
                <div className="footer-link-bold mb-3">
                  <span>{t('create_campaign_page.upload_image')}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
                {params.promotion_picture &&
                  <>
                    <img className="upload-profile-img" src={params.promotion_picture} alt="" />
                    <div>
                      <Button
                        onClick={handleImageCropModal}
                        type="primary"
                        className="ant-blue-btn mt-2"
                        style={{ width: 205, height: 30, fontSize: '1rem', lineHeight: 1 }}
                      >
                        {t('button_group.edit')}
                      </Button>
                    </div>
                  </>
                }
                <ImageUploader
                  buttonText={t('button_group.upload_campaign_image')}
                  buttonStyles={{ borderRadius: 6 }}
                  onChange={setPromotionPicture}
                  className="upload-image-container"
                  fileContainerStyle={{ boxShadow: "none", alignItems: 'flex-start' }}
                  singleImage={true}
                  withIcon={false}
                  withLabel={false}
                  maxFileSize={UPLOAD_MAX_SIZE}
                  fileSizeError='file size is too big. Max 5MB'
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <div>
              <FormGroup>
                <div className="footer-link-bold mb-3">
                  <span>{`${t('create_campaign_page.short_description')}  (${params.promotion_description.length}/300)`}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
                <Input
                  type="textarea"
                  className="company-contact-form-text-area"
                  value={params.promotion_description}
                  onChange={(e) => setParams('promotion_description', e.target.value)}
                  maxLength={300}
                  rows={1}
                />
              </FormGroup>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <div>
              <FormGroup>
                <div className="footer-link-bold mb-3">
                  <span>{`${t('create_campaign_page.complete_description')}  (${params.promotion_long_description.length}/1000)`}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
                <Input
                  type="textarea"
                  className="company-contact-form-text-area"
                  value={params.promotion_long_description}
                  onChange={(e) => setParams('promotion_long_description', e.target.value)}
                  maxLength={1000}
                  rows={5}
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
                <div className="footer-link-bold mb-3">
                  <span>{t('create_campaign_page.campaign_starts')}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
                <DatePicker
                  showTime
                  value={params.start_date ? moment(params.start_date, 'YYYY-MM-DD HH:mm:ss') : null}
                  onChange={(date, dateString) => setParams('start_date', dateString)}
                  placeholder="YYYY-MM-DD HH:mm:ss"
                  className="ant-date-picker"
                  format="YYYY-MM-DD HH:mm:ss"
                />
              </FormGroup>
            </div>
          </Col>
          <Col xs="12" sm="6">
            <div className="mt-4 half-width float-right">
              <FormGroup>
                <div className="footer-link-bold mb-3">
                  <span>{t('create_campaign_page.campaign_ends')}</span>
                  <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
                </div>
                <DatePicker
                  showTime
                  value={params.end_date ? moment(params.end_date, 'YYYY-MM-DD HH:mm:ss') : null}
                  onChange={(date, dateString) => setParams('end_date', dateString)}
                  placeholder="YYYY-MM-DD HH:mm:ss"
                  className="ant-date-picker"
                  format="YYYY-MM-DD HH:mm:ss"
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
          <Col className="d-flex justify-content-between">
            <Button
              type="primary"
              className="ant-blue-btn my-5"
              style={{ width: 150 }}
              onClick={onSaveCampaign}
              loading={SAVE_CAMPAIGN_PROCESS}
            >
              {!SAVE_CAMPAIGN_PROCESS && t('button_group.save')}
            </Button>
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