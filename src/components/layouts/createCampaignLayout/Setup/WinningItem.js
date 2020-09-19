import React, { useState, useMemo } from 'react'
import { FormGroup, Input, Row, Col } from 'reactstrap'
import { Button } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import ImageCropModal from '../../../modals/ImageCropModal'
import { useTranslation } from 'react-i18next'
import { UPLOAD_MAX_SIZE } from '../../../../utils/constants'

function WinningItem(props) {
  const { t } = useTranslation()

  const { id, item, removeWinning, setWinningVal } = props

  // Prize image data
  const [imgBase64Data, setImgBase64Data] = useState(item.image)
  const [exceedMaxSize, setExceedMaxSize] = useState(false)
  const [openImageCropModal, setOpenImageCropModal] = useState(false)

  useMemo(() => {
    // Initialize prize image data
    setImgBase64Data(item.image)
  }, [item.image])

  const handleImageCropModal = () => setOpenImageCropModal(!openImageCropModal)

  const handleClick = () => {
    document.getElementById('hiddenFileInput' + id).click();
  }

  const handleChange = (e) => {
    var file_read = new FileReader()
    file_read.addEventListener('load', (event) => {
      var block = event.target.result.split(";")
      var realData = block[1].split(",")[1]
      setWinningVal(realData, id, 'image')
      setImgBase64Data(realData)
    })
    if (e.target.files[0].size >= UPLOAD_MAX_SIZE) {
      setExceedMaxSize(true)
      return
    }
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
              required
            />
          </FormGroup>
        </div>
      </Col>
      <Col lg="12" xl="3" className={imgBase64Data ? "mt-md-n3" : "mt-md-3"}>
        <div className="d-flex justify-content-between align-items-center p-0 mb-md-0 mb-sm-3 mt-md-5">
          <div className="pl-0 pl-sm-2 d-flex align-items-center" style={{ marginTop: imgBase64Data ? 20 : 0 }}>
            {imgBase64Data &&
              <div>
                <img src={`data:image/jpeg;base64,${imgBase64Data}`} style={{ width: 60, height: 60, borderRadius: 6 }} className="mr-2" alt="" />
                <Button
                  onClick={handleImageCropModal}
                  type="primary"
                  className="ant-blue-btn mr-2 mt-3"
                  style={{ width: 60, height: 30, fontSize: '1rem', lineHeight: 1 }}
                >
                  {t('button_group.edit')}
                </Button>
              </div>
            }
            <Input
              type="file"
              id={`hiddenFileInput${id}`}
              onChange={handleChange}
              style={{ display: 'none' }}
              accept="image/*"
            />
            <Button
              onClick={handleClick}
              type="primary"
              className="ant-blue-btn mr-2"
              style={{ width: 127, height: 30, fontSize: '1rem', lineHeight: 1 }}
            >
              {t('button_group.prize_image')}
            </Button>
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
        setBase64Data={(value) => {
          var block = value.split(";")
          var realData = block[1].split(",")[1]
          setImgBase64Data(realData)
          setWinningVal(realData, id, 'image')
        }}
        src={`data:image/jpeg;base64,${imgBase64Data}`}
      />
    </Row>
  )
}

export default WinningItem;