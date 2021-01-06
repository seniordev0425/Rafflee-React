import React, { useState } from 'react'
import { FormGroup, Input, Row, Col } from 'reactstrap'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageCropModal from '../../../modals/ImageCropModal/CommonImageCropModal'
import { useTranslation } from 'react-i18next'
import { UPLOAD_MAX_SIZE } from '../../../../utils/constants'

import images from '../../../../utils/images'

function WinningItem(props) {
  const { t } = useTranslation()

  const {
    id,
    item,
    removeWinning,
    setWinningVal
  } = props

  // Prize image data
  const [selectedImgData, setSelectedImgData] = useState('')
  const [selectedImgId, setSelectedImgId] = useState(0)
  const [exceedMaxSize, setExceedMaxSize] = useState(false)
  const [openImageCropModal, setOpenImageCropModal] = useState(false)

  const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

  const addWinningImage = () => {
    document.getElementById('hiddenFileInput' + id).click()
    setSelectedImgId(item.image.length + 1)
  }

  const removeWinningImage = () => {
    let imgs = item.image
    imgs.pop()
    setWinningVal(imgs, id, 'image')
  }

  const editWinningImage = (index, imageData) => {
    setSelectedImgId(index)
    setSelectedImgData(imageData)
    setOpenImageCropModal(true)
  }

  const handleChange = (e) => {
    if (e.target.files[0].size >= UPLOAD_MAX_SIZE) {
      setExceedMaxSize(true)
      return
    }

    var file_read = new FileReader()
    file_read.addEventListener('load', (event) => {
      setSelectedImgData(event.target.result)
      setOpenImageCropModal(true)
    })
    setExceedMaxSize(false)
    file_read.readAsDataURL(e.target.files[0])
  }

  return (
    <Row>
      <Col xs="12" md="4" lg="3">
        <div className="mt-4">
          <FormGroup>
            <div className="footer-link-bold mb-3">
              <span>{t('create_campaign_page.name_of_prizes')}</span>
              <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
            </div>
            <Input
              name={"name" + id}
              value={item.name}
              onChange={(e) => setWinningVal(e, id, 'name')}
              className="custom-form-control"
              type="text"
              required
            />
          </FormGroup>
        </div>
      </Col>
      <Col xs="12" md="4" lg="3">
        <div className="mt-4">
          <FormGroup>
            <div className="footer-link-bold mb-3">
              <span>{t('create_campaign_page.type_of_prizes')}</span>
              <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
            </div>
            <Input
              name={"winning_type" + id}
              value={item.description}
              onChange={(e) => setWinningVal(e, id, 'description')}
              className="custom-form-control"
              type="text"
              required
            />
          </FormGroup>
        </div>
      </Col>
      <Col xs="12" md="4" lg="3">
        <div className="mt-4">
          <FormGroup>
            <div className="footer-link-bold mb-3">
              <span>{t('create_campaign_page.number_of_people')}</span>
              <span className="ml-3 font-size-12" style={{ color: 'red', verticalAlign: 'sub' }}>*</span>
            </div>
            <Input
              name={"number" + id}
              value={item.number_of_people}
              onChange={(e) => setWinningVal(e, id, 'number_of_people')}
              className="custom-form-control"
              type="number"
              min={0}
              required
            />
          </FormGroup>
        </div>
      </Col>
      <Col lg="12" xl="3" className={"mt-md-3"}>
        <div className="d-flex justify-content-between align-items-center p-0 mb-md-0 mb-sm-3 mt-md-5">
          <div className="pl-0 pl-sm-2 d-flex align-items-center">
            {item.image.length > 0 &&
              <img
                src={images.ic_minus_gray}
                style={{ width: 20, height: 20, cursor: 'pointer' }}
                className="mr-2"
                onClick={removeWinningImage}
                alt="minus"
              />
            }
            {item.image.map((imageData, index) => (
              <img
                key={index}
                src={imageData}
                style={{ width: 60, height: 60, borderRadius: 6, cursor: 'pointer' }}
                className="mr-2"
                onClick={() => editWinningImage(index, imageData)}
                alt=""
              />
            ))}
            <Input
              type="file"
              id={`hiddenFileInput${id}`}
              onChange={handleChange}
              onClick={(event) => {
                event.target.value = null
              }}
              style={{ display: 'none' }}
              accept="image/*"
            />
            {item.image.length < 3 &&
              <img
                src={images.ic_plus_gray}
                style={{ width: 20, height: 20, cursor: 'pointer' }}
                onClick={addWinningImage}
                alt="plus"
              />
            }
            {exceedMaxSize &&
              <span style={{ color: 'red' }}>Max file size 5MB.</span>
            }
          </div>
          <FontAwesomeIcon className="remove-winning-icon mt-3" icon={faTrash} onClick={() => removeWinning(id)} />
        </div>
      </Col>
      <ImageCropModal
        open={openImageCropModal}
        onToggle={handleImageCropModal}
        setBase64Data={(imgData) => {
          let imgs = item.image
          if (selectedImgId > item.image.length) {
            imgs = [...imgs, imgData]
          } else {
            imgs = imgs.map((image, index) => index === selectedImgId ? imgData : image)
          }
          setWinningVal(imgs, id, 'image')
        }}
        src={selectedImgData}
      />
    </Row>
  )
}

export default WinningItem;